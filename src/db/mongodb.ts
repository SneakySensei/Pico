import * as MongoDB from "mongodb";

let instance: MongoDB.MongoClient = new MongoDB.MongoClient(
	process.env.MONGODB_URI!
);

export const initializeMongoDBClient = async (): Promise<void> => {
	try {
		await instance.connect();
		const indexinfo = await instance.db().collection("links").indexes();
		if (indexinfo.length === 1) {
			await instance
				.db()
				.collection("links")
				.createIndex({ slug: 1 }, { unique: true, name: "slugIndex" });
		}
		console.log("✅ Connected to MongoDB");
	} catch (err) {
		console.log(err);
	}
};

export const getDb = (): MongoDB.Db => {
	return instance.db();
};
