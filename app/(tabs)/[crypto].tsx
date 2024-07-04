import Volume from '@/components/trade/volume'
import BaseLayout from '@/components/ui/base-layout'
import Loader from '@/components/ui/loader'
import { currencyFormat } from '@/lib/helper'
import { useGetCryptoDetail } from '@/services/crypto'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { styled } from 'nativewind'
import { useEffect, useState } from 'react'
import { Animated, Text, View } from 'react-native'
import Image = Animated.Image

const StyledView = styled(View)

export default function TradeScreen() {
	const queryParams: Partial<{ crypto: string }> = useLocalSearchParams()

	const { data, isError, isLoading } = useGetCryptoDetail(queryParams.crypto ?? 'bitcoin')

	useEffect(() => {
		if (isError) {
			Redirect({ href: '/' })
		}
	}, [isError])

	return (
		<BaseLayout>
			{isLoading && <Loader isLoading={isLoading} />}

			{data && (
				<StyledView>
					<StyledView className="flex-row items-center space-x-2">
						<Image source={{ uri: data.image }} className="w-6 h-6 rounded-2xl" />

						<StyledView className="flex-row items-center space-x-1">
							<Text className="text-xl text-white font-bold">{data.name}</Text>
							<Text className="text-xl text-gray-300 font-bold">/IDR</Text>
						</StyledView>
					</StyledView>

					<StyledView className=" flex flex-row mt-4 justify-between">
						<StyledView className="flex-1">
							<Text className="text-xl text-white font-bold mb-1">{currencyFormat(data.current_price)}</Text>
							<Text className={`${data.price_change_24h < 0 ? 'text-red-500' : 'text-green-500'} font-bold`}>
								{currencyFormat(data.price_change_24h, true)} ({data.price_change_percentage_24h}%)
							</Text>
						</StyledView>

						<Volume data={data} />
					</StyledView>
				</StyledView>
			)}
		</BaseLayout>
	)
}
