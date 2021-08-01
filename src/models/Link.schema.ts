import { ObjectId } from "mongodb";

export interface Link {
	_id?: ObjectId;
	slug: string;
	destination: string;
	administration: boolean;
	password?: string;
	lastVisit: Date;
	createdAt: Date;
}
