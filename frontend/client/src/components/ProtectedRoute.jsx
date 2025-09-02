// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("userToken");
  const location = useLocation();

  if (!token) {
    // save where user wanted to go
    localStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/user/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
