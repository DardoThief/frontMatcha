import { service } from '../service';
import { getApiUrl } from '../settings';

const ENDPOINT_AUTH = '/auth/sign-in';
const ENDPOINT_LOGIN = '/auth/sign-up';
// const ENDPOINT_LOGOUT = '/logout';

export default {
  auth: async (email, username, firstName, lastName, password) => service.post(getApiUrl(ENDPOINT_AUTH),
    { email, username, firstName, lastName, password }),
  login: async (username, password) => service.post(getApiUrl(ENDPOINT_LOGIN),
    { username, password }),
  // logout: async () => {
  //   const resp = await service.post(getApiUrl(ENDPOINT_LOGOUT));
  //   return resp.status === 200;
  // },
};
