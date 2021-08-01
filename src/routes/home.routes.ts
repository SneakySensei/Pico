import { Router } from "express";

import { shrinkurl } from "../controllers/home.controllers";

const router = Router();

router.post("/shrinkurl", shrinkurl);

export default router;
