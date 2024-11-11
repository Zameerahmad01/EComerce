import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: String,
    address: String,
    city: String,
    zip: String,
    phone: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

export const Address = mongoose.model("address", addressSchema);
