import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/admin", // ✅ adjust if your backend URL is different
});

// ✅ Admin Signup
export const adminSignup = (formData) => API.post("/signup", formData);

// ✅ Admin Login
export const adminLogin = (formData) => API.post("/login", formData);

// ✅ Admin Logout
export const adminLogout = () => {
  localStorage.removeItem("adminToken");
};


// ✅ Authenticated requests (with token)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
