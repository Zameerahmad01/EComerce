import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productsList: [],
};

export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:8000/api/v1/products/add-product",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/products/get-all-products"
    );
    return response?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:8000/api/v1/products/delete-product/${id}`
    );
    return response?.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }) => {
    const response = await axios.put(
      `http://localhost:8000/api/v1/products/edit-product/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        // console.log(action.payload);

        state.isLoading = false;
        state.productsList = action.payload.data;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productsList = [];
      });
  },
});

export default adminProductSlice.reducer;
