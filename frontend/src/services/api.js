import axios from 'axios';
import toast from 'react-hot-toast';

// Setup base URL from Vite environment variables with a fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10s timeout
});

// Request Interceptor: Attach bearer token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('recipe_app_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle errors globally without crashing
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If it's a network error or the server is completely unreachable
    if (!error.response) {
      toast.error('Network Error: Cannot connect to server. Running in Mock Data mode.');
      console.warn('API connection failed. Falling back to local/mock services.');
    } else {
      const status = error.response.status;
      const message = error.response.data?.message || 'Something went wrong';
      
      if (status === 401) {
        // Unauthorized - clear token and user details if they exist
        localStorage.removeItem('recipe_app_token');
        console.warn('Unauthorized request. Directing to login...');
      } else if (status === 403) {
        toast.error('Forbidden: You do not have permission for this action.');
      } else if (status === 500) {
        toast.error('Internal Server Error. Falling back to local data.');
      } else {
        toast.error(message);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
