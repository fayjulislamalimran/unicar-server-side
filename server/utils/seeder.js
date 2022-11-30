import productModel from "../models/productModel.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import { data } from "../utils/productData.js";
// DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL, () => {
  if (process.env.NODE_ENV !== "PRODUCTION") {
    console.log(`Database connection successful`);
  }
});

const seedTours = async () => {
  try {
    await productModel.deleteMany();
    console.log("product deleted");
    await productModel.insertMany(data);
    console.log("product added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedTours();
