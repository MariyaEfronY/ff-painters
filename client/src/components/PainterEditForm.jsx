// src/components/PainterEditForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PainterEditForm = ({ painterId, initialData = {}, onProfileUpdated }) => {
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("painterToken");

      // Create FormData to send both text + file
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      if (profileImage) {
        formDataToSend.append("profileImage", profileImage);
      }

      await axios.put(
        `http://localhost:5000/api/painter/${painterId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Profile updated successfully! 🎉");
      if (onProfileUpdated) onProfileUpdated();
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
      <input name="workExperience" value={formData.workExperience} onChange={handleChange} placeholder="Work Experience" />
      <input name="city" value={formData.city} onChange={handleChange} placeholder="City" />
      <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
      <select
        name="specification"
        value={formData.specification}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            specification: Array.from(e.target.selectedOptions, (opt) => opt.value),
          }))
        }
        multiple
      >
        <option value="interior">Interior</option>
        <option value="exterior">Exterior</option>
      </select>

      <input type="file" onChange={handleImageChange} accept="image/*" />

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default PainterEditForm;
