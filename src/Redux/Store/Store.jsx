import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../Reducer/authSlice';


const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;