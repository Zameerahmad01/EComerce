import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  productsList: [],
  isLoading: false,
};

export const getFilteredProducts = createAsyncThunk(
  "products/getFilteredProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortby: sortParams,
    });

    // console.log(query, "query");

    const response = await axios.get(
      `http://localhost:8000/api/v1/shop/products/get?${query}`
    );
    // console.log(response.data);
    return response?.data;
  }
);

const shopProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFilteredProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFilteredProducts.fulfilled, (state, action) => {
      // console.log(action.payload, "action.payload");
      state.isLoading = false;
      state.productsList = action.payload.data;
    });
    builder.addCase(getFilteredProducts.rejected, (state) => {
      state.isLoading = false;
      state.productsList = [];
    });
  },
});

export default shopProductSlice.reducer;
