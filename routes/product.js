import express from "express";
const router = express.Router();

import {verifyAdminToken, verifyToken} from "../middleware/auth.js";
import {getCatalogs, getProduct, getProducts, patchCatalog, patchProduct} from "../controllers/products.js";

router.get("/product",verifyToken, getProduct);

router.get("/products",verifyToken, getProducts);
router.patch("/products", verifyAdminToken, patchProduct);

router.get("/catalog",verifyToken, getCatalogs);
router.patch("/catalog", verifyAdminToken, patchCatalog);

export default router;