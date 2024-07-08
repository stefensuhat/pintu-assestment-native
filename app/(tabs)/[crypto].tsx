import { CryptoContextProvider } from '@/components/crypto-context'
import TradePage from '@/components/trade/trade-page'
import BaseLayout from '@/components/ui/base-layout'
import { ScrollView } from 'react-native'

export default function TradeScreen() {
	return (
		<BaseLayout>
			<ScrollView showsVerticalScrollIndicator={false}>
				<CryptoContextProvider>
					<TradePage />
				</CryptoContextProvider>
			</ScrollView>
		</BaseLayout>
	)
}
