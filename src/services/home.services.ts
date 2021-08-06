import axios from "axios";
import { ObjectId, WriteConcernError, WriteError } from "mongodb";
import bcrypt from "bcrypt";

import { getDb } from "../db/mongodb";

import { Link } from "../models/Link.schema";
import { Visit } from "../models/Visit.schema";

import { generatePassword, generateSlug } from "./utils";
import { errors } from "../controllers/errors.controller";

export const createLink = async (
	destination: string
): Promise<Link | undefined> => {
	const slug = generateSlug();

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
		if (err.code === 11000) {
			// Handle duplicate slug
			return await createLink(destination);
		} else {
			throw err; // NOTE Will throw 500 Internal Server Error
		}
	}
};

export const enableAdministration = async (linkId: ObjectId): Promise<Link> => {
	const password = generatePassword();
	const hashedPassword = await bcrypt.hash(password, 10);

	const res = await getDb()
		.collection("links")
		.findOneAndUpdate(
			{ _id: new ObjectId(linkId), administration: false },
			{
				$set: {
					administration: true,
					password: hashedPassword,
				},
			},
			{ returnDocument: "after" }
		);

	if (res.value) {
		return res.value as Link;
	} else {
		throw errors.HOME_ENABLE_ADMINISTRATION_ERROR;
	}
};

export const fetchLinkAndVisit = async (slug: string): Promise<Link> => {
	const res = await getDb()
		.collection("links")
		.findOneAndUpdate({ slug: slug }, { $set: { lastVisit: new Date() } });
	if (res.value) {
		return res.value as Link;
	} else {
		throw errors.HOME_LINK_NOT_FOUND;
	}
};

/**
 * Adds a Visit to Database
 * @param {Link} link - object containing the visited Link with _id.
 * @param {string} clientIP - Client's public IP address.
 */
export const addVisit = async (link: Link, clientIP: string) => {
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
};
