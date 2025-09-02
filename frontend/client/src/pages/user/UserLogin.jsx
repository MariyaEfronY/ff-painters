import React, { useState, useEffect } from "react";
import userAPI from "../../utils/userApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // ⏰ Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await userAPI.post("/login", form);
      localStorage.setItem("userToken", data.token);

      const redirectPath =
        localStorage.getItem("redirectAfterLogin") || "/user/dashboard";
      localStorage.removeItem("redirectAfterLogin");

      toast.success("✅ User login successful!", { position: "top-right" });
      setTimeout(() => navigate(redirectPath), 1200);
    } catch (err) {
      console.error("Login failed", err);
      toast.error("❌ User login failed!", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md relative">
        {/* Current Date & Time */}
        <div className="absolute top-4 right-4 text-gray-500 font-mono text-sm">
          {currentTime.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}{" "}
          ⏰ {currentTime.toLocaleTimeString()}
        </div>

        <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">👤 User Login</h1>
        <p className="text-gray-500 text-center mb-6">
          Login to book your painter services ✨
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            value={form.password}
            onChange={handleChange}
            required
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
          New here?{" "}
          <span
            className="text-purple-600 cursor-pointer"
            onClick={() => navigate("/user/signup")}
          >
            Sign Up ✨
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
