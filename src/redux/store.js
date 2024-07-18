// store.js
import { configureStore } from '@reduxjs/toolkit';
import systemDataReducer from './session';
import userReducer from './userSlice';
import cartReducer from './cartSlice'; // Assuming you have created cartSlice

const store = configureStore({
  reducer: {
    systemData: systemDataReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
