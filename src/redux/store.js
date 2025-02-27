import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
// Import other reducers here

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here
  },
}); 