import {initialState} from './initialState';
import axios from 'axios';
import {API_URL} from '../config';

/* selectors */
export const getAllProducts = ({products}) => products;

/* action name creator */
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_TO_CART = createActionName('ADD_TO_CART');
const HANDLE_ADD_QUANTITY = createActionName('HANDLE_ADD_QUANTITY');
const HANDLE_MINUS_QUANTITY = createActionName('HANDLE_MINUS_QUANTITY');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addToCart = payload => ({ payload, type: ADD_TO_CART });
export const handleAddQuantity = payload => ({ payload, type: HANDLE_ADD_QUANTITY });
export const handleMinusQuantity = payload => ({ payload, type: HANDLE_MINUS_QUANTITY });

/* thunk creators */
export const fetchProducts = (products) => {
  return async (dispatch) => {
    dispatch(fetchStarted());
    try {
      const res = await axios.get(`${API_URL}/products`);
      dispatch(fetchSuccess(res.data));
    } catch (err) {
      dispatch(fetchError(err.message || true));
    }
  };
};

/* reducer */
export const reducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      action.payload.forEach(product => product.cartQuantiy = 0);
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_TO_CART: {
      const newStatePart = statePart.data?.map(product => {
        if (product._id === action.payload._id) {
          if(product.cartQuantiy === 0) {
            product.cartQuantiy = product.cartQuantiy + 1;
          }
          return product;
        } else {
          return product;
        }
      });
      const updatedItems = newStatePart.filter(item=>item.cartQuantiy > 0);
      localStorage.setItem('cart', JSON.stringify({...statePart,
        data: updatedItems}));
      return {
        ...statePart,
        data: newStatePart,
      };
    }
    case HANDLE_ADD_QUANTITY: {
      const newStatePart = statePart.data?.map(product => {
        if (product._id === action.payload) {
          product.cartQuantiy = product.cartQuantiy + 1;
          return product;
        } else {
          return product;
        }
      });
      return {
        ...statePart,
        data: newStatePart,
      };
    }
    case HANDLE_MINUS_QUANTITY: {
      const newStatePart = statePart.data?.map(product => {
        if (product._id === action.payload) {
          if(product.cartQuantiy > 1) {
            product.cartQuantiy = product.cartQuantiy - 1;
          }
          return product;
        } else {
          return product;
        }
      });
      return {
        ...statePart,
        data: newStatePart,
      };
    }
    default:
      return statePart;
  }
};
