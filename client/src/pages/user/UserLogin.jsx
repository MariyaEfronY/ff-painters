import React, { useState } from "react";
import userAPI from "../../utils/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await userAPI.post("/login", form);
      localStorage.setItem("userToken", data.token);
      navigate("/user/dashboard");
      toast.success("User Login successfully!");
    } catch (err) {
      console.error("Login failed", err);
      toast.error("User Login error..!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
};

export default UserLogin;
