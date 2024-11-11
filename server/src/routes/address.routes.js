import express from "express";
import {
  createAddress,
  getAllAddress,
  deleteAddress,
  updateAddress,
} from "../controllers/address.controller.js";

const router = express.Router();

router.post("/add", createAddress);
router.get("/get/:userId", getAllAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);
router.put("/update/:userId/:addressId", updateAddress);

export default router;
