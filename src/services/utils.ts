import { customAlphabet } from "nanoid";

export const urlRegEx =
	/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,60}(:[0-9]{1,5})?(\/.*)?$/i;

export const slugRegEx = /^([a-zA-Z0-9]+([-_]*[a-zA-Z0-9]+)*)$/;

export const isCrawler = (userAgent: string = ""): boolean => {
	return /bot|crawl|spider|twitter|whatsapp|discord|linkedin|telegram|facebook/i.test(
		userAgent
	);
};

export const getUrlWithProtocol = (url: string): string => {
	if (/^https?:\/\//i.test(url)) {
		return url;
	} else {
		return `https://${url}`;
	}
};

export const generateSlug = (): string => {
	const slugDict =
		"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	const nanoid = customAlphabet(slugDict, 10);
	return nanoid();
};

export const generatePassword = (): string => {
	const passwordDict =
		"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$!";
	const nanoid = customAlphabet(passwordDict, 16);
	return nanoid();
};
