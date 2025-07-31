import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:5000/api/painter/auth/signup", form);
    navigate('/painter/login');
  } catch (err) {
    console.error('Signup Error:', err.response?.data || err.message);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input type="email" name="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" name="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
