import express from "express";

import {
  createTransaction,
  makePayment,
} from "../controllers/transactionControllers.js";

import userAuth from "../middleware/userAuth.js";

const router = express.Router();

// validators
import { runValidation } from "../validators/index.js";
import { transactionValidator } from "../validators/transactionValidator.js";

router.post("/pay", userAuth, transactionValidator, runValidation, makePayment);
router.get("/callback", createTransaction);

export default router;
