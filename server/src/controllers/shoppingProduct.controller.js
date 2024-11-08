import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

const getFilteredProducts = asyncHandler(async (req, res) => {
  const { category = [], brand = [], sortby = "price-lowtohigh" } = req.query;

  let filters = {};

  if (category.length) {
    filters.category = { $in: category.split(",") };
  }

  if (brand.length) {
    filters.brand = { $in: brand.split(",") };
  }

  let sort = {};

  switch (sortby) {
    case "price-lowtohigh":
      sort.price = 1;
      break;
    case "price-hightolow":
      sort.price = -1;
      break;
    case "title-atoz":
      sort.title = 1;
      break;
    case "title-ztoa":
      sort.title = -1;
      break;

    default:
      sort.price = 1;
      break;
  }

  const products = await Product.find(filters).sort(sort);
  res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));

  if (!products) {
    res.status(404).json(new ApiResponse(404, null, "No products found"));
  }
});

const getProductDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    res.status(404).json(new ApiResponse(404, null, "Product not found"));
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, product, "Product details fetched successfully")
    );
});
export { getFilteredProducts, getProductDetails };
