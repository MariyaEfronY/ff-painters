import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/painter/auth/login', form);

      // Save the painter ID and token to localStorage
      localStorage.setItem('painterId', response.data.painter._id);
      localStorage.setItem('painterToken', response.data.token);

      // Navigate to dashboard
      navigate('/painter/dashboard');
    } catch (error) {
      console.log('Login failed:', error.response?.data || error.message);
      alert('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
