import type { UserType } from '@/components/app-context'
import { supabase } from '@/lib/supabase'
import { type MutateOptions, useMutation } from '@tanstack/react-query'

export type OrderFormValues = {
	price: string
	amount: string
	total: string
	asset?: string
	type: 'buy' | 'sell'
}

export function useExecuteOrder(
	user: UserType,
	cryptoId: string,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	options?: MutateOptions<any, any, any, any>,
) {
	return useMutation({
		mutationFn: async (data: OrderFormValues): Promise<{ success: false } | { success: true }> => {
			try {
				// get user data
				const { data: userData } = await supabase
					.from('balances')
					.select('balance')
					.eq('user_id', user.id)
					.eq('asset', data.type === 'buy' ? 'IDR' : cryptoId)
					.single()

				// get the existing order on price range
				// ie: buy: 100k idr on price 200k. get all available sell orders on price 0-200k
				// ie: sell: 100k idr on price 200k. get all available buy orders on price 200k-inf
				const getPriceRange = await supabase
					.from('order_books')
					.select('*')
					.eq('order_type', data.type === 'buy' ? 'sell' : 'buy')
					.eq('asset', cryptoId)
					.filter('price', data.type === 'buy' ? 'lte' : 'gte', data.price)
					.order('price', { ascending: false })

				if (getPriceRange.data) {
					// sum all price range quantity to get same amount of quantity
					let sumQuantity = 0
					const pendingOrderIds = []
					for (const order of getPriceRange.data) {
						sumQuantity += order.quantity

						if (sumQuantity >= Number.parseFloat(data.amount)) {
							break
						}

						pendingOrderIds.push(order.id)
					}

					return
				}

				await supabase
					.from('orders')
					.insert({
						user_id: user.id,
						order_type: data.type,
						asset: cryptoId,
						price: data.price,
						quantity: data.amount,
						status: 'OPEN',
					})
					.select()

				// @ts-ignore
				const updateBalance = userData.balance - Number.parseFloat(data.type === 'buy' ? data.total : data.amount)
				await supabase
					.from('balances')
					.update({
						balance: updateBalance,
					})
					.eq('asset', data.type === 'buy' ? 'IDR' : cryptoId)
					.eq('user_id', user.id)
					.select()

				// get same order
				const checkPrice = await supabase
					.from('order_books')
					.select('*')
					.eq('order_type', data.type)
					.eq('price', data.price)
					.eq('asset', cryptoId)
					.single()

				// exists update. not exists insert
				if (checkPrice.data) {
					await supabase
						.from('order_books')
						.update({
							order_type: data.type,
							asset: cryptoId,
							price: data.price,
							quantity: Number.parseFloat(data.amount) + checkPrice.data.quantity,
						})
						.eq('id', checkPrice.data.id)
						.select()
				} else {
					await supabase.from('order_books').insert({
						order_type: data.type,
						asset: cryptoId,
						price: data.price,
						quantity: data.amount,
					})
				}

				return { success: true }
			} catch (error) {
				return { success: false }
			}
		},
		...options,
	})
}
