import { styled } from 'nativewind'
import type { ControllerFieldState } from 'react-hook-form'
import { Text, TextInput, type TextInputProps, View } from 'react-native'

const StyledView = styled(View)
const StyledText = styled(Text)

interface InputFieldProps extends ControllerFieldState {
	label: string
	inputProps: TextInputProps
	classes?: { root?: string; input?: string; label?: string }
}

export default function InputField({ classes, label, inputProps, error }: InputFieldProps) {
	return (
		<StyledView className={`space-y-1 ${classes?.root}`}>
			<StyledText tw={`text-gray-300 text-xs, ${error && 'text-red-500'} ${classes?.label}`}>{label}</StyledText>
			<TextInput
				{...inputProps}
				onChangeText={(text) => {
					if (inputProps.onChangeText) {
						inputProps.onChangeText(text)
					}
				}}
				className={`
				h-8 border px-2 border-gray-600 text-white rounded-md ${classes?.input},
				${error && 'border-red-500'}
				`}
			/>
			{error && <StyledText tw="text-red-500 text-xs">{error.message}</StyledText>}
		</StyledView>
	)
}
