import express from "express";

import { createProduct, getProducts } from "../controllers/productControllers.js";

import userAuth from "../middleware/userAuth.js";

const router = express.Router();

// validators
import { runValidation } from "../validators/index.js";
import { createProductValidator } from "../validators/productValidator.js";

router.get("/", getProducts);

router.post("/upload", userAuth, createProductValidator, runValidation, createProduct);

export default router;
