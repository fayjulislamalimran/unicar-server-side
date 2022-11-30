import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productControllers.js";
import {
  verifyToken,
  verifyTokenAdminOrSellerOrBuyer,
  verifyTokenAndSeller,
} from "../middlewares/verifyUser.js";
const productRouter = express.Router();

productRouter
  .route("/")
  .get(getProducts)
  .post(verifyToken, verifyTokenAndSeller, createProduct);
productRouter
  .route("/:id")
  .get(getProductById)
  .patch(verifyToken, verifyTokenAdminOrSellerOrBuyer, updateProduct)
  .delete(verifyToken, verifyTokenAndSeller, deleteProduct);
export default productRouter;
