import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user.js";
import {
  BadRequest,
  Forbidden,
  NotFound,
  Unauthenticated,
} from "../errors/custom-errors.js";

dotenv.config();

export const signup = async (req, res) => {
  const {
    email,
    phone_number,
    password,
    confirmPassword,
    firstName,
    lastName,
  } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) throw new BadRequest("User already exists");

  if (password !== confirmPassword)
    throw new BadRequest("Password don't match");

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    email,
    phone_number,
    password: hashedPassword,
    name: `${firstName} ${lastName}`,
  });

  // exclude password field from response
  const userObject = user.toObject();
  delete userObject.password;

  res.status(200).json({ signedup_user: userObject });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) throw new NotFound("User does not exist");

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) throw new BadRequest("Invalid credentials.");

  const token = jwt.sign(
    {
      id: existingUser._id,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  // exclude password field from response
  const userObject = existingUser.toObject();
  delete userObject.password;

  res.status(200).json({ signedin_user: userObject, token });
};
