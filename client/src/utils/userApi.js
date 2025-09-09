// utils/userApi.js
import axios from "axios";

// ✅ Point to your Vercel backend, not Netlify
const userAPI = axios.create({
  baseURL: "https://painter-backend-inky.vercel.app/api/users",
});

userAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default userAPI;
