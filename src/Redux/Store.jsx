import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Reducer/authSlice';
import userSlice from './Reducer/userSlice';


const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});

export default store;