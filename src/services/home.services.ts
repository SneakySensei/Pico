import axios from "axios";
import { customAlphabet } from "nanoid";
import { getDb } from "../db/mongodb";

import { Link } from "../models/Link.schema";
import { Visit } from "../models/Visit.schema";

const dict = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const createLink = async (destination: string): Promise<Link> => {
	const nanoid = customAlphabet(dict, 10);
	const slug = nanoid();

	const linkObj: Link = {
		slug,
		destination,
		administration: false,
		createdAt: new Date(),
		lastVisit: new Date(),
	};

	try {
		const link = await getDb().collection("links").insertOne(linkObj);
		return { ...linkObj, _id: link.insertedId } as Link;
	} catch (err) {
		return await createLink(destination);
	}
};

export const fetchLinkAndVisit = async (slug: string): Promise<Link> => {
	const link = await getDb()
		.collection("links")
		.findOneAndUpdate({ slug: slug }, { $set: { lastVisit: new Date() } });
	return link.value as Link;
};

export const addVisit = async (link: Link, clientIP: string) => {
	try {
		const { data } = await axios.get(
			`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IPGEOLOCATION_API_KEY}&ip=${clientIP}`
		);
		const latitude: string = data.latitude;
		const longitude: string = data.longitude;

		const visitObj: Visit = {
			linkId: link._id!,
			createdAt: new Date(),
			latitude: latitude,
			longitude: longitude,
		};
		await getDb().collection("visits").insertOne(visitObj);
	} catch (err) {
		console.log(err);
	}
};
