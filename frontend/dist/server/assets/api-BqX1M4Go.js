import axios from "axios";
//#region src/lib/api.ts
var api = axios.create({
	baseURL: "https://fortibcode-production.up.railway.app/api",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json"
	}
});
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("auth_token");
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});
//#endregion
export { api as t };
