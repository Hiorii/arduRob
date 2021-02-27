import {initialState} from './initialState';
import axios from 'axios';
import {API_URL} from '../config';

/* selectors */
export const getAllCart = () => JSON.parse(localStorage.getItem('cart'));
export const cartTotalQuantity = () => JSON.parse(localStorage.getItem('cart'))?.data?.map(product => product.cartQuantiy);

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const HANDLE_ADD_QUANTITY = createActionName('HANDLE_ADD_QUANTITY');
const HANDLE_MINUS_QUANTITY = createActionName('HANDLE_MINUS_QUANTITY');
const HANDLE_CLEAR_ITEM = createActionName('HANDLE_CLEAR_ITEM');

/* action creators */
export const handleAddQuantity = payload => ({ payload, type: HANDLE_ADD_QUANTITY });
export const handleMinusQuantity = payload => ({ payload, type: HANDLE_MINUS_QUANTITY });
export const handleClear = payload => ({ payload, type: HANDLE_CLEAR_ITEM });

/* thunk creators */
export const sendOrder = (order) => {
  return async() => {
    try {
      console.log(order);
      await axios.post(`${API_URL}/cart`, order);
    } catch (err) {
      console.log(err);
    }
  };
};


/* reducer */
export const reducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case HANDLE_ADD_QUANTITY: {
      const cartItems = JSON.parse(localStorage.getItem('cart')).data;
      const products = JSON.parse(localStorage.getItem('products')).data;
      const updatedItems = cartItems.map(product => {
        if(product._id === action.payload) {
          product.cartQuantiy = product.cartQuantiy + 1;
          const newItems = products.map(item => {
            if(item._id === product._id) {
              item.cartQuantiy = item.cartQuantiy + 1;
              return item;
            } else {
              return item;
            }
          });
          localStorage.setItem('products', JSON.stringify({data: newItems}));
          return product;
        } else {
          return product;
        }
      });
      localStorage.setItem('cart', JSON.stringify({data: updatedItems}));
      return statePart;
    }
    case HANDLE_MINUS_QUANTITY: {
      const cartItems = JSON.parse(localStorage.getItem('cart')).data;
      const products = JSON.parse(localStorage.getItem('products')).data;
      const updatedItems = cartItems.map(product => {
        if(product._id === action.payload) {
          if(product.cartQuantiy > 1) {
            product.cartQuantiy = product.cartQuantiy - 1;
            const newItems = products.map(item => {
              if(item._id === product._id) {
                item.cartQuantiy = item.cartQuantiy - 1;
                return item;
              } else {
                return item;
              }
            });
            localStorage.setItem('products', JSON.stringify({data: newItems}));
          }
          return product;
        } else {
          return product;
        }
      });
      localStorage.setItem('cart', JSON.stringify({data: updatedItems}));
      return statePart;
    }
    case HANDLE_CLEAR_ITEM: {
      const cartItems = JSON.parse(localStorage.getItem('cart')).data;
      const products = JSON.parse(localStorage.getItem('products')).data;
      const itemToRemove = cartItems.findIndex(product =>
        product._id === action.payload
      );
      cartItems.splice(itemToRemove,1);
      localStorage.setItem('cart', JSON.stringify({data: cartItems}));
      const newItems = products.map(item => {
        if(item._id === action.payload) {
          item.cartQuantiy = 0;
          return item;
        } else {
          return item;
        }
      });
      localStorage.setItem('products', JSON.stringify({data: newItems}));
      return statePart;
    }
    default:
      return statePart;
  }
};
