import React, { useState } from "react";
import userAPI from "../../utils/userApi";
import { useNavigate } from "react-router-dom";

const UserSignup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("password", form.password);
      if (profileImage) fd.append("profileImage", profileImage);

      await userAPI.post("/register", fd, {
  headers: { "Content-Type": "multipart/form-data" },
});

      navigate("/user/login");
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
      <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default UserSignup;
