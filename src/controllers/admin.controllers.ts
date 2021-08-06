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
		next(err);
	}
};

export const handleEditSlug = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { slug } = req.params;
	const { password, newSlug } = req.body;

	try {
		const newLink = await updateSlug(slug, password, newSlug);
		delete newLink._id;
		delete newLink.password;
		res.json(newLink);
	} catch (err) {
		next(err);
	}
};

export const handleEditDestination = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { slug } = req.params;
	const { password, newDestination } = req.body;

	try {
		const newLink = await updateDestination(slug, password, newDestination);
		delete newLink._id;
		delete newLink.password;
		res.json(newLink);
	} catch (err) {
		next(err);
	}
};
