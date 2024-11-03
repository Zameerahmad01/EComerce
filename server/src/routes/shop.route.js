import express from "express";
import { getFilteredProducts } from "../controllers/shoppingProduct.controller.js";

const router = express.Router();

router.route("/get").get(getFilteredProducts);

export default router;
