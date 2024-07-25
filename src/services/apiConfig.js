const API_URLS = {
  development: import.meta.env.REACT_APP_API_URL,
  qa: '',
  production: '',
};

export const getApiUrl = (env) => {
  return API_URLS[env] || API_URLS.development;
};
