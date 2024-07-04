import { TextInput } from 'react-native'

type SearchInputProps = {
	search: string
	setSearch: (search: string) => void
}

const SearchInput = ({ search, setSearch }: SearchInputProps) => {
	return (
		<TextInput
			className="text-base text-white font-pregular p-2 rounded-md border-2 border-black-200 mb-4"
			value={search}
			placeholder="Search assets"
			placeholderTextColor="#CDCDE0"
			onChangeText={setSearch}
		/>
	)
}

export default SearchInput
