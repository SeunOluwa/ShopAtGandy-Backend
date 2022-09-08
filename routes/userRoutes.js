import express from "express";

import {
  resetPassword,
  signin,
  signup,
} from "../controllers/userControllers.js";

const router = express.Router();

// validators
import { runValidation } from "../validators/index.js";
import {
  userSignupValidator,
  userSigninValidator,
  userResetPasswordValidator,
} from "../validators/userValidator.js";

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.patch(
  "/reset-password",
  userResetPasswordValidator,
  runValidation,
  resetPassword
);

export default router;
