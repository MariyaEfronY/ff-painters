import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    city: "",
    workExperience: "",
    bio: "",
    specification: [],
  });
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSpecChange = (spec) => {
    setForm((prev) => ({
      ...prev,
      specification: prev.specification.includes(spec)
        ? prev.specification.filter((s) => s !== spec)
        : [...prev.specification, spec],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (key === "specification") {
          form.specification.forEach((s) => formData.append("specification", s));
        } else {
          formData.append(key, form[key]);
        }
      });
      if (profileImage) formData.append("profileImage", profileImage);

      await axios.post("https://painter-backend-inky.vercel.app/api/painter/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("🎉 Signup successful! Redirecting to login...", { position: "top-right" });
      setTimeout(() => navigate("/painter/login"), 1500);
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      toast.error(`❌ ${err.response?.data?.message || "Signup failed!"}`, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 font-sans">
      <ToastContainer />
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-purple-600 text-center mb-6">🖌️ Painter Signup</h1>
        <p className="text-gray-500 text-center mb-6">Join now to manage your profile, gallery & bookings ✨</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="🧑 Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="email"
            placeholder="📧 Email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            placeholder="🔒 Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            placeholder="📞 Phone Number"
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            placeholder="🏙️ City"
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            placeholder="💼 Work Experience (years)"
            onChange={(e) => setForm({ ...form, workExperience: e.target.value })}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <textarea
            placeholder="📝 Bio"
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.specification.includes("interior")}
                onChange={() => handleSpecChange("interior")}
              />
              Interior
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.specification.includes("exterior")}
                onChange={() => handleSpecChange("exterior")}
              />
              Exterior
            </label>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 bg-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-purple-500 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "⏳ Signing up..." : "🚀 Signup"}
          </button>
        </form>

        <p className="text-gray-400 text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            className="text-purple-600 cursor-pointer"
            onClick={() => navigate("/painter/login")}
          >
            Login ✨
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
