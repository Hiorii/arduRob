import {combineReducers, createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {initialState} from './initialState';
import {reducer as productsReducer} from './productRedux';
import {reducer as categoryReducer} from './categoryRedux';
import {reducer as cartReducer} from './cartRedux';
import {reducer as usersReducer} from './userRedux';

// define reducers
const reducers = {
  products: productsReducer,
  category: categoryReducer,
  cart: cartReducer,
  users: usersReducer,
};

// add blank reducers for initial state properties without reducers
Object.keys(initialState).forEach(item => {
  if (typeof reducers[item] == 'undefined') {
    reducers[item] = (statePart = null) => statePart;
  }
});

const combinedReducers = combineReducers(reducers);

// create store
export const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
