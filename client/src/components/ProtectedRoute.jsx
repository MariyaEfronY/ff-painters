// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    // not logged in → go to login
    return <Navigate to="/user/login" replace />;
  }

  // logged in → show the page
  return children;
};

export default ProtectedRoute;
