import axios, { AxiosInstance } from "axios";
import { shortUrlType } from "pages/Home";

export const API = process.env.REACT_APP_API_URL;

const instance = axios.create({
	baseURL: `https://pico.snehil.dev/api`,
});

export const createShortLink = async (url) => {
	await new Promise((resolve) => setTimeout(() => resolve(undefined), 3000));
	try {
		const res = await instance.post("/shrinkurl", { url });
		return res.data;
	} catch (err) {
		handleError(err);
	}
};

const handleError = (err) => {
	console.log(err);
};
