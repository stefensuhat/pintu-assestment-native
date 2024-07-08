import OrderBook from '@/components/trade/order-book'
import OrderInput from '@/components/trade/order-input'
import { styled } from 'nativewind'
import { View } from 'react-native'

const StyledView = styled(View)

export default function Trading() {
	return (
		<StyledView className="flex flex-row justify-start space-x-4 px-2">
			<StyledView className="flex-1">
				<OrderInput />
			</StyledView>

			<StyledView>
				<OrderBook />
			</StyledView>
		</StyledView>
	)
}
