import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance";
import { toast } from "sonner";

const initialState = {
  specialFrames: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchSpecialFrames = createAsyncThunk(
  "specialFrames/fetchSpecialFrames",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/special-frames/get");
      return data.data.specialFrames;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Slice
const specialFramesSlice = createSlice({
  name: "specialFrames",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialFrames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecialFrames.fulfilled, (state, action) => {
        state.loading = false;
        state.specialFrames = action.payload;
      })
      .addCase(fetchSpecialFrames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default specialFramesSlice.reducer;
