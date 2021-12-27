import { Router } from "express";
import { ObjectId } from "mongodb";
import * as yup from "yup";
import rateLimit from "express-rate-limit";

import {
	handleShrinkUrl,
	handleEnableAnalytics,
} from "../controllers/home.controllers";
import validateRequest from "../middlewares/validateRequest";
import { urlRegEx } from "../services/utils";

const router = Router();

const handleShrinkUrlSchema = yup.object().shape({
	url: yup
		.string()
		.trim()
		.required("URL is a required field!")
		.matches(urlRegEx, "Not a valid URL!"),
});

const handleEnableAnalyticsSchema = yup.object().shape({
	linkId: yup
		.string()
		.trim()
		.required("linkId is required to enable administration!")
		.test("is-objectId", "Not a valid linkId!", (value, context) =>
			ObjectId.isValid(value!)
		),
});

// Limits requests by the second on production
const apiLimiterSeconds = rateLimit({
	windowMs: 1000,
	max: process.env.NODE_ENV !== "development" ? 0 : 2,
	message:
		"Whoah slow down! Pico cannot handle that many requests. Please try after some time.",
});

// Limits requests by the hour on production
const apiLimiterMinutes = rateLimit({
	windowMs: 1 * 60 * 60 * 1000,
	max: process.env.NODE_ENV !== "development" ? 0 : 5,
	message:
		"Whoah slow down! Pico cannot handle that many requests. Please try again in an hour.",
});

router.post(
	"/shrinkurl",
	apiLimiterSeconds,
	apiLimiterMinutes,
	validateRequest("body", handleShrinkUrlSchema),
	handleShrinkUrl
);

router.put(
	"/enableanalytics",
	validateRequest("body", handleEnableAnalyticsSchema),
	handleEnableAnalytics
);

export default router;
