import express from "express";
const router = express.Router();

import {verifyAdminToken, verifyToken} from "../middleware/auth.js";
import {getPrice, postPrice} from "../controllers/price.js";

router.get("/price/:companyId/:id", verifyToken, getPrice);
router.post("/price", verifyAdminToken, postPrice);

export default router;