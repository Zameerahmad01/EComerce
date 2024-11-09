import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//add to cart
const addToCart = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity || quantity <= 0) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required"));
  }

  //check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Product not found"));
  }

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [{ productId, quantity }] });
  } else {
    const existingItem = cart.items.find(
      (item) => item.productId._id.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Item added to cart successfully"));
});

//get cart items
const getCartItems = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "User ID is required"));
  }

  const cart = await Cart.findOne({ userId }).populate({
    path: "items.productId",
    select: "title price image salePrice",
  });

  if (!cart) {
    return res.status(404).json(new ApiResponse(404, null, "Cart not found"));
  }

  const validItems = cart.items.filter((productItem) => productItem.productId);

  if (validItems.length < cart.items.length) {
    cart.items = validItems;
    await cart.save();
  }

  const populateCartItems = validItems.map((item) => ({
    productId: item.productId._id,
    title: item.productId.title,
    price: item.productId.price,
    image: item.productId.image,
    quantity: item.quantity,
    salePrice: item.productId.salePrice,
  }));

  cart.items = populateCartItems;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { ...cart._doc, items: populateCartItems },
        "Cart items fetched successfully"
      )
    );
});

//remove from cart
const removeFromCart = asyncHandler(async (req, res) => {
  const { userId, productId } = req.params;

  if (!userId || !productId) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required"));
  }

  const cart = await Cart.findOne({ userId }).populate({
    path: "items.productId",
    select: "title price image salePrice",
  });
  if (!cart) {
    return res.status(404).json(new ApiResponse(404, null, "Cart not found"));
  }

  cart.items = cart.items.filter(
    (item) => item.productId._id.toString() !== productId
  );

  await cart.save();

  await cart.populate({
    path: "items.productId",
    select: "title price image salePrice",
  });

  const populateCartItems = cart.items.map((item) => ({
    productId: item.productId ? item.productId._id : null,
    title: item.productId ? item.productId.title : null,
    price: item.productId ? item.productId.price : null,
    image: item.productId ? item.productId.image : null,
    salePrice: item.productId ? item.productId.salePrice : null,
    quantity: item.quantity,
  }));

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { ...cart._doc, items: populateCartItems },
        "Item removed from cart successfully"
      )
    );
});

//update cart item quantity
const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required"));
  }

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return res.status(404).json(new ApiResponse(404, null, "Cart not found"));
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex === -1) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Item not found in cart"));
  }

  cart.items[itemIndex].quantity = quantity;
  await cart.save();

  await cart.populate({
    path: "items.productId",
    select: "title price image salePrice",
  });

  const populateCartItems = cart.items.map((item) => ({
    productId: item.productId ? item.productId._id : null,
    title: item.productId ? item.productId.title : null,
    price: item.productId ? item.productId.price : null,
    image: item.productId ? item.productId.image : null,
    salePrice: item.productId ? item.productId.salePrice : null,
    quantity: item.quantity,
  }));

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { ...cart._doc, items: populateCartItems },
        "Item quantity updated successfully"
      )
    );
});

export { addToCart, getCartItems, removeFromCart, updateCartItemQuantity };
