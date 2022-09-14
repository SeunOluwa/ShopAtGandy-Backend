import express from "express";

import { newAccessToken } from "../controllers/refreshTokenControllers.js";

const router = express.Router();

// validators
import { runValidation } from "../validators/index.js";
import { refreshTokenValidator } from "../validators/refreshTokenValidator.js";

router.post("/", refreshTokenValidator, runValidation, newAccessToken);

export default router;
