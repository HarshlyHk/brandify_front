import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance";

const initialState = {
  cartItems: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  loading: false,
  quantityLoading: false,
  actionLoading: false,
};

// Thunks
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/cart");
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/cart/add", item);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addBulkToCart = createAsyncThunk(
  "cart/addBulkToCart",
  async (items, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/cart/bulk-add", { items });
      // Fetch the updated cart after bulk addition
      await dispatch(fetchCart());
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, size }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/cart/remove`, {
        data: { productId, size },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete("/cart/clear");
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, size, delta }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put("/cart/update-quantity", {
        productId,
        size,
        delta,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload.items;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems.push(action.payload.item);
        state.status = "succeeded";
        state.loading = false;
      })
      .addCase(addBulkToCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.loading = false;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.cartItems = state.cartItems.filter((item) => {
          return item.product._id !== action.payload.productId;
        });
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.status = "loading";
        state.quantityLoading = true;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state,action) => {
        state.status = "succeeded";
        state.quantityLoading = false;
        state.cartItems = state.cartItems.map((item) => {
          if (item.product._id === action.payload.productId) {
            return {
              ...item,
              quantity: action.payload.quantity,
            };
          }
          return item;
        });
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.quantityLoading = false;
      });
  },
});

export default cartSlice.reducer;
