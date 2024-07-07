import { StyledText } from '@/components/ui/base-layout'
import { currencyFormat } from '@/lib/helper'
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

const sellBooks = [
	{ price: 900000000, amount: 0.00092 },
	{ price: 1000000001, amount: 0.00092 },
	{ price: 1000000002, amount: 0.00092 },
	{ price: 1000000003, amount: 0.00092 },
	{ price: 1000000004, amount: 0.00092 },
	{ price: 1000000005, amount: 0.00092 },
	{ price: 1000000006, amount: 0.00092 },
]

const buyBooks = [
	{ price: 1000000000, amount: 0.00092 },
	{ price: 1000000001, amount: 0.00092 },
	{ price: 1000000002, amount: 0.00092 },
	{ price: 1000000003, amount: 0.00092 },
	{ price: 1000000004, amount: 0.00092 },
	{ price: 1000000005, amount: 0.00092 },
	{ price: 1000000006, amount: 0.00092 },
]

export default function OrderBook() {
	return (
		<View className="border-2 border-gray-600 rounded-lg p-1">
			<Header>
				<Heading>Price{'\n'}(IDR)</Heading>
				<Heading className="text-right">Amount{'\n'}(BTC)</Heading>
			</Header>
			{sellBooks.map((book, index) => (
				<Row className="flex-row justify-between" key={book.price}>
					<Cell>{currencyFormat(book.price, true)}</Cell>
					<Cell className="text-right">{book.amount}</Cell>
				</Row>
			))}

			<View className="border-2 border-l-0 border-r-0 border-gray-600 p-1">
				<Text className="text-green-500 font-bold">{currencyFormat(1000000000, true)}</Text>
			</View>
			{buyBooks.map((book, index) => (
				<Row className="flex-row justify-between" key={book.price}>
					<Cell>{currencyFormat(book.price, true)}</Cell>
					<Cell className="text-right">{book.amount}</Cell>
				</Row>
			))}
		</View>
	)
}
