// src/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await fetch(`http://localhost:5000/users/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error retrieving user');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    errorMessage: '',
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.errorMessage = '';
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMessage = action.error.message;
      });
  },
});

export default userSlice.reducer;
