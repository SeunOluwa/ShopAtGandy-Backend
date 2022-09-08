import mongoose from "mongoose";

import Product from "../models/product.js";

import { Forbidden, NotFound } from "../errors/custom-errors.js";

export const createProduct = async (req, res) => {
  const { name, details, price, image } = req.body;

  const newProduct = new Product({
    name,
    details,
    price,
    image,
  });

  await newProduct.save();

  res.status(201).json(newProduct);
};
