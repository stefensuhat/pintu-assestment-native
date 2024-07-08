import type { UserType } from '@/components/app-context'
import { useFocusNotifyOnChangeProps } from '@/hooks/useFocusNotifyOnChangeProps'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

const keys = {
	balances: ['user', 'balances'],
}

export const useGetUserBalance = (user: UserType, cryptoId: string) => {
	return useQuery({
		queryKey: [...keys.balances, { user: user.id, cryptoId }],
		queryFn: async (): Promise<{
			idrBalance: number
			cryptoBalance: number
		}> => {
			const { data: cryptoBalance } = await supabase
				.from('balances')
				.select('balance')
				.eq('user_id', user.id)
				.eq('asset', cryptoId)
				.single()

			const { data: idrBalance } = await supabase
				.from('balances')
				.select('balance')
				.eq('user_id', user.id)
				.eq('asset', 'IDR')
				.single()

			return {
				idrBalance: idrBalance ? idrBalance.balance : 0,
				cryptoBalance: cryptoBalance ? cryptoBalance.balance : 0,
			}
		},
		// @ts-ignore
		notifyOnChangeProps: useFocusNotifyOnChangeProps(),
		initialData: {
			idrBalance: 0,
			cryptoBalance: 0,
		},
	})
}
