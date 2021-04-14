import {
  AUTH_LOGOUT, AUTH_SET_DATA, AUTH_CHECK, AUTH_SET_ID, AUTH_SET_VIEW, AUTH_LOADING,
} from './actions';

const blankInitialState = {
  isLoading: false,
  isLoggedIn: false,
  Token: '',
  id: null,
  isMobile: false,
  width: 0,
  height: 0,
};

const initialState = localStorage ? { // без localStorage функционала пока не предусматривается
  ...blankInitialState,
  isLoggedIn: !!(localStorage.getItem('isLoggedIn')) || false,
  mentiToken: localStorage.getItem('Token') || '',
  id: Number(localStorage.getItem('id')) || null,
} : blankInitialState;

// eslint-disable-next-line import/prefer-default-export
export const authReducer = (state = initialState, action) => {
  if (action.type === AUTH_SET_VIEW) {
    return { ...state, ...action.payload };
  }
  if (action.type === AUTH_SET_DATA) {
    return { ...state, ...action.payload };
  }
  if (action.type === AUTH_LOGOUT) {
    return { ...blankInitialState };
  }
  if (action.type === AUTH_CHECK) {
    return { ...initialState };
  }
  if (action.type === AUTH_SET_ID) {
    return { ...state, id: action.payload };
  }
  if (action.type === AUTH_LOADING) {
    return { ...state, ...action.payload };
  }
  return state;
};
