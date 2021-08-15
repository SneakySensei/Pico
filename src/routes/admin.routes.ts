import { Router } from "express";
import * as yup from "yup";

import {
	handleLogin,
	handleEditSlug,
	handleEditDestination,
} from "../controllers/admin.controllers";
import validateRequest from "../middlewares/validateRequest";
import { slugRegEx, urlRegEx } from "../services/utils";

const router = Router();

const slugSchema = yup
	.string()
	.trim()
	.required("Slug is a required field!")
	.matches(slugRegEx, "Not a valid slug!");

const handleLoginSchema = yup.object().shape({
	slug: slugSchema,
	password: yup.string().trim().required("Password is a required field!"),
});

const slugParamSchema = yup.object().shape({
	slug: slugSchema,
});

const handleEditSlugSchema = yup.object().shape({
	newSlug: yup
		.string()
		.trim()
		.required("Please enter the new slug for the requested update!")
		.matches(
			/^([a-zA-Z0-9]+([-_]*[a-zA-Z0-9]+)*)$/,
			"New slug is not valid! A slug may contain only a-z, A-Z, 0-9, -, and _ symbols."
		),
	password: yup.string().trim().required("Password is a required field!"),
});

const handleEditDestinationSchema = yup.object().shape({
	newDestination: yup
		.string()
		.trim()
		.required("Please enter the new destination for the requested update!")
		.matches(urlRegEx, "New destination must be a valid URL!"),
	password: yup.string().trim().required("Password is a required field!"),
});

router.post("/login", validateRequest("body", handleLoginSchema), handleLogin);
router.put(
	"/editSlug/:slug",
	validateRequest("params", slugParamSchema),
	validateRequest("body", handleEditSlugSchema),
	handleEditSlug
);
router.put(
	"/editDestination/:slug",
	validateRequest("params", slugParamSchema),
	validateRequest("body", handleEditDestinationSchema),
	handleEditDestination
);

export default router;
