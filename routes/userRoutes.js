import express from "express";

import { signup } from "../controllers/userControllers.js";

const router = express.Router();

// validators
import { runValidation } from "../validators/index.js";
import {
  userSignupValidator,
} from "../validators/userValidator.js";

router.post('/signup', userSignupValidator, runValidation, signup);

export default router;
