import { Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;

export default function BaseLayout({
	children,
}: { children: React.ReactNode }) {
	return <SafeAreaView>{children}</SafeAreaView>;
}
