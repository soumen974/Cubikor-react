import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch user data
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error retrieving user');
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred, please try again later');
    }
  }
);

const userDetailsSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    errorMessage: '',
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { clearError } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
