import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";

import {
	addVisit,
	createLink,
	enableAdministration,
	fetchLinkAndVisit,
} from "../services/home.services";

import { isCrawler } from "../services/utils";

export const handleShrinkUrl = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { url } = req.body;

	try {
		const link = await createLink(url);
		res.json(link);
	} catch (err) {
		next(err);
	}
};

// NOTE Might be vulnerable to bruteforce _id attacks. Visit Later.
export const handleEnableAnalytics = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const linkId: ObjectId = req.body.linkId;

	try {
		const updatedLink = await enableAdministration(linkId);
		res.json(updatedLink);
	} catch (err) {
		next(err);
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

	try {
		const link = await fetchLinkAndVisit(slug);
		if (link) {
			if (
				link.administration &&
				!isCrawler(req.get("User-Agent")!) &&
				req.headers["sec-fetch-mode"] === "navigate" // only run for actual user requests and not other meta requests
			) {
				addVisit(link, clientIP);
			}
			res.redirect(link.destination);
		} else {
			res.status(404).send("404 Link not found!");
		}
	} catch (err) {
		next("route");
	}
};
