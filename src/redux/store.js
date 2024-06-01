import { configureStore } from '@reduxjs/toolkit';
import systemDataReducer from './session';
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    systemData: systemDataReducer,
    user: userReducer,
  },
});

export default store;
