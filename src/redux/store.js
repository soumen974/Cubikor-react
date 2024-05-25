import { configureStore } from '@reduxjs/toolkit';
import systemDataReducer from './session';
import authReducer from "./authSlice";
import userAuthReducer from "./UserAuthSlice";

const store = configureStore({
  reducer: {
    systemData: systemDataReducer,
    auth: authReducer,
    user_auth:userAuthReducer,
  },
});

export default store;
