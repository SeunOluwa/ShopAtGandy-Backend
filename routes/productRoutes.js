import express from "express";

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

// validators
import { runValidation } from "../validators/index.js";
import { createProductValidator } from "../validators/productValidator.js";

router.get("/", getProducts);
router.get("/:slug", getProduct);

router.post("/upload", createProductValidator, runValidation, createProduct);
router.patch("/:id/update", updateProduct);
router.delete("/:id/delete", deleteProduct);

export default router;
