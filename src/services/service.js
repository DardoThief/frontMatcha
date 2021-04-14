import axios from 'axios';
import axiosRetry from 'axios-retry';
import handleErrors from './handleErrors';

axiosRetry(axios, { retries: 3, retryDelay: () => 3000 });

const timeZone = () => (-new Date().getTimezoneOffset() / 60);

const getAxios = () => {
  const Token = localStorage.getItem('Token');
  if (Token) {
    axios.defaults.headers.common['X-Client-Token'] = Token;
    axios.defaults.headers.common['X-Client-Timezone'] = timeZone();
  }
  return axios;
};

const service = {
  get: (url, options) => getAxios().get(url, options).catch(handleErrors),
  post: (url, data, options) => getAxios().post(url, data, options).catch(handleErrors),
  put: (url, data, params) => getAxios().put(url, data, params).catch(handleErrors),
  delete: (url, options) => getAxios().delete(url, options).catch(handleErrors),
};

export { service };
