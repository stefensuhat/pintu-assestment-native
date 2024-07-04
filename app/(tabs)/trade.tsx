import Loader from '@/components/ui/loader'
import { useGetCryptoDetail } from '@/services/crypto'
import { useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function TradeScreen() {
	const queryParams: Partial<{ crypto: string }> = useLocalSearchParams()
	const [search, setSearch] = useState('')
	const query = useGetCryptoDetail(queryParams.crypto ?? 'bitcoin')

	return (
		<SafeAreaView className="px-4 bg-primary h-full space-y-4">
			<StatusBar style="light" animated />

			{query.isFetching ? (
				<Loader isLoading={query.isFetching} />
			) : (
				<Text className="text-white">{query.data?.symbol}</Text>
			)}
		</SafeAreaView>
	)
}
