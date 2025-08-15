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

export const updateOrderDetails = createAsyncThunk(
  "orders/updateOrderDetails",
  async (
    { orderId, landmark, alternatePhone, insta_handle },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.put(
        `/orders/${orderId}/update-details`,
        {
          landmark,
          alternatePhoneNumber: alternatePhone,
          insta_handle: insta_handle,
        }
      );
      toast.success("Details updated successfully!");

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
      })
      .addCase(updateOrderDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.singleOrder && state.singleOrder._id === action.payload._id) {
          state.singleOrder = action.payload;
        }
      })
      .addCase(updateOrderDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
