import { Router } from "express";

import {
	handleLogin,
	handleEditSlug,
	handleEditDestination,
} from "../controllers/admin.controllers";

const router = Router();

router.post("/login", handleLogin);
router.put("/editSlug/:slug", handleEditSlug);
router.put("/editDestination/:slug", handleEditDestination);

export default router;
