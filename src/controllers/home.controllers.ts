import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";

import {
	addVisit,
	createLink,
	enableAdministration,
	fetchLinkAndVisit,
} from "../services/home.services";

import { isCrawler } from "../services/utils";

export const handleShrinkurl = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { url } = req.body;
	const link = await createLink(url);
	res.json(link);
};

// ! MIGHT BE VULNERABLE TO BRUTEFORCE _id ATTACKS. NEEDS REFACTORING.
export const handleEnableAnalytics = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const linkId: ObjectId = req.body.linkId;
	const updatedLink = await enableAdministration(linkId);
	console.log(updatedLink);
	if (updatedLink) {
		res.json(updatedLink);
	} else {
		res.status(406).json({
			message: "Link not found or administration is already turned on!",
		});
	}
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
		if (link.administration && !isCrawler(req.get("User-Agent")!)) {
			await addVisit(link, clientIP);
		}
		res.redirect(link.destination);
	} else {
		res.status(404).send("404 Link not found!");
	}
};
