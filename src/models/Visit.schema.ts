import { ObjectId } from "mongodb";

export interface Visit {
	_id?: ObjectId;
	linkId: ObjectId;
	ip: string;
	longitude: string;
	latitude: string;
	createdAt: Date;
}
