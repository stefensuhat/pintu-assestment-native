import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
	return (
		<SafeAreaView className="flex-1 items-center justify-center">
			<Text className="font-bold">Variables!</Text>
			<Text className="font-bold active:scale-150 transition">Transitions</Text>
			<Text className="font-bold animate-bounce">Animations</Text>
		</SafeAreaView>
	);
};

export default App;
