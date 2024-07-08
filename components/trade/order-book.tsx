import { useCryptoContext } from '@/components/crypto-context'
import { StyledText } from '@/components/ui/base-layout'
import { currencyFormat } from '@/lib/helper'
import { supabase } from '@/lib/supabase'
import { useGetOrderBooks } from '@/services/crypto'
import type { RealtimeChannel } from '@supabase/realtime-js'
import { useEffect, useState } from 'react'
import { Text, type TextProps, View, type ViewProps } from 'react-native'

const Cell = (props: TextProps) => {
	return <StyledText className="text-white text-[10px]" {...props} />
}

const Row = (props: ViewProps) => {
	return <View className="flex-row justify-between py-1 space-x-2" {...props} />
}

const Header = (props: ViewProps) => {
	return <View className="flex-row justify-between py-1 border-b border-gray-600" {...props} />
}

const Heading = (props: TextProps) => {
	return <StyledText className="flex-1 text-white  text-[11px] font-semibold" {...props} />
}

export default function OrderBook() {
	let channel: RealtimeChannel | null = null
	const { data: crypto } = useCryptoContext()

	const [key, setKey] = useState(0)
	const { data, refetch } = useGetOrderBooks(crypto.id, key)

	useEffect(() => {
		subscribeOrderBooks()

		return () => {
			if (channel) {
				supabase.removeChannel(channel)
			}
		}
	}, [channel])

	const handleNewOrder = async () => {
		setKey(key + 1)

		await refetch()
	}

	const subscribeOrderBooks = () => {
		if (!channel) {
			channel = supabase
				.channel('orderBooks')
				.on('postgres_changes', { event: '*', schema: 'public', table: 'order_books' }, async () => {
					await handleNewOrder()
				})
				.subscribe()
		}
	}

	return (
		<View className="border-2 border-gray-600 rounded-lg p-1">
			<Header>
				<Heading>Price{'\n'}(IDR)</Heading>
				<Heading className="text-right">Amount{'\n'}(BTC)</Heading>
			</Header>

			{data?.sellBooks?.map((book) => (
				<Row className="flex-row justify-between" key={book.price}>
					<Cell className="text-red-500">{currencyFormat(book.price, true)}</Cell>
					<Cell className="text-right text-red-500">{book.quantity}</Cell>
				</Row>
			))}

			<View className="border-2 border-l-0 border-r-0 border-gray-600 p-1">
				<Text className="text-green-500 font-bold">{currencyFormat(1000000000, true)}</Text>
			</View>
			{data?.buyBooks?.map((book) => (
				<Row className="flex-row justify-between" key={book.id}>
					<Cell className="text-green-500">{currencyFormat(book.price, true)}</Cell>
					<Cell className="text-right text-green-500">{book.quantity}</Cell>
				</Row>
			))}
		</View>
	)
}
