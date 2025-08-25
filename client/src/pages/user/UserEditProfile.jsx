import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserEditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    bio: "",
    userProfileImages: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current profile
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const { data } = await axios.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          name: data.name,
          phone: data.phone,
          city: data.city,
          bio: data.bio,
          userProfileImages: null,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "userProfileImages") {
      setFormData({ ...formData, userProfileImages: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("Authentication required. Please log in again.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name || "");
    formDataToSend.append("phone", formData.phone || "");
    formDataToSend.append("city", formData.city || "");
    formDataToSend.append("bio", formData.bio || "");

    if (formData.userProfileImages) {
      formDataToSend.append("userProfileImages", formData.userProfileImages);
    }

    await axios.put("/users/profile", formDataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("✅ Profile updated successfully!");
    navigate("/user/dashboard");

  } catch (error) {
    console.error("Error updating profile:", error.response?.data || error.message);

    if (error.response?.data?.message) {
      toast.error(`❌ ${error.response.data.message}`);
    } else {
      toast.error("❌ Failed to update profile. Please try again.");
    }
  }
};



  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
      <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio"></textarea>
      <input type="file" name="userProfileImages" onChange={handleChange} />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UserEditProfile;
