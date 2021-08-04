import { Request, Response, NextFunction } from "express";

import {
	fetchAnalytics,
	updateSlug,
	updateDestination,
} from "../services/admin.services";

export const handleLogin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { slug, password } = req.body;
	try {
		const linkWithAnalytics = await fetchAnalytics(slug, password);
		res.json(linkWithAnalytics);
	} catch (err) {
		switch (err) {
			case "Incorrect password":
				res.status(401).json({ message: "Wrong Password" });
				break;
			case "Invalid slug or administration not enabled":
				res
					.status(404)
					.json({ message: "Invalid slug or administration not enabled" });
				break;
		}
	}
};

export const handleEditSlug = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { slug } = req.params;
	const { password, newSlug } = req.body;

	const newLink = await updateSlug(slug, password, newSlug);
	delete newLink._id;
	delete newLink.password;
	res.json(newLink);
};

export const handleEditDestination = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { slug } = req.params;
	const { password, newDestination } = req.body;

	const newLink = await updateDestination(slug, password, newDestination);
	delete newLink._id;
	delete newLink.password;
	res.json(newLink);
};
