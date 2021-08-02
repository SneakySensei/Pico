import { Router } from "express";

import {
	handleShrinkurl,
	handleEnableAnalytics,
} from "../controllers/home.controllers";

const router = Router();

router.post("/shrinkurl", handleShrinkurl);
router.post("/enableanalytics", handleEnableAnalytics);

export default router;
