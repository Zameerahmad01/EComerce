import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewAddress = createAsyncThunk(
  "address/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:8000/api/v1/address/add",
      formData
    );
    return response.data;
  }
);

export const getAllAddress = createAsyncThunk(
  "address/getAllAddress",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/address/get/${userId}`
    );
    return response.data;
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `http://localhost:8000/api/v1/address/update/${userId}/${addressId}`,
      formData
    );
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `http://localhost:8000/api/v1/address/delete/${userId}/${addressId}`
    );
    return response.data;
  }
);

const initialState = {
  addressList: [],
  loading: false,
};
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addressList = action.payload.data;
      })
      .addCase(getAllAddress.rejected, (state) => {
        state.loading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
