import axios from 'axios'

const apiUrl = process.env.EXPO_PUBLIC_COINGECKO_API_URL
const cgApiKey = process.env.EXPO_PUBLIC_COINGECKO_API_KEY

const fetch = axios.create({
	baseURL: apiUrl,
	headers: {
		accept: 'application/json',
		'content-type': 'application/json',
		'x-cg-demo-api-key': cgApiKey,
	},
})

fetch.interceptors.request.use(
	(config) => {
		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)

fetch.interceptors.response.use(
	(response) => {
		return response.data
	},
	(error) => {
		console.log('error: ', error.response.data)

		return Promise.reject(error.response.data)
	},
)

export default fetch
