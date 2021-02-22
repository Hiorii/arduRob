import {initialState} from './initialState';
import axios from 'axios';
import {API_URL} from '../config';

/* selectors */
export const getCurrentUser= () => JSON.parse(localStorage.getItem('profile'));

/* action name creator */
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const AUTH = createActionName('AUTH');
const LOGOUT = createActionName('LOGOUT');

/* action creators */
export const authUser = payload => ({ payload, type: AUTH });
export const logoutUser = payload => ({ payload, type: LOGOUT });

/* thunk creators */
export const signInWithGoogle = (formData, history) => async (dispatch) => {
  try {
    const googleData = formData.data.result;
    const googleToken = formData.data.token;
    const { data } = await axios.post(`${API_URL}/signGoogle`, googleData);

    dispatch(authUser({data:{...data, token: googleToken}}));
    history.push('/');
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

export const signIn = (formData, history) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/signin`, formData);

    dispatch(authUser({data: data}));
    history.push('/');
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/signup`, formData);

    dispatch(authUser(data));
    history.push('/');
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

/* reducer */
export const reducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case AUTH: {
      localStorage.setItem('profile', JSON.stringify({...action.payload?.data}));

      return { ...statePart, authData: action.payload?.data};
      return statePart;
    }
    case LOGOUT: {
      localStorage.clear();

      return { ...statePart, users: null};
    }
    default:
      return statePart;
  }
};
