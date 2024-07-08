import type { Style } from 'css-to-react-native'
import { styled } from 'nativewind'
import { Pressable, Text } from 'react-native'

const StyledText = styled(Text)

type ButtonProps = {
	classes?: { root?: string; text?: string }
	label: string
	style?: Style
	disabled?: boolean
	onPress?: () => void
}

export default function Button({ classes, disabled = false, label, onPress, style }: ButtonProps) {
	return (
		<Pressable disabled={disabled} tw={`p-2 rounded-md ${classes?.root} items-center`} onPress={onPress} style={style}>
			<StyledText tw={`text-white ${classes?.text}`}>{label}</StyledText>
		</Pressable>
	)
}
