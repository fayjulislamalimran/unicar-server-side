import productModel from "../models/productModel.js";
import expressAsync from "express-async-handler";
import { uplaodImg } from "../utils/uploadImg.js";

// CREATE PRODUCT
export const createProduct = expressAsync(async (req, res) => {
  const {
    name,
    image,
    description,
    originalPrice,
    newPrice,
    purchaseYear,
    usedYear,
    category,
    phoneNumber,
    location,
    conditionType,
    sellerInfo,
  } = req.body;
  const img_url = await uplaodImg(image);
  const product = new productModel({
    name,
    image: img_url,
    description,
    originalPrice,
    newPrice,
    purchaseYear,
    category,
    usedYear,
    phoneNumber,
    location,
    conditionType,
    sellerInfo,
  });

  const newProduct = await product.save();

  if (!newProduct) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(201).json({ message: "Product created successfully" });
});

// GET PRODUCTS
export const getProducts = expressAsync(async (req, res) => {
  const { isSold, isAdvertised, category, sellerId } = req.query;
  let products = await productModel.find().populate("sellerInfo");
  if (category) {
    products = await productModel
      .find({ $and: [{ category: category }, { isSold: false }] })
      .populate("sellerInfo");
  }

  if (isSold && isAdvertised) {
    products = await productModel
      .find({
        isSold: isSold,
        isAdvertised: isAdvertised,
      })
      .populate("sellerInfo");
  }

  if (sellerId) {
    products = await productModel
      .find({
        sellerInfo: sellerId,
      })
      .populate("sellerInfo");
  }

  return res.status(200).json(products);
});

// GET PRODUCT BY ID

export const getProductById = expressAsync(async (req, res) => {
  const product = await productModel
    .findById(req.params.id)
    .populate("sellerInfo");
  res.status(200).json(product);
});

// UPDATE PRODUCT
export const updateProduct = expressAsync(async (req, res) => {
  let product = await productModel.findById(req.params.id);

  if (product) {
    if (req.body.isSold) {
      product.isSold = true;
    }

    if (req.body.isAdvertised) {
      product.isAdvertised = true;
    }
    await product.save();
    return res.status(200).json(product);
  } else {
    return res.status(404).json({ message: "Product Not Found" });
  }
});
// DELETE PRODUCT
export const deleteProduct = expressAsync(async (req, res) => {
  const product = await productModel.findOneAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }
  return res.status(200).json({ message: "Product Delete successfully" });
});
