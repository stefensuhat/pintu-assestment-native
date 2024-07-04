import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const fetch = axios.create({
	baseURL,
});

fetch.interceptors.request.use(
	(config) => {
		const newConfig = { ...config };
		const headers = {
			accept: "application/json",
			"content-type": "application/json",
			"x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
		};

		newConfig.headers = { ...headers, ...newConfig.headers };

		return config;
	},
	(error) => Promise.reject(error),
);

fetch.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(get(error, "response.data", "Something went wrong!"));
	},
);

export default fetch;
