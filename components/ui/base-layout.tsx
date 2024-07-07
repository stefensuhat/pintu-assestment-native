import { StatusBar } from 'expo-status-bar'
import { styled } from 'nativewind'
import { Animated, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function BaseLayout({ children }: { children: React.ReactNode }) {
	return (
		<SafeAreaView className="px-4 space-y-4 h-full bg-primary">
			<StatusBar style="light" animated />

			{children}
		</SafeAreaView>
	)
}

export const StyledView = styled(View)
export const StyledText = styled(Text)
