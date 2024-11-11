import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import badSlice from "./BadSlice";

export const store = new configureStore({
  reducer: {
    auth: authSlice,
    bad: badSlice,
  },
});

export default store;
