import express from "express";
import {verifyAdminToken, verifyToken} from "../middleware/auth.js";
import {
    getCatalogs, getCategory, getCharacteristic,
    getProduct,
    getProducts,
    patchCategory,
    patchProduct, pathAttributes, pathCharacteristic
} from "../controllers/products.js";
import Category from "../models/Category.js";

const router = express.Router();

router.get("/product", getProduct);

router.get("/products", getProducts);
router.patch("/products", verifyAdminToken, patchProduct);

router.get("/category", getCategory);
router.patch("/category", verifyAdminToken, patchCategory);

router.get("/characteristic/:id", getCharacteristic);
router.patch("/characteristic", verifyAdminToken, pathCharacteristic);

router.patch("/attributes", verifyAdminToken, pathAttributes);

export default router;