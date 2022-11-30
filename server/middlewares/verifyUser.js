import USER from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// VERIFY USER TOKEN
export const verifyToken = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await USER.findById(decoded._doc._id);
      next();
    } catch (error) {
      return res.status(403).json({ message: "Not authorized, Token Failed" });
    }
  }

  if (!token) {
    res.status(403).json({ message: "Invalid Authorization ,No Token" });
  }
});

// VERIFY SELLER TOKEN AND ROLE
export const verifyTokenAndSeller = asyncHandler(async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userRole === "seller") {
      next();
    } else {
      res.status(403).json({ message: "You are not alowed to do that!" });
    }
  });
});

// VERIFY ADMIN TOKEN AND ROLE
export const verifyTokenAndAdmin = asyncHandler(async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userRole === "admin") {
      next();
    } else {
      res.status(403).json({ message: "You are not alowed to do that!" });
    }
  });
});

// VERIFY SELLER TOKEN AND ROLE
export const verifyTokenAdminOrSeller = asyncHandler(async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userRole === "seller" || "admin") {
      next();
    } else {
      res.status(403).json({ message: "You are not alowed to do that!" });
    }
  });
});

export const verifyTokenAdminOrSellerOrBuyer = asyncHandler(
  async (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.userRole === "seller" || "admin" || "buyer") {
        next();
      } else {
        res.status(403).json({ message: "You are not alowed to do that!" });
      }
    });
  }
);
