import express from "express";

import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productControllers.js";

import userAuth from "../middleware/userAuth.js";

const router = express.Router();

// validators
import { runValidation } from "../validators/index.js";
import { createProductValidator } from "../validators/productValidator.js";

router.get("/", getProducts);
router.get("/:slug", getProduct);

router.post(
  "/upload",
  userAuth,
  createProductValidator,
  runValidation,
  createProduct
);
router.patch("/:id/update", userAuth, updateProduct);

export default router;
