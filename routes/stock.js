import express from "express";
const router = express.Router();

import {verifyAdminToken, verifyToken} from "../middleware/auth.js";
import {getStock, postStock} from "../controllers/stock.js";

router.get("/stock", verifyToken, getStock);
router.post("/stock", verifyAdminToken, postStock);

export default router;