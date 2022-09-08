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

export const getProducts = async (req, res) => {
  const products = await Product.find().select("_id name details price image");

  res.status(200).json({ products });
};
