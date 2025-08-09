// utils/userApi.js
import axios from 'axios';

const userAPI = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Attach user token from localStorage to every request if available
userAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken'); // user token key
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default userAPI;
