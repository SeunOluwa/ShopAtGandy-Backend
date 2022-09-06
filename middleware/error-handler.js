import mongoose from "mongoose";
import { CustomHttpError } from "../errors/custom-errors.js";

const { Error: MongooseError } = mongoose;

export const errorMiddleware = (error, req, res, next) => {
  console.log(error);
  if (error instanceof CustomHttpError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  if (error instanceof MongooseError.ValidationError) {
    const message = Object.values(error.errors)
      .map(({ message }) => message)
      .join(". ");
    return res.status(422).json({ message });
  }
  if (error instanceof MongooseError.CastError) {
    const path = error.path === "_id" ? "id" : error.path;
    return res.status(400).json({ message: `${path} expects ${error.kind}` });
  }
  if (error.code && error.code === 11000) {
    return res
      .status(400)
      .json({ message: `${Object.keys(error.keyValue)} already exists` });
  }
  res
    .status(500)
    .json({ message: "Oops! Something went wrong with the server" });
};
