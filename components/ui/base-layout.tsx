import { StatusBar } from 'expo-status-bar'
import { Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScrollView = Animated.ScrollView

export default function BaseLayout({ children }: { children: React.ReactNode }) {
	return (
		<SafeAreaView className="px-4 space-y-4 h-full bg-primary">
			<StatusBar style="light" animated />

			{children}
		</SafeAreaView>
	)
}
