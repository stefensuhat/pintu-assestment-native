import data from '@/services/response.json'
import type { CryptoDataInterface } from '@/types/crypto'
import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

const keys = {
	list: ['crypto', 'list'],
	detail: ['crypto', 'detail'],
}

export const useGetCryptoList = ({ search, options }: { search: string; options?: UseQueryOptions }) => {
	return useQuery({
		...options,
		queryKey: keys.list,
		queryFn: async (): Promise<CryptoDataInterface[]> => {
			// const response = await request.get('/coins/markets', { params: { vs_currency: 'usd' } })

			// return response
			//TODO: replace with real fetch
			return await Promise.resolve(data)
		},
		retry: 1,
		select: (data: CryptoDataInterface[]) => {
			if (search === '') return data

			return data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
		},
	})
}

export const useGetCryptoDetail = (cryptoId: string) => {
	return useQuery({
		queryKey: [...keys.detail, cryptoId],
		queryFn: async (): Promise<CryptoDataInterface | null> => {
			//TODO: replace with real fetch

			return await new Promise((resolve) => {
				const findCrypto: CryptoDataInterface | null = data.find((item) => item.id === cryptoId) ?? null

				setTimeout(() => {
					return resolve(findCrypto)
				}, 2000)
			})
		},
		retry: 1,
	})
}
