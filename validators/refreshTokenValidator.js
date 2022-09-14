import { check } from "express-validator";

export const refreshTokenValidator = [
  check("refreshToken").not().isEmpty().withMessage("Refresh token is required"),
];
