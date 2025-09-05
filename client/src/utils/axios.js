// utils/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://painter-backend.netlify.app/api',
});

// ✅ Use the same key you used when storing the token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('painterToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});




export default API;
