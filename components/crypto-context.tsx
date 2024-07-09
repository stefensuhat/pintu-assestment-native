import { useAppContext } from '@/components/app-context'
import Loader from '@/components/ui/loader'
import { useAddCryptoBalance, useGetCryptoDetail } from '@/services/crypto'
import type { CryptoDataInterface } from '@/types/crypto'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { type ReactNode, createContext, useContext, useEffect } from 'react'

const CryptoContext = createContext<{
	data: CryptoDataInterface
}>({
	data: {
		id: 'bitcoin',
		symbol: '',
		name: '',
		image: '',
		current_price: 0,
		market_cap: 0,
		market_cap_rank: 0,
		fully_diluted_valuation: 0,
		price_change_24h: 0,
		price_change_percentage_24h: 0,
		total_volume: 0,
		high_24h: 0,
		low_24h: 0,
	},
})

const CryptoContextProvider = ({ children }: { children: ReactNode }) => {
	const queryParams: Partial<{ crypto: string }> = useLocalSearchParams()

	const { user } = useAppContext()
	const { data, isError, isLoading } = useGetCryptoDetail(queryParams.crypto ?? 'bitcoin')

	useEffect(() => {
		if (isError) {
			Redirect({ href: '/' })
		}
	}, [isError])

	if (isLoading) return <Loader isLoading={isLoading} />

	if (data) {
		return <CryptoContext.Provider value={{ data }}>{children}</CryptoContext.Provider>
	}
}

const useCryptoContext = () => {
	const crypto = useContext(CryptoContext)

	if (!crypto) {
		throw new Error('useUser must be used within a UserProvider')
	}

	return crypto
}

export { CryptoContext, CryptoContextProvider, useCryptoContext }
