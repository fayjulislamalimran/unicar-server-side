import express from "express";
import {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../controllers/userControllers.js";
import { verifyToken, verifyTokenAndAdmin } from "../middlewares/verifyUser.js";
const userRouter = express.Router();

userRouter.route("/").get(verifyTokenAndAdmin, getAllUsers);
userRouter.route("/signin").post(createUser);
userRouter.route("/login").post(loginUser);
userRouter
  .route("/:id")
  .patch(verifyToken, verifyTokenAndAdmin, updateUser)
  .delete(verifyToken, verifyTokenAndAdmin, deleteUser);

export default userRouter;
