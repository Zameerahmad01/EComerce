import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(`http://localhost:8000/api/v1/cart/add`, {
      userId,
      productId,
      quantity,
    });
    return response.data;
  }
);

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/cart/get/${userId}`
    );
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:8000/api/v1/cart/remove/${userId}/${productId}`
    );
    return response.data;
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      `http://localhost:8000/api/v1/cart/update`,
      { userId, productId, quantity }
    );
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload.data;
    });
    builder.addCase(getCartItems.rejected, (state) => {
      state.isLoading = false;
      state.cartItems = [];
    });
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload.data;
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.isLoading = false;
      state.cartItems = [];
    });
    builder.addCase(removeFromCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload.data;
    });
    builder.addCase(removeFromCart.rejected, (state) => {
      state.isLoading = false;
      state.cartItems = [];
    });
    builder.addCase(updateCartItemQuantity.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload.data;
    });
    builder.addCase(updateCartItemQuantity.rejected, (state) => {
      state.isLoading = false;
      state.cartItems = [];
    });
  },
});

export default cartSlice.reducer;
