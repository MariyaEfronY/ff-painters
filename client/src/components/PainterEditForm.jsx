// src/components/PainterEditForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const PainterEditForm = ({ painterId, initialData = {}, onProfileUpdated }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    phoneNumber: initialData.phoneNumber || "",
    workExperience: initialData.workExperience || "",
    city: initialData.city || "",
    bio: initialData.bio || "",
    specification: initialData.specification || [],
  });

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    setFormData({
      name: initialData.name || "",
      email: initialData.email || "",
      phoneNumber: initialData.phoneNumber || "",
      workExperience: initialData.workExperience || "",
      city: initialData.city || "",
      bio: initialData.bio || "",
      specification: initialData.specification || [],
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => setProfileImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("painterToken");
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) value.forEach((v) => data.append(key, v));
        else data.append(key, value);
      });

      if (profileImage) data.append("profileImage", profileImage);

      await axios.put(
        `http://localhost:5000/api/painter/profile/${painterId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("✅ Profile updated successfully!");
      navigate("/dashboard");
      if (onProfileUpdated) onProfileUpdated();
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("❌ Failed to update profile.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-6 rounded-xl shadow-lg flex flex-col gap-4"
      encType="multipart/form-data"
    >
      {/* Name */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">🖊️ Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">📧 Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">📞 Phone Number</label>
        <input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Work Experience */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">🛠️ Work Experience (years)</label>
        <input
          name="workExperience"
          type="number"
          value={formData.workExperience}
          onChange={handleChange}
          placeholder="Years of experience"
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* City */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">🏙️ City</label>
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter your city"
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Bio */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">📝 Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Write a short bio"
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          rows={4}
        />
      </div>

      {/* Specification */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">🎯 Specification</label>
        <select
          name="specification"
          multiple
          value={formData.specification}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              specification: Array.from(
                e.target.selectedOptions,
                (opt) => opt.value
              ),
            }))
          }
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          <option value="interior">Interior</option>
          <option value="exterior">Exterior</option>
        </select>
      </div>

      {/* Profile Image */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">🖼️ Profile Image</label>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-pink-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-pink-400 transition mt-2"
      >
        💾 Save Changes
      </button>
    </form>
  );
};

export default PainterEditForm;
