import OrderBook from '@/components/trade/order-book'
import OrderInput from '@/components/trade/order-input'
import Button from '@/components/ui/button'
import InputField from '@/components/ui/input-field'
import { styled } from 'nativewind'
import { Pressable, Text, TextInput, View } from 'react-native'

const StyledView = styled(View)
const StyledText = styled(Text)

export default function Trading() {
	return (
		<StyledView className="flex flex-row justify-start space-x-4">
			<StyledView className="flex-1">
				<OrderInput />
			</StyledView>

			<StyledView className="self-stretch">
				<OrderBook />
			</StyledView>
		</StyledView>
	)
}
