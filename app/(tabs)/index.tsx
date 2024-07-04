import SearchInput from "@/components/SearchInput";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const assets = [{ name: "BTC" }];

export default function HomeScreen() {
	return (
		<SafeAreaView className="px-4 bg-primary h-full">
			<SearchInput initialQuery={assets[0].name} />
			<FlatList
				data={assets}
				renderItem={({ item }) => (
					<Text className="text-white">{item.name}</Text>
				)}
				keyExtractor={(item) => item.name}
			/>
		</SafeAreaView>
	);
}
