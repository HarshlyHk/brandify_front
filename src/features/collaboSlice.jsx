import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance";
import { toast } from "sonner";

const initialState = {
  collabos: [],
  loading: false,
  taskLoading: false,
  error: null,
};

// Thunks

// Fetch all combos
export const fetchCollabos = createAsyncThunk(
  "collabo/fetchCollabos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("collabos/get");
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch collabos.");
      return rejectWithValue(err.response?.data);
    }
  }
);




const collaboSlice = createSlice({
  name: "collabo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Combos
      .addCase(fetchCollabos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollabos.fulfilled, (state, action) => {
        state.loading = false;
        state.collabos = action.payload.data.collabos;
      })
      .addCase(fetchCollabos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default collaboSlice.reducer;