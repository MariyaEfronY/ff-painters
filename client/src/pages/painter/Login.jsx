import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("https://painter-backend.netlify.app/api/painter/login", form);

      localStorage.setItem("painterId", response.data.painter._id);
      localStorage.setItem("painterToken", response.data.token);

      toast.success("✅ Login successful!", { position: "top-right" });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error(
        `❌ Login failed: ${error.response?.data?.message || error.message}`,
        { position: "top-right" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center font-sans p-4">
      <ToastContainer />

      {/* Card Container */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-purple-600 text-center mb-6">🎨 Painter Login</h1>
        <p className="text-gray-500 text-center mb-6">Login to manage your profile, gallery & bookings ✨</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 bg-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-purple-500 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "⏳ Logging in..." : "🚀 Login"}
          </button>
        </form>

        <p className="text-gray-400 text-center text-sm mt-4">
          New painter? <span className="text-purple-600 cursor-pointer" onClick={() => navigate("/painter/signup")}>Sign Up ✨</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
