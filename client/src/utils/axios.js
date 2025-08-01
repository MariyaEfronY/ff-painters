// utils/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// ✅ Fix the token key to match your login
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('painterToken'); // 🔁 FIXED HERE
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
