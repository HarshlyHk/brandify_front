// features/checkoutSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkoutItem: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutItem: (state, action) => {
      state.checkoutItem = action.payload;
    },
    clearCheckoutItem: (state) => {
      state.checkoutItem = null;
    },
  },
});

export const { setCheckoutItem, clearCheckoutItem } = checkoutSlice.actions;
export default checkoutSlice.reducer;
