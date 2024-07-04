import '../global.css'
import { useColorScheme } from '@/hooks/useColorScheme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'

const queryClient = new QueryClient()

export default function RootLayout() {
	const colorScheme = useColorScheme()

	return (
		<QueryClientProvider client={queryClient}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="+not-found" />
			</Stack>
		</QueryClientProvider>
	)
}
