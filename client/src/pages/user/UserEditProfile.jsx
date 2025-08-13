import React, { useState, useEffect } from "react";
import axios from "axios";

const UserEditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    bio: "",
    profileImage: null
  });
  const [previewImage, setPreviewImage] = useState(null);

  // ✅ Load current user profile for editing
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          name: data.name || "",
          phone: data.phone || "",
          city: data.city || "",
          bio: data.bio || "",
          profileImage: null
        });
        if (data.profileImage) {
          setPreviewImage(data.profileImage);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };
    fetchProfile();
  }, []);

  // ✅ Handle text input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profileImage: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("bio", formData.bio);
      if (formData.profileImage) {
        formDataToSend.append("profileImage", formData.profileImage);
      }

      await axios.put("/api/users/profile", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
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
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </div>

        <div>
          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </div>

        <div>
          <label>Bio:</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>
        </div>

        <div>
          <label>Profile Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {previewImage && (
            <img
              src={previewImage.startsWith("blob") ? previewImage : previewImage}
              alt="Preview"
              style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px" }}
            />
          )}
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserEditProfile;
