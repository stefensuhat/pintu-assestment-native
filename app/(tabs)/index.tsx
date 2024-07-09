import { useAppContext } from '@/components/app-context'
import BaseLayout from '@/components/ui/base-layout'
import SearchInput from '@/components/ui/search-input'
import TableLists from '@/components/ui/table-lists'
import { useFocusNotifyOnChangeProps } from '@/hooks/useFocusNotifyOnChangeProps'
import { useGetCryptoList } from '@/services/crypto'
import { useState } from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'

export default function IndexScreen() {
	const [search, setSearch] = useState('')
	const { username } = useAppContext()
	const notifyOnChangeProps = useFocusNotifyOnChangeProps()
	const query = useGetCryptoList({
		search,
		options: {
			//@ts-ignore
			notifyOnChangeProps,
		},
	})

	return (
		<BaseLayout>
			<View className="px-2">
				<Text className="text-xl text-white font-bold mb-2">Hello, {username}</Text>
				<FlatList
					data={query.data}
					refreshControl={<RefreshControl refreshing={query.isFetching} onRefresh={query.refetch} />}
					renderItem={({ item }) => <TableLists item={item} />}
					keyExtractor={(item) => item.name}
					ListHeaderComponent={<SearchInput search={search} setSearch={setSearch} />}
				/>
			</View>
		</BaseLayout>
	)
}
