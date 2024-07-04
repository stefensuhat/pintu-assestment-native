import { convertToInternationalCurrencySystem, currencyFormat } from '@/lib/helper'
import type { CryptoDataInterface } from '@/types/crypto'
import { router } from 'expo-router'
import { Animated, Pressable, Text, View } from 'react-native'
import Image = Animated.Image

type TableListProps = {
	item: CryptoDataInterface
}

export default function TableLists({ item }: TableListProps) {
	const handleItemClick = () => {
		router.push(`/${item.id}`)
	}

	return (
		<View>
			<Pressable className="flex-row items-center justify-between p-2" onPress={handleItemClick}>
				<View className="flex-row space-x-2 items-center">
					<Image source={{ uri: item.image }} className="w-6 h-6 rounded-2xl" />

					<View>
						<Text className="text-white">{item.name}</Text>
						<Text className=" text-white/50">Vol. {convertToInternationalCurrencySystem(item.total_volume)}</Text>
					</View>
				</View>

				<View className="flex-row items-center space-x-4">
					<Text className="text-white text-right ">{currencyFormat(item.current_price)}</Text>

					<View
						className={`py-1 px-2 rounded-md ${item.price_change_percentage_24h > 0 ? 'bg-green-500' : 'bg-red-500'}`}
					>
						<Text className="text-white text-xs">{`${item.price_change_percentage_24h.toFixed(2)}%`}</Text>
					</View>
				</View>
			</Pressable>
		</View>
	)
}
