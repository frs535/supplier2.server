import express from "express";
import {
    deleteProposal,
    getOrder,
    getOrders, getProposal, getUnhandledProposal, patchProposal,
    postOrder, postProposal, putHandledProposal,
} from "../controllers/client.js";
import {verifyAdminToken, verifyProposalToken, verifyToken} from "../middleware/auth.js";
import {getPartner, getPartners, postPartner} from "../controllers/client.js";

const router = express.Router();

router.get("/partners", verifyToken, getPartners);
router.get("/partners/:id", verifyToken, getPartner);
router.post("/partners", verifyAdminToken, postPartner);

router.get("/order/:id", verifyToken, getOrder);
router.get("/orders", verifyToken, getOrders);
router.post("/orders", verifyToken, postOrder);

router.get("/proposal/:id", getProposal);
router.get("/proposals",verifyAdminToken, getUnhandledProposal)
router.post("/proposal", verifyAdminToken, postProposal);
router.post("/newproposal", verifyProposalToken, patchProposal);
router.put("/proposal/:id", verifyAdminToken, putHandledProposal);
router.delete("/proposal/:id", verifyAdminToken, deleteProposal);

export  default router;