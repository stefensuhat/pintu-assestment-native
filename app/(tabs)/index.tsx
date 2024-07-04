import BaseLayout from '@/components/ui/base-layout'
import SearchInput from '@/components/ui/search-input'
import TableLists from '@/components/ui/table-lists'
import { useFocusNotifyOnChangeProps } from '@/hooks/useFocusNotifyOnChangeProps'
import { useGetCryptoList } from '@/services/crypto'
import { useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'

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
		<BaseLayout>
			<FlatList
				data={query.data}
				refreshControl={<RefreshControl refreshing={query.isFetching} onRefresh={query.refetch} />}
				renderItem={({ item }) => <TableLists item={item} />}
				keyExtractor={(item) => item.name}
				ListHeaderComponent={<SearchInput search={search} setSearch={setSearch} />}
			/>
		</BaseLayout>
	)
}
