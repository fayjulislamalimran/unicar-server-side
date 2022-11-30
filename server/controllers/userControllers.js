import userModel from "../models/userModel.js";
import expressAsync from "express-async-handler";
import { generateToken } from "../utils/generateToken.js";

// CREATE USER
export const createUser = expressAsync(async (req, res) => {
  const { userName, userEmail, userRole } = req.body;

  const isExistUser = await userModel.findOne({ userEmail });
  if (isExistUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new userModel({ userName, userEmail, userRole });

  const newUser = await user.save();

  if (newUser) {
    const token = generateToken(newUser);
    return res.status(201).json({ token, user: newUser });
  } else {
    return res.status(400).json({ message: "Internal server error" });
  }
});

// LOGIN USER
export const loginUser = expressAsync(async (req, res) => {
  const { userEmail } = req.body;

  const isExistUser = await userModel.findOne({ userEmail });
  if (!isExistUser) {
    return res.status(400).json({ message: "Invalid User credentials" });
  } else {
    const token = generateToken(isExistUser);
    return res.status(200).json({ token, user: isExistUser });
  }
});

// UPDATE USER
export const updateUser = expressAsync(async (req, res) => {
  let user = await userModel.findById(req.params.id);

  if (user) {
    user.isVerified = true;
    await user.save();
    return res.status(200).json(user);
  }

  return res.status(404).json({ message: "User Not Found" });
});
// DELETE USER
export const deleteUser = expressAsync(async (req, res) => {
  const user = await userModel.findById(req.params.id);

  if (user) {
    await user.delete();
    return res.status(200).json({ message: "User Deleted Success" });
  }

  return res.status(404).json({ message: "User Not Found" });
});

// GET ALL USER

export const getAllUsers = expressAsync(async (req, res) => {
  const users = await userModel.find({
    $and: [{ userRole: { $nin: ["admin"] } }, { userRole: req.query.userRole }],
  });
  res.status(200).json(users);
});
