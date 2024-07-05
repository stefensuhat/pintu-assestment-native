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
	const query = useGetHistoricalData('bitcoin')
	const { currentX, currentY, data, domain, step } = CandlestickChart.useChart()

	console.log(currentX, currentY, data, domain, step)
	return (
		<View>
			{query.data && (
				<StyledView className="h-fit overflow-scroll border border-gray-600 rounded-lg">
					<GestureHandlerRootView>
						<CandlestickChart.Provider data={query.data}>
							<CandlestickChart>
								<CandlestickChart.Candles height={300} />

								<CandlestickChart.Crosshair onCurrentXChange={invokeHaptic}>
									<CandlestickChart.Tooltip />
								</CandlestickChart.Crosshair>

								<StyledView className="flex">
									<CandlestickChart.DatetimeText className="p-2 text-xs text-white" />

									<StyledView className="flex flex-row items-center py-2 justify-center border-t border-gray-600">
										{types.map((type) => (
											<StyledView className="flex-1 spacing-y-1" key={type}>
												<StyledText className="text-white text-xs text-center capitalize">{type}</StyledText>
												<CandlestickChart.PriceText
													type={type as TPriceType}
													className="text-white text-xs text-center"
												/>
											</StyledView>
										))}
									</StyledView>
								</StyledView>
							</CandlestickChart>
						</CandlestickChart.Provider>
					</GestureHandlerRootView>
				</StyledView>
			)}
		</View>
	)
}

const DATA = Array.from({ length: 31 }, (_, i) => ({
	day: i,
	lowTmp: 20 + 10 * Math.random(),
	highTmp: 40 + 30 * Math.random(),
}))
