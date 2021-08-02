import { config as dotenvConfig } from "dotenv";
dotenvConfig({ debug: true });

import express from "express";
import cors from "cors";

import { initializeMongoDBClient } from "./db/mongodb";

import { homeRoutes } from "./routes";
import { handleLinkVisit } from "./controllers/home.controllers";

const app: express.Application = express();

app.use(express.json());

app.use((req, res, next) => {
	if (process.env.NODE_ENV === "development") {
		req.headers["x-forwarded-for"] = process.env.TEST_IP;
	}
	next();
});

// TODO /api routes
app.use("/api", cors(), homeRoutes);

// TODO /:slug route
app.get("/:slug", handleLinkVisit);
// TODO / client route

Promise.all([initializeMongoDBClient()])
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`✅ Listening on port ${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
		console.log("Unable to load core modules. Exiting...");
		process.exit(1);
	});

process.on("SIGTERM", () => {
	process.exit(0);
});
process.on("SIGINT", () => {
	process.exit(0);
});
