import express from "express";
import {
  addToCart,
  getCartItems,
  removeFromCart,
  updateCartItemQuantity,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add/", addToCart);
router.get("/get/:userId", getCartItems);
router.delete("/remove/:userId/:productId", removeFromCart);
router.put("/update", updateCartItemQuantity);

export default router;
