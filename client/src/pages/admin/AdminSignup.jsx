import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminSignup } from "../../utils/adminApi";

const AdminSignup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminSignup(form);
      toast.success("✅ Admin registered successfully!");
      navigate("/admin/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          ✍️ Admin Signup
        </h2>

        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="👤 Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          🚀 Signup
        </button>

        <p className="mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/admin/login")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default AdminSignup;
