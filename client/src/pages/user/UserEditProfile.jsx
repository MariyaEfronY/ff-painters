import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const UserEditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    bio: "",
    profileImage: null
  });
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setFormData({
          name: data.name || "",
          phone: data.phone || "",
          city: data.city || "",
          bio: data.bio || "",
          profileImage: null
        });

        if (data.profileImage) {
          setPreviewImage(`${API_BASE_URL}${data.profileImage}`);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };
    fetchProfile();
  }, []);

  // Handle text input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profileImage: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      await axios.put(`${API_BASE_URL}/api/users/profile`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Name:</label>
        <input name="name" value={formData.name} onChange={handleChange} />

        <label>Phone:</label>
        <input name="phone" value={formData.phone} onChange={handleChange} />

        <label>City:</label>
        <input name="city" value={formData.city} onChange={handleChange} />

        <label>Bio:</label>
        <textarea name="bio" value={formData.bio} onChange={handleChange} />

        <label>Profile Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            style={{ width: 100, height: 100, objectFit: "cover" }}
          />
        )}

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserEditProfile;
