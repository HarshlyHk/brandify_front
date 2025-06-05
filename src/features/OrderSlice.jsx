import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance";

const initialState = {
  orders: [], // List of all orders
  singleOrder: null, // Data for a single order
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Thunk to fetch all orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/orders");
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Thunk to fetch a single order by ID
export const getSingleOrder = createAsyncThunk(
  "orders/getSingleOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/orders/${orderId}`);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all orders
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch single order
      .addCase(getSingleOrder.pending, (state) => {
        state.status = "loading";
        state.singleOrder = null;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleOrder = action.payload;
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;