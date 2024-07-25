// import { getApiUrl } from "./apiConfig";
// import Config  from './config';

const BASE_URL = 'http://127.0.0.1:8000/';//getApiUrl(Config.ENV);

const request = async (url, method, data = null) => {
  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(`${BASE_URL}${url}`, requestOptions);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch data');
    }

    return responseData;
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};

export const postRequest = async (url, data) => {
  return request(url, 'POST', data);
};

export const getRequest = async (url) => {
  return request(url, 'GET');
};

export const putRequest = async (url, data) => {
  return request(url, 'PUT', data);
};

export const deleteRequest = async (url) => {
  return request(url, 'DELETE');
};
