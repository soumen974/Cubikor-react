import { createSlice } from '@reduxjs/toolkit';

const UserAuthSlice = createSlice({
  name: 'user_auth',
  initialState: {
    user_mail: '',
    isUserAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      state.user_mail = action.payload;
      state.isUserAuthenticated = true;
    },
    logout: (state) => {
      state.user_mail = '';
      state.isUserAuthenticated = false;
    },
    loadStoredAuth: (state, action) => {
      state.user_mail = action.payload.user_mail;
      state.isUserAuthenticated = action.payload.isUserAuthenticated;
    }
  },
});

export const { login, logout, loadStoredAuth } = UserAuthSlice.actions;

export default UserAuthSlice.reducer;
