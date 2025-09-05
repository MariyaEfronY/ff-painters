import axios from 'axios';

const API = axios.create({
  baseURL: 'https://painter-backend.netlify.app/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('painterToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
