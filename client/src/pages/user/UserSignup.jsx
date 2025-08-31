import React, { useState, useEffect } from "react";
import userAPI from "../../utils/userApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserSignup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

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
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("password", form.password);
      if (profileImage) fd.append("profileImage", profileImage);

      const { data } = await userAPI.post("/register", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.token) localStorage.setItem("userToken", data.token);

      const redirectPath =
        localStorage.getItem("redirectAfterLogin") || "/user/dashboard";
      localStorage.removeItem("redirectAfterLogin");

      toast.success("🎉 Signup successful!");
      setTimeout(() => navigate(redirectPath), 1200);
    } catch (err) {
      console.error("Signup failed", err);
      toast.error("❌ Signup failed!");
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

        <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">📝 User Signup</h1>
        <p className="text-gray-500 text-center mb-6">
          Join us today and book your painter services easily! ✨
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="👤 Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
            className="mt-2"
          />

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 bg-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-purple-500 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "⏳ Signing up..." : "🚀 Sign Up"}
          </button>
        </form>

        <p className="text-gray-400 text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            className="text-purple-600 cursor-pointer"
            onClick={() => navigate("/user/login")}
          >
            Login ✨
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
