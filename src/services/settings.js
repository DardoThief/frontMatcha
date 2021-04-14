export const getApiUrl = (endpoint) => {
  const baseApiUrl = process.env.REACT_APP_HOST;
  return `${baseApiUrl}/api/${endpoint}`;
};
