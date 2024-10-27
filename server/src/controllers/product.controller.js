import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";

const uploadProductImage = asyncHandler(async (req, res) => {
  const productImagePath = req.file.path;
  const cloudinaryResponse = await uploadOnCloudinary(productImagePath);

  if (!cloudinaryResponse) {
    throw new ApiError(400, "Failed to upload image on cloudinary");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, cloudinaryResponse, "Image uploaded successfully")
    );
});

// add new product

const addProduct = asyncHandler(async (req, res) => {
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  } = req.body;

  if (
    !image ||
    !title ||
    !description ||
    !category ||
    !brand ||
    !price ||
    !salePrice ||
    !totalStock
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const newProduct = await Product.create({
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  });

  res
    .status(200)
    .json(new ApiResponse(200, newProduct, "Product added successfully"));
});

// get all products

const getAllProducts = asyncHandler(async (req, res) => {
  const productsList = await Product.find({});

  if (!productsList) {
    res.status(404).json(new ApiResponse(404, null, "No products found"));
  }
  res
    .status(200)
    .json(new ApiResponse(200, productsList, "Products fetched successfully"));
});

// edit product

const editProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  } = req.body;

  const updatedProduct = await Product.findById(id);

  if (!updatedProduct) {
    res.status(404).json(new ApiResponse(404, null, "Product not found"));
  }

  updatedProduct.image = image || updatedProduct.image;
  updatedProduct.title = title || updatedProduct.title;
  updatedProduct.description = description || updatedProduct.description;
  updatedProduct.category = category || updatedProduct.category;
  updatedProduct.brand = brand || updatedProduct.brand;
  updatedProduct.price = price || updatedProduct.price;
  updatedProduct.salePrice = salePrice || updatedProduct.salePrice;
  updatedProduct.totalStock = totalStock || updatedProduct.totalStock;

  await updatedProduct.save();

  res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

// delete product

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    res.status(404).json(new ApiResponse(404, null, "Product not found"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Product deleted successfully"));
});

export {
  uploadProductImage,
  addProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
};
