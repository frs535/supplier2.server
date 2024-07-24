import express from "express";
import {verifyAdminToken} from "../middleware/auth.js";
import {
    deleteProduct,
    getCatigory,
    getCharacteristic,
    getProduct,
    getProducts,
    patchCategory, patchProduct,
    patchProducts,
    pathAttributes,
    pathCharacteristic
} from "../controllers/products.js";

const router = express.Router();

router.get("/products", getProducts);
router.patch("/products", verifyAdminToken, patchProducts);

router.get("/product/:id", getProduct);
router.patch("/product", verifyAdminToken, patchProduct);
router.delete("/product/:id", verifyAdminToken, deleteProduct);

router.get("/category", getCatigory);
router.patch("/category", verifyAdminToken, patchCategory);

router.get("/characteristic/:id", getCharacteristic);
router.patch("/characteristic", verifyAdminToken, pathCharacteristic);

router.patch("/attributes", verifyAdminToken, pathAttributes);

export default router;