import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: '#FFA001',
				tabBarInactiveTintColor: '#CDCDE0',
				tabBarShowLabel: true,
				headerShown: false,
				tabBarStyle: {
					backgroundColor: '#161622',
					borderTopWidth: 1,
					borderTopColor: '#232533',
					height: 84,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="[crypto]"
				options={{
					title: 'Trade',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
					),
				}}
			/>
		</Tabs>
	)
}
