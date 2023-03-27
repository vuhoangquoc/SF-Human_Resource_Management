import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {
  setUsername,
  setPassword,
  setIsLoading,
  setError,
  setLoggedIn,
} = authSlice.actions;

export default authSlice.reducer;;