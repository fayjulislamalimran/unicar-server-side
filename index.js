import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import userRouter from "./server/routes/userRouter.js";
import productRouter from "./server/routes/productRouter.js";
import orderRouter from "./server/routes/orderRouter.js";
dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

// ROUTES
app.get("/", (req, res) => {
  res.send(`<div style="margin:0; padding:0; height:95vh; display:grid; place-items:center;  color:#222; font-family:sans-serif">
  <h1 style="text-align:center">Welcome to <span style="color:red">UNICAR</span> store</h1></div>`);
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);

// DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL, () => {
  if (process.env.NODE_ENV !== "PRODUCTION") {
    console.log(`Database connection successful`);
  }
});

//APP LISTENER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "PRODUCTION") {
    console.log(`App is running at port ${PORT}`);
  }
});
