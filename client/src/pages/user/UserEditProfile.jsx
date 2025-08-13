// pages/user/UserEditProfile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserEditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    bio: ""
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.token) return;

      try {
        const { data } = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          city: data.city || "",
          bio: data.bio || ""
        });
        if (data.profileImage) {
          setPreviewImage(`http://localhost:5000${data.profileImage}`);
        }
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.token) return;

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key] || "");
    });
    if (profileImage) {
      formDataToSend.append("profileImage", profileImage);
    }

    try {
      await axios.put("http://localhost:5000/api/users/profile", formDataToSend, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Profile updated successfully");
      navigate("/user/dashboard");
    } catch (err) {
      console.error("Error updating profile", err.response?.data || err.message);
      alert("Failed to update profile");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio"></textarea>

        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", margin: "10px 0" }}
          />
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit" style={{ display: "block", marginTop: "15px" }}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserEditProfile;
