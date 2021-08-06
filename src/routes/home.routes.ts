import { Router } from "express";
import { ObjectId } from "mongodb";
import * as yup from "yup";

import {
	handleShrinkUrl,
	handleEnableAnalytics,
} from "../controllers/home.controllers";
import validateRequest from "../middlewares/validateRequest";

const router = Router();

const handleShrinkUrlSchema = yup.object().shape({
	url: yup
		.string()
		.trim()
		.required("URL is a required field!")
		.matches(
			/^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i,
			"Not a valid URL!"
		),
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

router.post(
	"/shrinkurl",
	validateRequest("body", handleShrinkUrlSchema),
	handleShrinkUrl
);

router.put(
	"/enableanalytics",
	validateRequest("body", handleEnableAnalyticsSchema),
	handleEnableAnalytics
);

export default router;
