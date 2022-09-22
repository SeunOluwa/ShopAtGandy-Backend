import "express-async-errors";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import refreshTokenRoutes from "./routes/refreshTokenRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

import { errorMiddleware } from "./middleware/error-handler.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Middlewares
app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/refresh-token", refreshTokenRoutes);
app.use("/paystack", transactionRoutes);

// middlewares for error handling
app.use((req, res) =>
  res.status(404).json({ message: "Route does not exists" })
);
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('APP IS WORKING.');
})

// connect to mongodb
connectDB();

// Port
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
