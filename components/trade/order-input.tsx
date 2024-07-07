import { StyledView } from '@/components/ui/base-layout'
import Button from '@/components/ui/button'
import InputField from '@/components/ui/input-field'
import { useState } from 'react'

const inactiveClasses = 'text-gray-600'
export default function OrderInput() {
	const [orderMode, setOrderMode] = useState<'buy' | 'sell'>('buy')

	const classes = orderMode === 'buy' ? 'bg-green-500' : 'bg-red-500'

	const handleChangeOrderMode = (type: 'buy' | 'sell') => {
		setOrderMode(type)
	}

	return (
		<StyledView className="flex flex-col justify-items-stretch space-y-8">
			<StyledView className="flex-row">
				<Button
					label="Buy"
					style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
					classes={{
						root: `${orderMode === 'buy' ? 'bg-green-500' : 'bg-gray-400'} flex-1`,
						text: `${orderMode !== 'buy' && inactiveClasses} font-bold`,
					}}
					onPress={() => handleChangeOrderMode('buy')}
				/>
				<Button
					label="Sell"
					style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
					classes={{
						root: `${orderMode === 'sell' ? 'bg-red-500' : 'bg-gray-400'} flex-1`,
						text: `${orderMode !== 'sell' && inactiveClasses} font-bold`,
					}}
					onPress={() => handleChangeOrderMode('sell')}
				/>
			</StyledView>

			<StyledView className="space-y-4">
				<StyledView>
					<InputField label="Price" />
				</StyledView>
				<StyledView>
					<InputField label="Amount (BTC)" inputProps={{ placeholder: '0' }} />
				</StyledView>
				<StyledView>
					<InputField label="Total (IDR)" inputProps={{ placeholder: '0' }} />
				</StyledView>
			</StyledView>
			<StyledView>
				<Button label={orderMode === 'buy' ? 'Buy' : 'Sell'} classes={{ root: `${classes} p-2`, text: 'font-bold' }} />
			</StyledView>
		</StyledView>
	)
}
