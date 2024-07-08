import express from "express";
import {
    getOrder,
    getOrders,
    postOrder,
} from "../controllers/client.js";
import {verifyAdminToken, verifyToken} from "../middleware/auth.js";
import {getPartner, getPartners, postPartner} from "../controllers/client.js";

const router = express.Router();

router.get("/partners", verifyToken, getPartners);
router.get("/partners/:id", verifyToken, getPartner);
router.post("/partners", verifyAdminToken, postPartner);

router.get("/order/:id", verifyToken, getOrder);
router.get("/orders", verifyToken, getOrders);
router.post("/orders", verifyToken, postOrder);
export  default router;