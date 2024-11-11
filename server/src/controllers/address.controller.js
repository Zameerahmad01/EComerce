import { Address } from "../models/address.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createAddress = asyncHandler(async (req, res) => {
  const { userId, address, city, zip, phone, notes } = req.body;

  if (!address || !city || !zip || !phone || !notes || !userId) {
    return res
      .status(400)
      .json(ApiResponse.error(400, "All fields are required"));
  }

  const newAddress = await Address.create({
    userId,
    address,
    city,
    zip,
    phone,
    notes,
  });

  return res
    .status(201)
    .json(ApiResponse.success(201, newAddress, "Address created successfully"));
});

const getAllAddress = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json(ApiResponse.error(400, "userId is required"));
  }

  const addresses = await Address.find({ userId });

  if (addresses.length === 0) {
    return res
      .status(200)
      .json(ApiResponse.success(200, {}, "No addresses found"));
  }

  return res
    .status(200)
    .json(
      ApiResponse.success(200, addresses, "Addresses fetched successfully")
    );
});

const updateAddress = asyncHandler(async (req, res) => {
  const { userId, addressId } = req.params;
  const formData = req.body;

  if (!userId || !addressId) {
    return res
      .status(400)
      .json(ApiResponse.error(400, "userId and addressId are required"));
  }

  const address = await Address.findOneAndUpdate(
    { _id: addressId, userId },
    formData,
    { new: true }
  );

  if (!address) {
    return res.status(404).json(ApiResponse.error(404, "Address not found"));
  }

  return res
    .status(200)
    .json(ApiResponse.success(200, address, "Address updated successfully"));
});

const deleteAddress = asyncHandler(async (req, res) => {
  const { userId, addressId } = req.params;

  if (!userId || !addressId) {
    return res
      .status(400)
      .json(ApiResponse.error(400, "userId and addressId are required"));
  }

  const address = await Address.findOneAndDelete({ _id: addressId, userId });

  if (!address) {
    return res.status(404).json(ApiResponse.error(404, "Address not found"));
  }

  return res
    .status(200)
    .json(ApiResponse.success(200, {}, "Address deleted successfully"));
});

export { createAddress, getAllAddress, deleteAddress, updateAddress };
