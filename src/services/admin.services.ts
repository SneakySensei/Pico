import bcrypt from "bcrypt";
import { errors } from "../controllers/errors.controller";

import { getDb } from "../db/mongodb";

import { Link, LinkWithAnalytics } from "../models/Link.schema";

export const fetchAnalytics = async (
	slug: string,
	password: string
): Promise<LinkWithAnalytics> => {
	const aggregatedLinks = await getDb()
		.collection("links")
		.aggregate([
			{ $match: { slug: slug } },
			{
				$lookup: {
					from: "visits",
					localField: "_id",
					foreignField: "linkId",
					as: "visits",
				},
			},
		])
		.toArray();

	if (aggregatedLinks.length > 0) {
		console.dir(aggregatedLinks);
		const passwordMatch = await bcrypt.compare(
			password,
			aggregatedLinks[0].password
		);
		if (passwordMatch) {
			const link: LinkWithAnalytics = {
				slug: aggregatedLinks[0].slug,
				destination: aggregatedLinks[0].destination,
				visits: aggregatedLinks[0].visits,
			};
			return link;
		} else {
			throw errors.ADMIN_INCORRECT_PASSWORD;
		}
	} else {
		throw errors.ADMIN_NOT_ENABLED;
	}
};

export const updateSlug = async (
	slug: string,
	password: string,
	newSlug: string
): Promise<Link> => {
	const link = await getDb().collection("links").findOne<Link>({ slug: slug });
	if (link && link.administration) {
		const passwordMatch = await bcrypt.compare(password, link.password!);
		if (passwordMatch) {
			link.slug = newSlug;
			try {
				const res = await getDb()
					.collection("links")
					.findOneAndUpdate(
						{ slug: slug },
						{ $set: { slug: newSlug } },
						{ returnDocument: "after" }
					);
				const newLink = res.value as Link;
				return newLink;
			} catch (err) {
				throw errors.ADMIN_DUPLICATE_SLUG;
			}
		} else {
			throw errors.ADMIN_INCORRECT_PASSWORD;
		}
	} else {
		throw errors.ADMIN_NOT_ENABLED;
	}
};

export const updateDestination = async (
	slug: string,
	password: string,
	newDestination: string
): Promise<Link> => {
	const link = await getDb().collection("links").findOne<Link>({ slug: slug });
	if (link && link.administration) {
		const passwordMatch = await bcrypt.compare(password, link.password!);
		if (passwordMatch) {
			const res = await getDb()
				.collection("links")
				.findOneAndUpdate(
					{ slug: slug },
					{ $set: { destination: newDestination } },
					{ returnDocument: "after" }
				);
			const newLink = res.value as Link;
			return newLink;
		} else {
			throw errors.ADMIN_INCORRECT_PASSWORD;
		}
	} else {
		throw errors.ADMIN_NOT_ENABLED;
	}
};
