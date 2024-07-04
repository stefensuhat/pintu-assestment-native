import { convertToInternationalCurrencySystem, currencyFormat } from '@/lib/helper'
import type { CryptoDataInterface } from '@/types/crypto'
import { styled } from 'nativewind'
import { Text, View } from 'react-native'

const StyledView = styled(View)
const StyledText = styled(Text)
const mapData1 = [
	{ key: '24H High', value: 'high_24h', shorten: false },
	{ key: '24H Vol (IDR)', value: 'total_volume', shorten: true },
]

const mapData2 = [
	{ key: '24H Low', value: 'low_24h', shorten: false },
	{ key: 'Market Cap', value: 'market_cap', shorten: true },
]

const Box = ({ className = '', ...props }) => (
	<StyledView className={`justify-center flex-col flex-0 text-white ${className}`} {...props} />
)
export default function Volume({ data }: { data: CryptoDataInterface }) {
	return (
		<StyledView className="flex flex-col space-y-0.5">
			<StyledView className="flex flex-row gap-2">
				{mapData1.map((datum) => {
					const value = data[datum.value as keyof CryptoDataInterface] as number

					return (
						<Box key={datum.key}>
							<StyledText className="text-white text-xs">{datum.key}</StyledText>
							<StyledText className="text-white text-xs">
								{datum.shorten ? convertToInternationalCurrencySystem(value) : currencyFormat(value, true)}
							</StyledText>
						</Box>
					)
				})}
			</StyledView>
			<StyledView className="flex flex-row gap-2">
				{mapData2.map((datum) => {
					const value = data[datum.value as keyof CryptoDataInterface] as number

					return (
						<Box key={datum.key}>
							<StyledText className="text-white text-xs">{datum.key}</StyledText>
							<StyledText className="text-white text-xs">
								{datum.shorten ? convertToInternationalCurrencySystem(value) : currencyFormat(value, true)}
							</StyledText>
						</Box>
					)
				})}
			</StyledView>
		</StyledView>
	)
}
