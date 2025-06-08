import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for development logging
if (import.meta.env.VITE_APP_ENV === 'development') {
  httpClient.interceptors.request.use(request => {
    console.log('Starting Request:', request.url);
    return request;
  });
}

export const get = async (url, config = {}) => {
  try {
    const response = await httpClient.get(url, config);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
    } else if (error.request) {
      throw new Error('No response received from server. Please check your internet connection.');
    } else {
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
};

export const post = async (url, data) => {
  try {
    const response = await httpClient.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const put = async (url, data) => {
  try {
    const response = await httpClient.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const del = async (url) => {
  try {
    const response = await httpClient.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default httpClient; 