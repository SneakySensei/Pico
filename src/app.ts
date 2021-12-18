import { config as dotenvConfig } from "dotenv";
dotenvConfig({ debug: true });

import express from "express";
import path from "path";
import cors from "cors";
import rateLimit from "express-rate-limit";

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

// Limits requests by the second
const apiLimiterSeconds = rateLimit({
	windowMs: 1000,
	max: process.env.NODE_ENV !== "development" ? 0 : 3,
	message:
		"Whoah slow down! Pico cannot handle that many requests. Please try after some time.",
});

// Limits requests by the hour
const apiLimiterMinutes = rateLimit({
	windowMs: 1 * 60 * 60 * 1000,
	max: process.env.NODE_ENV !== "development" ? 0 : 16,
	message:
		"Whoah slow down! Pico cannot handle that many requests. Please try again in an hour.",
});

// NOTE /api routes
app.use("/api", apiLimiterSeconds, apiLimiterMinutes, homeRoutes);
app.use("/api/admin", cors(), adminRoutes);

// NOTE /:slug route
app.get("/:slug", handleLinkVisit);

app.use(express.static(path.join(__dirname, "..", "client", "build")));

// if (process.env.NODE_ENV === "production") {
app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});
// }

// TODO Error handler
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
