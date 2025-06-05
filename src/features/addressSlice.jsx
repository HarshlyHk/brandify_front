import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance";

const initialState = {
  addresses: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  loading: false,
};

// Thunks
export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/address");
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (address, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/address", address);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/address/${id}`, updates);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/address/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addresses = action.payload;
        state.loading = false;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload);
        state.status = "succeeded";
        state.loading = false;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(
          (address) => address.id === action.payload.id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
        state.status = "succeeded";
        state.loading = false;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (address) => address.id !== action.payload.id
        );
        state.status = "succeeded";
        state.loading = false;
      });
  },
});

export default addressSlice.reducer;