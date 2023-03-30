import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "AuthModal",
  initialState: {
    authModalOpen: false
  },
  reducers: {
    setAuthModalOpen: (state, action) => {
      state.authModalOpen = action.payload;
    }
  }
});

export const {
  setAuthModalOpen
} = authSlice.actions;

export default authSlice.reducer;