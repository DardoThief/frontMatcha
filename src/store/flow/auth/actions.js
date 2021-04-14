import authService from "../../../services/auth/authService";
import history from '../../../history';

export const AUTH_SET_DATA = 'AUTH_SET_DATA';
export const AUTH_SET_ID = 'AUTH_SET_ID';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_CHECK = 'AUTH_CHECK';
export const AUTH_SET_VIEW = 'AUTH_SET_VIEW';
export const AUTH_LOADING = 'AUTH_LOADING';

export const setLoading = (data) => ({
  type: AUTH_LOADING,
  payload: data,
});

export const setAuthData = (data) => ({
  type: AUTH_SET_DATA,
  payload: data,
});

export const setView = (data) => async (dispatch) => {
  await dispatch({
    type: AUTH_SET_VIEW,
    payload: data,
  });
};

export const auth = ( email, username, password, firstname, lastname ) => async (dispatch) => {
  try {
    dispatch(setLoading( {isLoading: true }));
    const { data, status } = await authService.auth(email, username, password, firstname, lastname);
    if (status === 200 && data && data.id) {
      localStorage.setItem('id', data.id);
    }
    await dispatch(setAuthData({
      isLoading: false,
      isLoggedIn: true,
      email: data.email,
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    }));
  } catch (err) {
    dispatch(setLoading( { isLoading: false }));
    console.error(err);
  }
};

export const login = ( login, password) => async (dispatch) => {
  try {
    dispatch(setLoading({ isLoading: true }));
    const { data, status } = await authService.login(login, password);
    if (status === 200 && data.id) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('id', data.id);
      }
      await dispatch(setAuthData({
        isLoading: false,
        isLoggedIn: true,
        login: data.name,
        id: data.id,
        path: `/${data.event.id}`, //todo verify email
      }));
      history.push(`/${data.event.id}`); //todo verify email
  } catch (err) {
    dispatch(setLoading({ isLoading: false }));
    console.error(err);
  }
};
