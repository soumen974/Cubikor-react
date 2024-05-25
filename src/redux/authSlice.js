import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      state.username = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.username = '';
      state.isAuthenticated = false;
    },
    loadStoredAuth: (state, action) => {
      state.username = action.payload.username;
      state.isAuthenticated = action.payload.isAuthenticated;
    }
  },
});

export const { login, logout, loadStoredAuth } = authSlice.actions;

export default authSlice.reducer;
