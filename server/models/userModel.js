import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    userRole: {
      type: String,
      enum: ["admin", "buyer", "seller"],
      default: "buyer",
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const userModel = model("user", userSchema);

export default userModel;
