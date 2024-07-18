// cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
  const response = await axios.get(`http://localhost:5000/users/${userId}/shopping_cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data.map(cart => ({
    id: cart.id,
    productId: cart.productId,
    shopId: cart.shopId,
  }));
});

export const addToCart = createAsyncThunk('cart/addToCart', async (payload) => {
  const response = await axios.post(`http://localhost:5000/users/${userId}/shopping_cart`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (cartId) => {
  await axios.delete(`http://localhost:5000/users/${userId}/shopping_cart/${cartId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return cartId;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    itemCount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.itemCount = action.payload.length;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems.push(action.payload);
        state.itemCount += 1;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        state.itemCount -= 1;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
