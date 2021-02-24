import {initialState} from './initialState';

/* selectors */
export const getAllCart = () => JSON.parse(localStorage.getItem('cart'));
export const cartTotalQuantity = () => JSON.parse(localStorage.getItem('cart')).data.map(product => product.cartQuantiy);

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

/* reducer */
export const reducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case HANDLE_ADD_QUANTITY: {
      const cartItems = JSON.parse(localStorage.getItem('cart')).data;
      const updatedItems = cartItems.map(product => {
        if(product._id === action.payload) {
          product.cartQuantiy = product.cartQuantiy + 1;
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
      const updatedItems = cartItems.map(product => {
        if(product._id === action.payload) {
          if(product.cartQuantiy > 1) {
            product.cartQuantiy = product.cartQuantiy - 1;
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
      const itemToRemove = cartItems.findIndex(product =>
        product._id === action.payload
      );
      cartItems.splice(itemToRemove,1);
      localStorage.setItem('cart', JSON.stringify({data: cartItems}));
      return statePart;
    }
    default:
      return statePart;
  }
};
