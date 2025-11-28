import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const apiInstance = axios.create({
  baseURL: API_URL,
});

apiInstance.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token; 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('userInfo'); 
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
