import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Reducer/authSlice';
import registerSlice from './Reducer/registerSlice';


const store = configureStore({
  reducer: {
    // auth: authSlice,
    user: registerSlice,
  },
});

export default store;