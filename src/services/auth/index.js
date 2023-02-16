import { instance } from "../customAxios";
import { authPath } from "../path";

export const serviceAuthentication = (data) =>
	instance({
		url: authPath,
		method: "POST",
		data,
	})
		.then((res) => Promise.resolve(res))
		.catch((err) => Promise.reject(err));
