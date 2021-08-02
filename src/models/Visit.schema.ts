import { ObjectId } from "mongodb";

export interface Visit {
	_id?: ObjectId;
	linkId: ObjectId;
	longitude: string;
	latitude: string;
	createdAt: Date;
}
