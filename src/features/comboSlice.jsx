import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance";
import { toast } from "sonner";

const initialState = {
  combos: [],
  loading: false,
  taskLoading: false,
  error: null,
};

// Thunks

// Fetch all combos
export const fetchCombos = createAsyncThunk(
  "combo/fetchCombos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/combo/get");
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch combos.");
      return rejectWithValue(err.response?.data);
    }
  }
);




const comboSlice = createSlice({
  name: "combo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Combos
      .addCase(fetchCombos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCombos.fulfilled, (state, action) => {
        state.loading = false;
        state.combos = action.payload.data;
      })
      .addCase(fetchCombos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default comboSlice.reducer;