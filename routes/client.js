import express from "express";
import {
    deleteProposal,
    getOrder,
    getOrders, getProposal,
    postOrder, postProposal,
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

router.get("/proposal/:id", getProposal);
router.post("/proposal", verifyAdminToken, postProposal);
router.delete("/proposal/:id", verifyAdminToken, deleteProposal);

export  default router;