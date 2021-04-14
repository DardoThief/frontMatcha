import userService from '../../../services/users/userService';

const USERS_GET_LIST = 'USERS_GET_LIST';

export const getUsers = (page) => async (dispatch) => {
  const respData = await userService.getUsers(page);
  if (respData) {
    dispatch({
      type: USERS_GET_LIST,
      payload: respData,
    });
  }
};
