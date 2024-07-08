import type { UserType } from '@/components/app-context'
import { supabase } from '@/lib/supabase'
import type { CryptoDataInterface } from '@/types/crypto'
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
	cryptoId: CryptoDataInterface,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	options?: MutateOptions<any, any, any, any>,
) {
	return useMutation({
		mutationFn: async (data: OrderFormValues): Promise<{ success: false } | { success: true }> => {
			try {
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

				// get same price
				const checkPrice = await supabase
					.from('order_books')
					.select('*')
					.eq('order_type', data.type)
					.eq('price', data.price)
					.eq('asset', cryptoId)
					.single()

				if (checkPrice.data) {
					await supabase
						.from('order_books')
						.update({
							order_type: data.type,
							asset: cryptoId,
							price: data.price,
							quantity: Number.parseFloat(data.amount) + checkPrice.data.quantity,
						})
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
				console.log(error)
				return { success: false }
			}
		},
		...options,
	})
}
