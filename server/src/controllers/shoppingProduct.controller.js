import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

const getFilteredProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));

  if (!products) {
    res.status(404).json(new ApiResponse(404, null, "No products found"));
  }
});

export { getFilteredProducts };
