// cartActions.js

import axios from 'axios';


export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

export const REMOVE_FROM_CART_REQUEST = 'REMOVE_FROM_CART_REQUEST';
export const REMOVE_FROM_CART_SUCCESS = 'REMOVE_FROM_CART_SUCCESS';
export const REMOVE_FROM_CART_FAILURE = 'REMOVE_FROM_CART_FAILURE';

export const FETCH_CART_ITEMS_REQUEST = 'FETCH_CART_ITEMS_REQUEST';
export const FETCH_CART_ITEMS_SUCCESS = 'FETCH_CART_ITEMS_SUCCESS';
export const FETCH_CART_ITEMS_FAILURE = 'FETCH_CART_ITEMS_FAILURE';



export const addToCart = (payload) => async (dispatch) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  
  dispatch({ type: ADD_TO_CART_REQUEST });
  try {
    const response = await axios.post(`http://localhost:5000/users/${userId}/shopping_cart`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ADD_TO_CART_FAILURE, error: error.response?.data.errors || error.message });
  }
};

export const removeFromCart = (cartId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  
  dispatch({ type: REMOVE_FROM_CART_REQUEST });
  try {
    await axios.delete(`http://localhost:5000/users/${userId}/shopping_cart/${cartId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: cartId });
  } catch (error) {
    dispatch({ type: REMOVE_FROM_CART_FAILURE, error: error.response?.data.errors || error.message });
  }
};

export const fetchCartItems = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  
  dispatch({ type: FETCH_CART_ITEMS_REQUEST });
  try {
    const response = await axios.get(`http://localhost:5000/users/${userId}/shopping_cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const cartItemsData = response.data.map((cart) => ({
      id: cart.id,
      productId: cart.productId,
      shopId: cart.shopId,
    }));
    dispatch({ type: FETCH_CART_ITEMS_SUCCESS, payload: cartItemsData });
  } catch (error) {
    dispatch({ type: FETCH_CART_ITEMS_FAILURE, error: error.response?.data.errors || error.message });
  }
};
