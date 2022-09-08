import { check } from "express-validator";

export const userSignupValidator = [
  check("firstName").not().isEmpty().withMessage("First name is required"),
  check("lastName").not().isEmpty().withMessage("Last name is required"),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("phone_number").not().isEmpty().withMessage("Phone number is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const userSigninValidator = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const userResetPasswordValidator = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
