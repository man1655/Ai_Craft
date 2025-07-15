import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance1 = axios.create({
  baseURL: 'http://localhost:4000/api', // Adjust if needed
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 🔥 Must match backend CORS config
});



// Request Interceptor
axiosInstance1.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance1.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout!');
    }

    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        console.warn('Unauthorized - redirect or notify user');
      }

      if (status >= 500) {
        console.error('Server error:', data?.message || 'Something went wrong on the server');
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance1;
