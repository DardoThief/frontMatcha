/* eslint-disable no-console */
const handleErrors = (error) => {
  console.error('[API]', error);
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('Token');
    if (localStorage.getItem('isLoggedIn') === false) {
      window.location.pathname = '/auth/sign-up';
    }
  }

  throw error;
};

export default handleErrors;
