import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('painterToken');
    navigate('/painter/login');
  };

  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
