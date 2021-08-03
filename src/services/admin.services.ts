import bcrypt from "bcrypt";

import { getDb } from "../db/mongodb";

import { LinkWithAnalytics } from "../models/Link.schema";

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
			throw "Incorrect password";
		}
	} else {
		throw "Invalid slug or administration not enabled";
	}
};
