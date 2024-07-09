import { useAppContext } from '@/components/app-context'
import { useCryptoContext } from '@/components/crypto-context'
import { StyledText, StyledView } from '@/components/ui/base-layout'
import Button from '@/components/ui/button'
import InputField from '@/components/ui/input-field'
import { currencyFormat } from '@/lib/helper'
import { type OrderFormValues, useExecuteOrder } from '@/services/order'
import { useGetUserBalance } from '@/services/user'
import { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const inactiveClasses = 'text-gray-600'
const types: { label: string; value: 'buy' | 'sell'; color: string }[] = [
	{ label: 'Buy', value: 'buy', color: 'green-500' },
	{ label: 'Sell', value: 'sell', color: 'red-500' },
]

export default function OrderInput() {
	const { control, handleSubmit, setError, reset, getValues, setValue } = useForm<OrderFormValues>({
		defaultValues: {
			price: '0',
			amount: '0',
			total: '0',
			type: 'buy',
		},
	})

	const [orderMode, setOrderMode] = useState<'buy' | 'sell'>('buy')
	const { user } = useAppContext()
	const { data: crypto } = useCryptoContext()
	const { data: balances, refetch } = useGetUserBalance(user, crypto.id)
	const orderMutation = useExecuteOrder(user, crypto.id, {
		onSuccess: async () => {
			await refetch()
			reset()
		},
	})

	console.log('data: ', balances)

	const values = getValues()

	const classes = values.type === 'buy' ? 'bg-green-500' : 'bg-red-500'

	const handleInputChange = useCallback(
		(type: string, value: string) => {
			const { price, total } = getValues()

			if (type === 'price') {
				const calculate = Number.parseFloat(total) / (Number.parseFloat(value) ?? 0)

				setValue('amount', Number.isNaN(calculate) ? '0' : calculate.toString())
			}

			if (type === 'amount') {
				const calculate = Number.parseFloat(price) * (Number.parseFloat(value) ?? 0)

				setValue('total', Number.isNaN(calculate) ? '0' : calculate.toString())
			}

			if (type === 'total') {
				const calculate = Number.parseFloat(value) / (Number.parseFloat(price) ?? 0)

				setValue('amount', Number.isNaN(calculate) ? '0' : calculate.toString())
			}
		},
		[getValues, setValue],
	)

	const handleChangeOrderMode = (type: 'buy' | 'sell') => {
		setValue('type', type)
		setOrderMode(type)
	}

	const onSubmit = (data: OrderFormValues) => {
		if (data.type === 'buy') {
			if (balances.idrBalance < Number.parseFloat(data.total)) {
				setError('total', { message: 'Insufficient balance' })
				return
			}
		}

		if (data.type === 'sell') {
			if (balances.cryptoBalance < Number.parseFloat(data.amount)) {
				setError('amount', { message: 'Insufficient balance' })
				return
			}
		}

		orderMutation.mutate({ ...data, asset: crypto.id })
	}

	const getAvailableBalance = () => {
		if (orderMode === 'buy') {
			return currencyFormat(balances.idrBalance)
		}

		return `${currencyFormat(balances.cryptoBalance, true)} ${crypto.symbol.toUpperCase()}`
	}

	return (
		<StyledView className="flex flex-col justify-items-stretch space-y-8">
			<StyledView className="flex-row">
				{types.map((type) => (
					<Button
						key={type.value}
						label={type.label}
						classes={{
							root: `${orderMode === type.value ? `bg-${type.color}` : 'bg-gray-400'} flex-1 mr-2`,
							text: `${orderMode !== type.value && inactiveClasses} font-bold`,
						}}
						onPress={() => handleChangeOrderMode(type.value)}
					/>
				))}
			</StyledView>

			<StyledView className="space-y-4">
				<StyledView>
					<Controller
						control={control}
						rules={{
							required: 'Price is required',
						}}
						name={'price'}
						render={({ fieldState, field: { onChange, onBlur, value } }) => (
							<InputField
								{...fieldState}
								label="Price"
								inputProps={{
									onChangeText: (text) => {
										handleInputChange('price', text)
										onChange(text)
									},
									onBlur,
									keyboardType: 'numeric',
									defaultValue: value,
								}}
							/>
						)}
					/>
				</StyledView>
				<StyledView>
					<Controller
						control={control}
						rules={{
							required: 'Amount is required',
						}}
						name={'amount'}
						render={({ fieldState, field: { onChange, onBlur, value } }) => (
							<InputField
								{...fieldState}
								label={`Amount (${crypto.symbol.toUpperCase()})`}
								inputProps={{
									placeholder: '0',
									onChangeText: (text) => {
										onChange(text)
										handleInputChange('amount', text)
									},
									onBlur,
									defaultValue: value,
									keyboardType: 'numeric',
								}}
							/>
						)}
					/>
				</StyledView>
				<StyledView>
					<Controller
						control={control}
						rules={{
							required: 'Total is required',
						}}
						name={'total'}
						render={({ field: { onChange, onBlur, value }, fieldState }) => {
							return (
								<InputField
									{...fieldState}
									label="Total (IDR)"
									inputProps={{
										placeholder: '0',
										onChangeText: (text) => {
											onChange(text)
											handleInputChange('total', text)
										},
										onBlur,
										defaultValue: value,
										keyboardType: 'numeric',
									}}
								/>
							)
						}}
					/>
				</StyledView>

				<StyledView className="flex flex-row justify-end">
					<StyledText className="text-white text-xs">Available: {getAvailableBalance()}</StyledText>
				</StyledView>
			</StyledView>
			<StyledView>
				<Button
					disabled={orderMutation.isPending}
					label={values.type === 'buy' ? 'Buy' : 'Sell'}
					classes={{ root: `${classes} p-2`, text: 'font-bold' }}
					onPress={handleSubmit(onSubmit)}
				/>
			</StyledView>
		</StyledView>
	)
}
