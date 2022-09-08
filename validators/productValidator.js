import { check } from "express-validator";

export const createProductValidator = [
  check("name").not().isEmpty().withMessage("Product name is required"),
  check("details").not().isEmpty().withMessage("Product details is required"),
  check("price").not().isEmpty().withMessage("Product price is required"),
  check("image").not().isEmpty().withMessage("Product image is required"),
];
