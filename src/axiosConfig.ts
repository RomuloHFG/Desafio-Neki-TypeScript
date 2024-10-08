import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('userToken');
    const token = userToken ? JSON.parse(userToken)?.token : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('Error in request interceptor:', error); 
    return Promise.reject(error);
  }
);

export default axiosInstance;
