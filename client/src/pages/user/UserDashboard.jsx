import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserDashboard = ({ userId }) => {
  const [formData, setFormData] = useState({ name: "", email: "", bio: "" });
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/profile/${userId}`)
      .then(res => setFormData(res.data))
      .catch(err => toast.error("Failed to fetch profile"));
  }, [userId]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = e => setProfileImage(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("bio", formData.bio);
    if (profileImage) data.append("profileImage", profileImage);

    try {
      await axios.put(`http://localhost:5000/api/users/profile/${userId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile updated!");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      {formData.profileImage && (
        <img src={`http://localhost:5000${formData.profileImage}`} alt="Profile" width="100" />
      )}
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} />
        <input name="email" value={formData.email} onChange={handleChange} />
        <textarea name="bio" value={formData.bio} onChange={handleChange} />
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserDashboard;
