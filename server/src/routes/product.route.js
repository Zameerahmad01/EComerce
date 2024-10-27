import express from "express";
import {
  uploadProductImage,
  addProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/upload-image").post(upload.single("image"), uploadProductImage);
router.route("/add-product").post(addProduct);
router.route("/get-all-products").get(getAllProducts);
router.route("/edit-product/:id").put(editProduct);
router.route("/delete-product/:id").delete(deleteProduct);

export default router;
