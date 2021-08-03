import { Request, Response, NextFunction } from "express";
import { LinkWithAnalytics } from "../models/Link.schema";
import { fetchAnalytics } from "../services/admin.services";

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
				res.status(403).json({ message: "Wrong Password" });
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
) => {};

export const handleEditDestination = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};
