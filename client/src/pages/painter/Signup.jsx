import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    city: '',
    workExperience: '',
    bio: '',
    specification: [],
  });
  const [profileImage, setProfileImage] = useState(null); // ✅ image state

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
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (key === 'specification') {
          form.specification.forEach((s) => formData.append('specification', s));
        } else {
          formData.append(key, form[key]);
        }
      });

      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      await axios.post('http://localhost:5000/api/painter/auth/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Signup successful!');
      navigate('/painter/login');
    } catch (err) {
      console.error('Signup Error:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Signup failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="text" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <input type="text" placeholder="Phone Number" onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />
      <input type="text" placeholder="City" onChange={(e) => setForm({ ...form, city: e.target.value })} />
      <input type="text" placeholder="Work Experience" onChange={(e) => setForm({ ...form, workExperience: e.target.value })} />
      <textarea placeholder="Bio" onChange={(e) => setForm({ ...form, bio: e.target.value })}></textarea>

      <div>
        <label>
          <input
            type="checkbox"
            checked={form.specification.includes('interior')}
            onChange={() => handleSpecChange('interior')}
          />
          Interior
        </label>
        <label>
          <input
            type="checkbox"
            checked={form.specification.includes('exterior')}
            onChange={() => handleSpecChange('exterior')}
          />
          Exterior
        </label>
      </div>

      {/* ✅ Profile image upload field */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setProfileImage(e.target.files[0])}
      />

      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
