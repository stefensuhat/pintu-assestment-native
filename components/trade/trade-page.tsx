import { useCryptoContext } from '@/components/crypto-context'
import Chart from '@/components/trade/chart'
import Trading from '@/components/trade/trading'
import Volume from '@/components/trade/volume'
import { StyledView } from '@/components/ui/base-layout'
import { currencyFormat } from '@/lib/helper'
import { Image, Text } from 'react-native'

export default function TradePage() {
	const { data } = useCryptoContext()

	if (!data) return null

	return (
		<StyledView>
			<StyledView className="flex-row items-center space-x-2 px-2">
				<Image source={{ uri: data.image }} className="w-6 h-6 rounded-2xl" />

				<StyledView className="flex-row items-center space-x-1">
					<Text className="text-xl text-white font-bold">{data.name}</Text>
					<Text className="text-xl text-gray-300 font-bold">/IDR</Text>
				</StyledView>
			</StyledView>

			<StyledView className="flex flex-row my-4 justify-between px-2">
				<StyledView className="flex-1">
					<Text className="text-xl text-white font-bold mb-1">{currencyFormat(data.current_price)}</Text>
					<Text className={`${data.price_change_24h < 0 ? 'text-red-500' : 'text-green-500'} font-bold`}>
						{currencyFormat(data.price_change_24h, true)} ({data.price_change_percentage_24h}%)
					</Text>
				</StyledView>

				<Volume data={data} />
			</StyledView>

			<Chart />

			<StyledView className="border-2 border-gray-600 rounded-lg my-4" />

			<Trading />
		</StyledView>
	)
}
