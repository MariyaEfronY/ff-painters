import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: ""
  });
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  // Handle text inputs
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle file input
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare FormData for backend (must match multer's field name)
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (profileImage) {
        data.append("profileImage", profileImage); // field name matches backend
      }

      await axios.post("http://localhost:5000/api/users/signup", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("User registered successfully!");
      navigate("/user/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-4">User Signup</h2>

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default UserSignup;
