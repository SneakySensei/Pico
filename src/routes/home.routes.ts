import { Router } from "express";
import { ObjectId } from "mongodb";
import * as yup from "yup";

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
