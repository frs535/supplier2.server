import express from "express";
import {
    getDashboardStats,
    getProfile,
    postProfile,
    getSettings,
    postSettings
} from "../controllers/general.js";
import {verifyAdminToken, verifyToken} from "../middleware/auth.js";

const router = express.Router();

router.get("/settings", verifyToken, getSettings);
router.post("/settings", verifyAdminToken, postSettings);

router.get("/dashboard",verifyToken, getDashboardStats);

router.get("/profile/:id",verifyToken, getProfile);
router.post("/profile", verifyAdminToken, postProfile);

export default router;