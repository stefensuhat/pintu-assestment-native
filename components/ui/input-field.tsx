import { styled } from 'nativewind'
import { Text, TextInput, type TextInputProps, View } from 'react-native'

const StyledView = styled(View)
const StyledText = styled(Text)

interface InputFieldProps {
	label: string
	inputProps?: TextInputProps
	classes?: { root?: string; input?: string; label?: string }
}

export default function InputField({ classes, label, inputProps }: InputFieldProps) {
	return (
		<StyledView className={`${classes?.root}`}>
			<StyledText tw={`text-gray-300 text-xs mb-1 ${classes?.label}`}>{label}</StyledText>
			<TextInput
				{...inputProps}
				className={`h-8 border px-2 text-white border-gray-600 rounded-md ${classes?.input}`}
			/>
		</StyledView>
	)
}
