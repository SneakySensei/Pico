import { config as dotenvConfig } from "dotenv";
dotenvConfig({ debug: true });

import express from "express";
import cors from "cors";

import { initializeMongoDBClient } from "./db/mongodb";

import { homeRoutes, adminRoutes } from "./routes";
import { handleLinkVisit } from "./controllers/home.controllers";
import { errorHandler } from "./controllers/errors.controller";

const app: express.Application = express();

app.use(express.json());

app.use((req, res, next) => {
	if (process.env.NODE_ENV === "development") {
		req.headers["x-forwarded-for"] = process.env.TEST_IP;
	}
	next();
});

// NOTE /api routes
app.use("/api", cors(), homeRoutes);
app.use("/api/admin", cors(), adminRoutes);

// NOTE /:slug route
app.get("/:slug", handleLinkVisit);

// TODO / client route
// TODO /admin/:slug client route

// TODO 404 handler
app.use(errorHandler);

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
