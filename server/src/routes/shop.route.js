import express from "express";
import {
  getFilteredProducts,
  getProductDetails,
} from "../controllers/shoppingProduct.controller.js";

const router = express.Router();

router.route("/get").get(getFilteredProducts);
router.route("/get/:id").get(getProductDetails);

export default router;
