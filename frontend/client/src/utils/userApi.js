// utils/userApi.js
import axios from "axios";

// ✅ Point directly to /api/users since all user routes are mounted there
const userAPI = axios.create({
  baseURL: "http://localhost:5000/api/users",
});

// ✅ Attach user token from localStorage to every request if available
userAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken"); // store token under "userToken"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default userAPI;
