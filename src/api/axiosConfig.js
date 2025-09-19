// Base Axios instance (baseURL, headers, interceptors)
import axios from "axios";
import { getToken, removeToken } from '../utils/storage';

// Create Axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor with centralized error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let customError = {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Something went wrong, please try again later.",
    };
    if (customError.status === 401) {
      removeToken();
      window.location.href = "/login"; // Or trigger refresh token logic
    }
    return Promise.reject(customError); // Always return custom error
  }
);

export default api;
