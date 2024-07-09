import { supabase } from '@/lib/supabase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Session } from '@supabase/auth-js'
import { type ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'

export type UserType = {
	id: string
	username: string
}

const AppContext = createContext<{
	user: UserType
	username: string
	session: Session | null
}>({
	user: { id: '', username: '' },
	username: '',
	session: null,
})

const AppContextProvider = ({ children }: { children: ReactNode }) => {
	const [username, setUsername] = useState<string>('')
	const [user, setUser] = useState<UserType>({ username: '', id: '' })
	const [session, setSession] = useState<Session | null>(null)

	const initializeUser = useCallback(async (session: Session | null) => {
		setSession(session)

		let user: UserType
		let username: string
		if (session) {
			username = session.user.user_metadata.user_name
		} else {
			username = await AsyncStorage.getItem('username')
		}

		const { data } = await supabase.from('users').select('*').eq('username', username).single()

		if (!data) {
			username = `user${Date.now().toString().slice(-4)}`

			const { data } = await supabase
				.from('users')
				.upsert({ username: username }, { onConflict: 'username' })
				.select('*')
				.single()

			if (data) {
				// insert basic balance from IDR
				await supabase.from('balances').insert({ user_id: data.id, asset: 'IDR', balance: 10000000000000 }).select()
				await AsyncStorage.setItem('user', JSON.stringify(data))
				await AsyncStorage.setItem('username', username)
			}
		} else {
			user = data
		}

		setUsername(username)
		setUser(user)
	}, [])

	useEffect(() => {
		const {
			data: { subscription: authSubscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			initializeUser(session).then(() => {})
		})

		return () => {
			authSubscription.unsubscribe()
		}
	}, [initializeUser])

	return (
		<AppContext.Provider value={{ user, username, session }}>{user && username ? children : null}</AppContext.Provider>
	)
}

const useAppContext = () => useContext(AppContext)

export { AppContext, AppContextProvider, useAppContext }
