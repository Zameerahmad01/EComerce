import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/index";
import shopProductSlice from "./shop/product-slice";
import cartSlice from "./shop/cart-slice";
import addressSlice from "./shop/address-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    shopProducts: shopProductSlice,
    cart: cartSlice,
    address: addressSlice,
  },
});

export default store;
