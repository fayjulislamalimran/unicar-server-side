import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    newPrice: { type: Number, required: true },
    purchaseYear: { type: Number, required: true },
    usedYear: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    location: { type: String, required: true },
    isSold: { type: Boolean, default: false },
    isAdvertised: { type: Boolean, default: false },
    category: {
      type: String,
      required: true,
      enum: ["tesla", "bmw", "nissan"],
    },

    conditionType: {
      type: String,
      required: true,
      enum: ["excellent", "good", "fair"],
    },
    sellerInfo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);

const productModel = model("product", productSchema);

export default productModel;
