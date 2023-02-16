import axios from "axios";

let baseUrl = import.meta.env.VITE_API_BASE_URL;

export const instance = axios.create({
	baseURL: baseUrl,
	timeout: 30000,
});

instance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			throw error.response.data;
		} else {
			throw error;
		}
	}
);
