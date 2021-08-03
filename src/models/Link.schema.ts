import { ObjectId } from "mongodb";
import { Visit } from "./Visit.schema";

export interface Link {
	_id?: ObjectId;
	slug: string;
	destination: string;
	administration: boolean;
	password?: string;
	lastVisit: Date;
	createdAt: Date;
}

export interface LinkWithAnalytics {
	slug: string;
	destination: string;
	visits: Visit[];
}
