import { Request, Response, NextFunction } from "express";

import {
	addVisit,
	createLink,
	fetchLinkAndVisit,
} from "../services/home.services";

export const shrinkurl = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { url } = req.body;
	const link = await createLink(url);
	res.json(link);
};

export const handleLinkVisit = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { slug } = req.params;

	// Extract client IP
	const xForwardedFor = req.get("X-Forwarded-For")!;
	const clientIP: string = Array.isArray(xForwardedFor)
		? xForwardedFor[0]
		: xForwardedFor;

	const link = await fetchLinkAndVisit(slug);
	if (link) {
		if (link.administration) {
			await addVisit(link, clientIP);
		}
		res.redirect(link.destination);
	} else {
		res.status(404).send("404 Link not found!");
	}
};
