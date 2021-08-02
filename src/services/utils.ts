export const isCrawler = (userAgent: string = ""): boolean => {
	return /bot|crawl|spider|twitter|whatsapp|discord|linkedin|telegram|facebook/i.test(
		userAgent
	);
};
