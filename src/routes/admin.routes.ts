import { Router } from "express";

import {
	handleLogin,
	handleEditSlug,
	handleEditDestination,
} from "../controllers/admin.controllers";

const router = Router();

router.post("/login", handleLogin);
router.put("/editSlug", handleEditSlug);
router.put("/editDestination", handleEditDestination);

export default router;
