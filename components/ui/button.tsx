import type { Style } from 'css-to-react-native'
import { styled } from 'nativewind'
import { Pressable, Text } from 'react-native'

const StyledText = styled(Text)

type ButtonProps = { classes?: { root?: string; text?: string }; style?: Style; label: string; onPress?: () => void }

export default function Button({ classes, label, onPress, style }: ButtonProps) {
	return (
		<Pressable tw={`p-2 rounded-md ${classes?.root} items-center`} onPress={onPress} style={style}>
			<StyledText tw={`text-white ${classes?.text}`}>{label}</StyledText>
		</Pressable>
	)
}
