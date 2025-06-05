import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance";

const initialState = {
  abandonedCarts: [], // List of all abandoned carts
  singleAbandonedCart: null, // Data for a single abandoned cart
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};


// Thunk to create a new abandoned cart
export const createAbandonedCart = createAsyncThunk(
  "abandonedCarts/createAbandonedCart",
  async (cartData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/abandoned-carts", cartData);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


const abandonedCartSlice = createSlice({
  name: "abandonedCarts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create abandoned cart
      .addCase(createAbandonedCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAbandonedCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.abandonedCarts.push(action.payload);
      })
      .addCase(createAbandonedCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export default abandonedCartSlice.reducer;