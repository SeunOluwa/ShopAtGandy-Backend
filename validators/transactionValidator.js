import { check } from "express-validator";

export const transactionValidator = [
  check("first_name").not().isEmpty().withMessage("First name is required"),
  check("last_name").not().isEmpty().withMessage("Last name is required"),
  check("email").not().isEmpty().withMessage("Email is required"),
  check("amount").not().isEmpty().withMessage("Amount is required"),
];
