import { Router } from "express";

import {
	handleLogin,
	handleEditSlug,
	handleEditDestination,
} from "../controllers/admin.controllers";

const router = Router();

router.post("/login", handleLogin);
router.post("/editSlug", handleEditSlug);
router.post("/editDestination", handleEditDestination);

export default router;
