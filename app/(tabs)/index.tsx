import SearchInput from '@/components/ui/search-input'
import TableLists from '@/components/ui/table-lists'
import { useFocusNotifyOnChangeProps } from '@/hooks/useFocusNotifyOnChangeProps'
import { useGetCryptoList } from '@/services/crypto'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { FlatList, RefreshControl, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
	const [search, setSearch] = useState('')
	const notifyOnChangeProps = useFocusNotifyOnChangeProps()
	const query = useGetCryptoList({
		search,
		options: {
			notifyOnChangeProps,
		},
	})

	return (
		<SafeAreaView className="px-4 bg-primary h-full space-y-4">
			<StatusBar style="light" animated />
			<FlatList
				data={query.data}
				refreshControl={<RefreshControl refreshing={query.isFetching} onRefresh={query.refetch} />}
				renderItem={({ item }) => <TableLists item={item} />}
				keyExtractor={(item) => item.name}
				ListHeaderComponent={<SearchInput search={search} setSearch={setSearch} />}
			/>
		</SafeAreaView>
	)
}
