import { useCryptoContext } from '@/components/crypto-context'
import { useGetHistoricalData } from '@/services/crypto'
import * as haptics from 'expo-haptics'
import { styled } from 'nativewind'
import { Platform, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { CandlestickChart, type TPriceType } from 'react-native-wagmi-charts'

const StyledView = styled(View)
const StyledText = styled(Text)

function invokeHaptic() {
	if (['ios', 'android'].includes(Platform.OS)) {
		haptics.impactAsync(haptics.ImpactFeedbackStyle.Light)
	}
}

const types = ['open', 'high', 'low', 'close']

export default function Chart() {
	const { data } = useCryptoContext()

	const query = useGetHistoricalData(data.id)

	return (
		<StyledView>
			{query.isLoading ? null : query.data ? (
				<StyledView className="rounded-lg overflow-hidden">
					<GestureHandlerRootView>
						<CandlestickChart.Provider data={query.data}>
							<CandlestickChart className="p-0">
								<CandlestickChart.Candles height={400} />

								<CandlestickChart.Crosshair onCurrentXChange={invokeHaptic}>
									<CandlestickChart.Tooltip />
								</CandlestickChart.Crosshair>

								<StyledView className="flex">
									<CandlestickChart.DatetimeText
										style={{
											padding: 8,
											fontSize: 12,
											color: 'white',
										}}
									/>

									<StyledView className="flex flex-row items-center py-2 justify-center border-t border-gray-600">
										{types.map((type) => (
											<StyledView className="flex-1 spacing-y-1" key={type}>
												<StyledText className="text-white text-xs text-center capitalize">{type}</StyledText>
												<CandlestickChart.PriceText
													type={type as TPriceType}
													style={{
														color: 'white',
														fontSize: 12,
														textAlign: 'center',
													}}
												/>
											</StyledView>
										))}
									</StyledView>
								</StyledView>
							</CandlestickChart>
						</CandlestickChart.Provider>
					</GestureHandlerRootView>
				</StyledView>
			) : null}
		</StyledView>
	)
}
