import express from "express";
const router = express.Router();

import {verifyAdminToken, verifyToken} from "../middleware/auth.js";
import {changeAPIKey, changePassword, getUsers, login, register, getUser, restorePassword} from "../controllers/users.js";

router.post("/register", verifyToken, register);
router.post("/changePassword", verifyAdminToken, changePassword)
router.get("/changeAPIKey", verifyToken, changeAPIKey)

router.post("/login", login);
router.post("/restorePassword", verifyToken, restorePassword);

/* READ */
router.get("/", verifyAdminToken, getUsers);
router.get("/:id", verifyToken, getUser);

export default router;