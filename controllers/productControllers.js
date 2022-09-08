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
  const products = await Product.find().select(
    "_id name details price image slug"
  );

  res.status(200).json({ products });
};

export const getProduct = async (req, res) => {
  const { slug } = req.params;

  const product = await Product.findOne({ slug }).select(
    "_id name details price image slug"
  );

  if (!product) throw new NotFound("product not found");

  res.status(200).json({ product });
};

export const updateProduct = async (req, res) => {
  const { id: _id } = req.params;
  const { name, details, price, image } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    throw new NotFound("No content with that id");

  const product = await Product.findById(_id);

  if (!product) throw new NotFound("product not found");

  product.name = name;
  product.details = details;
  product.price = price;
  product.image = image;

  const updatedProduct = await Product.findByIdAndUpdate(
    _id,
    { ...product, _id },
    { new: true }
  );

  res.json({ updatedProduct });
};
