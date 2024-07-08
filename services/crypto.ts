import request from '@/lib/request'
import { supabase } from '@/lib/supabase'
import data from '@/services/response.json'
import type { CryptoDataInterface } from '@/types/crypto'
import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

const keys = {
	list: ['crypto', 'list'],
	detail: ['crypto', 'detail'],
	historical: ['crypto', 'historical'],
	orderBooks: ['crypto', 'orderBooks'],
}

export const useGetCryptoList = ({ search, options }: { search: string; options?: UseQueryOptions }) => {
	return useQuery({
		...options,
		queryKey: keys.list,
		queryFn: async (): Promise<CryptoDataInterface[]> => {
			return await request.get('/coins/markets', { params: { vs_currency: 'idr' } })
		},
		retry: 1,
		// @ts-ignore
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
				}, 0)
			})
		},
		retry: 1,
	})
}

export const useGetHistoricalData = (cryptoId: string) => {
	return useQuery({
		queryKey: [...keys.historical, cryptoId],
		queryFn: async (): Promise<[number, number, number, number, number][]> => {
			return await request.get(`/coins/${cryptoId}/ohlc`, {
				params: { vs_currency: 'usd', days: '7', precision: '2' },
			})
		},
		retry: 1,
		select: (data) => {
			return data.map((item) => {
				return { timestamp: item[0], open: item[1], high: item[2], low: item[3], close: item[4] }
			})
		},
		initialData: [],
	})
}

export const useGetOrderBooks = (asset: string, key: number) => {
	return useQuery({
		queryKey: [...keys.orderBooks, asset, key],
		queryFn: async () => {
			const { data: buyBooks } = await supabase
				.from('order_books')
				.select('*')
				.gt('quantity', 0)
				.eq('order_type', 'buy')
				.order('id', { ascending: false })
				.limit(7)

			const { data: sellBooks } = await supabase
				.from('order_books')
				.select('*')
				.gt('quantity', 0)
				.eq('order_type', 'sell')
				.order('price', { ascending: false })
				.limit(7)

			return { buyBooks, sellBooks }
		},
		retry: 1,
		refetchInterval: false,
	})
}
