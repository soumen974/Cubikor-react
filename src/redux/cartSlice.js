import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for adding item to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, catId, productID, ShopID, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/users/${userId}/shopping_cart`,
        {
          CategoryId: catId,
          productId: productID,
          shopId: ShopID,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.errors) {
        return rejectWithValue(error.response.data.errors);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    message: '',
  },
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
    clearMessage(state) {
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
        state.message = `Item added to cart with ID: ${action.payload.id}`;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Error adding item to cart';
      });
  },
});

export const { clearErrors, clearMessage } = cartSlice.actions;

export default cartSlice.reducer;
