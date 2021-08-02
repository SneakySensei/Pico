import { customAlphabet } from "nanoid";

export const isCrawler = (userAgent: string = ""): boolean => {
	return /bot|crawl|spider|twitter|whatsapp|discord|linkedin|telegram|facebook/i.test(
		userAgent
	);
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
