import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/index";
import shopProductSlice from "./shop/product-slice";
import cartSlice from "./shop/cart-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    shopProducts: shopProductSlice,
    cart: cartSlice,
  },
});

export default store;
