import {initialState} from './initialState';
import axios from 'axios';
import {API_URL} from '../config';

/* selectors */
export const getAllCategory = ({category}) => category.data;
export const getAllSubCategory = ({category}) => category.subcategory;

/* action name creator */
const reducerName = 'category';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_SUBCATEGORY = createActionName('FETCH_SUBCATEGORY');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchSubcategory = payload => ({ payload, type: FETCH_SUBCATEGORY });


/* thunk creators */
export const fetchCategory = () => {
  return async (dispatch) => {
    dispatch(fetchStarted());
    try {
      const res = await axios.get(`${API_URL}/categories`);
      dispatch(fetchSuccess(res));
    } catch (err) {
      dispatch(fetchError(err.message || true));
    }
  };
};

export const fetchSubCategory = () => {
  return async (dispatch) => {
    dispatch(fetchStarted());
    try {
      const res = await axios.get(`${API_URL}/subCategories`);
      dispatch(fetchSubcategory(res));
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
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_SUBCATEGORY: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        subcategory: action.payload,
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
    default:
      return statePart;
  }
};
