// cartReducer.js
import {
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILURE,
    REMOVE_FROM_CART_REQUEST,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAILURE,
    FETCH_CART_ITEMS_REQUEST,
    FETCH_CART_ITEMS_SUCCESS,
    FETCH_CART_ITEMS_FAILURE,
  } from './cartActions';
  
  const initialState = {
    cartItems: [],
    itemCount: 0,
    loading: false,
    error: null,
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_CART_REQUEST:
      case REMOVE_FROM_CART_REQUEST:
      case FETCH_CART_ITEMS_REQUEST:
        return { ...state, loading: true, error: null };
  
      case ADD_TO_CART_SUCCESS:
        return {
          ...state,
          loading: false,
          cartItems: [...state.cartItems, action.payload],
          itemCount: state.itemCount + 1,
        };
  
      case REMOVE_FROM_CART_SUCCESS:
        return {
          ...state,
          loading: false,
          cartItems: state.cartItems.filter((item) => item.id !== action.payload),
          itemCount: state.itemCount - 1,
        };
  
      case FETCH_CART_ITEMS_SUCCESS:
        return {
          ...state,
          loading: false,
          cartItems: action.payload,
          itemCount: action.payload.length,
        };
  
      case ADD_TO_CART_FAILURE:
      case REMOVE_FROM_CART_FAILURE:
      case FETCH_CART_ITEMS_FAILURE:
        return { ...state, loading: false, error: action.error };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  