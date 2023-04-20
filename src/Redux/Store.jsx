import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Reducer/authSlice";
import userSlice from "./Reducer/userSlice";
import vacationMode2Slice from "./Reducer/onSwitchSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    vacationMode2: vacationMode2Slice,
  },
});

export default store;
