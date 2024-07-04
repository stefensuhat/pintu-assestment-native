export function currencyFormat(num: number) {
	return `Rp. ${num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`
}

export function convertToInternationalCurrencySystem(labelValue: number) {
	// Nine Zeroes for Billions
	const currency =
		Math.abs(Number(labelValue)) >= 1.0e9
			? `${(Math.abs(Number(labelValue)) / 1.0e9).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}B`
			: // Six Zeroes for Millions
				Math.abs(Number(labelValue)) >= 1.0e6
				? `${(Math.abs(Number(labelValue)) / 1.0e6).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}M`
				: // Three Zeroes for Thousands
					Math.abs(Number(labelValue)) >= 1.0e3
					? `${(Math.abs(Number(labelValue)) / 1.0e3).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}K`
					: Math.abs(Number(labelValue))

	return `${currency}`
}
