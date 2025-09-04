import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import cartReducer from "../features/cartSlice";
import addressReducer from "../features/addressSlice";
import checkoutReducer from "@/features/checkoutSlice";
import orderReducer from "@/features/OrderSlice";
import abandonedCartReducer from "@/features/abandonedCartSlice";
import specialFramesReducer from "@/features/specialFramesSlice";
import collabosReducer from "@/features/collaboSlice";
import reviewReducer from "../features/reviewSlice";
import comboReducer from "@/features/comboSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    address: addressReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    abandonedCart: abandonedCartReducer,
    specialFrames: specialFramesReducer,
    collabo: collabosReducer,
    combo: comboReducer,

    review: reviewReducer,
  },
});

export default store;
