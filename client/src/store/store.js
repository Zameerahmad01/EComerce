import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/index";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
  },
});

export default store;
