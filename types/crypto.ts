export interface CryptoDataInterface {
	id: string
	symbol: string
	name: string
	image: string
	current_price: number
	market_cap: number
	market_cap_rank: number
	fully_diluted_valuation: number
	price_change_24h: number
	price_change_percentage_24h: number
	total_volume: number
	high_24h: number
	low_24h: number
}

export interface OrderBookInterface {
	id: number
	user_id: string
	asset: string
	price: number
	quantity: number
	order_type: 'buy' | 'sell'
}
