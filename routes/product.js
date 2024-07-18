import express from "express";
const router = express.Router();

import {verifyAdminToken, verifyToken} from "../middleware/auth.js";
import {getCatalogs, getProduct, getProducts, patchCatalog, patchProduct} from "../controllers/products.js";

router.get("/product", getProduct);

router.get("/products", getProducts);
router.patch("/products", verifyAdminToken, patchProduct);

router.get("/Category", getCatalogs);
router.patch("/Category", verifyAdminToken, patchCatalog);

export default router;