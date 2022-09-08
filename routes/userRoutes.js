import express from "express";

import { signin, signup } from "../controllers/userControllers.js";

const router = express.Router();

// validators
import { runValidation } from "../validators/index.js";
import {
  userSignupValidator,
  userSigninValidator,
} from "../validators/userValidator.js";

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);

export default router;
