import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance";
import { toast } from "sonner";

const initialState = {
  reviews: [],
  myreview: null,
  total: 0,
  totalPages: 0,
  page: 1,
  limit: 6,
  loading: false,
  error: null,
  sort: "highest",
  productDetail: null
};

// Add product review
export const addProductReview = createAsyncThunk(
  "review/addProductReview",
  async ({ productId, rating, comment, name, title }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/review`,
        { productId, rating, comment, name, title }
      );
      toast.success("Review added!");
      return data.review;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add review.");
      return rejectWithValue(err.response?.data);
    }
  }
);

// Regular get reviews route (not admin)
export const getProductReviews = createAsyncThunk(
  "review/getProductReviews",
  async ({ productId, page, limit, sort }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/review/${productId}?page=${page}&limit=${limit}&sort=${sort}`
      );
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch reviews.");
      return rejectWithValue(err.response?.data);
    }
  }
);

// Edit review
export const editReview = createAsyncThunk(
  "review/editReview",
  async ({ productId, reviewId, rating, comment, name, title }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/review/${productId}/${reviewId}`,
        { rating, comment, name, title }
      );
      toast.success("Review updated!");
      return data.review;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to edit review.");
      return rejectWithValue(err.response?.data);
    }
  }
);

// Delete review
export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async ({ productId, reviewId }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/review/${productId}/${reviewId}`);
      toast.success("Review deleted!");
      return reviewId;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete review.");
      return rejectWithValue(err.response?.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
        state.myreview = action.payload.myreview;
        state.productDetail = action.payload.product;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Edit review: update the review in state
      .addCase(editReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.map(r =>
          r._id === action.payload._id ? action.payload : r
        );
        if (state.myreview && state.myreview._id === action.payload._id) {
          state.myreview = action.payload;
        }
      })
      // Delete review: remove from reviews
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(r => r._id !== action.payload);
        if (state.myreview && state.myreview._id === action.payload) {
          state.myreview = null;
        }
        state.total -= 1;
      })
      // Add product review: add to reviews
      .addCase(addProductReview.fulfilled, (state, action) => {
        state.reviews = [action.payload, ...state.reviews];
        state.myreview = action.payload;
        state.total += 1;
      })
      .addCase(addProductReview.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setPage, setLimit, setSort } = reviewSlice.actions;
export default reviewSlice.reducer;
