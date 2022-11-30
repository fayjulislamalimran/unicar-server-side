import orderModel from "../models/orderModel.js";
import expressAsync from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// CREATE ORDER
export const createOder = expressAsync(async (req, res) => {
  const { productInfo, buyerInfo, location, phoneNumber } = req.body;

  const order = new orderModel({
    productInfo,
    buyerInfo,
    location,
    phoneNumber,
  });
  const newOrder = await order.save();
  if (!newOrder) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(201).json(newOrder);
});

// GET ORDERS
export const getOders = expressAsync(async (req, res) => {
  const orders = await orderModel
    .find({
      buyerInfo: req.query.userId,
    })
    .populate("buyerInfo productInfo");

  res.status(200).json(orders);
});

// UPDATE ORDER
export const updateOder = expressAsync(async (req, res) => {
  const { transitionId } = req.body;

  let order = await orderModel.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.transitionId = transitionId;
    await order.save();
    return res.status(200).json(order);
  }
  return res.status(404).json({ message: "Order Not Found" });
});

export const createPaymentIntent = expressAsync(async (req, res) => {
  const { price } = req.body;
  const amount = parseFloat(price) * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  if (paymentIntent) {
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  }
  return res.status(400).json({ message: "No Secret key available" });
});
