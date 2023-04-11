import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Reducer/authSlice";
import userSlice from "./Reducer/userSlice";
import onLeaveSlice from "./Reducer/onLeaveSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    onLeave: onLeaveSlice,
  },
});

export default store;
