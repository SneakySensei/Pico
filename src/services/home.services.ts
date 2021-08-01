import { Document } from "bson";
import { customAlphabet } from "nanoid";

import { getDb } from "../db/mongodb";

import { Link } from "../models/Link.schema";

const dict = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const createLink = async (destination: string): Promise<Link> => {
	const nanoid = customAlphabet(dict, 10);
	const slug = nanoid();
	try {
		const linkObj: Link = {
			slug,
			destination,
			administration: false,
			createdAt: new Date(),
			lastVisit: new Date(),
		};
		const link = await getDb().collection("links").insertOne(linkObj);
		return { ...linkObj, _id: link.insertedId } as Link;
	} catch (err) {
		return await createLink(destination);
	}
};

export const fetchLinkAndVisit = async (slug: string): Promise<Link> => {
	console.log("Called")
	const link = await getDb().collection("links").findOneAndUpdate({ slug: slug }, { "$set": { "lastVisit": new Date() } });
	return link.value as Link;
};

export const addVisit = async (link: Link, clientIP: string) => {
	console.log(link._id, clientIP)
}
