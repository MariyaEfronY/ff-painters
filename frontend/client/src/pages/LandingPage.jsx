import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Painter Booking</h1>
      <p className="mb-6">Sign up or log in to get started</p>

      <div className="flex gap-6">
        <div className="flex flex-col items-center">
          <button
            onClick={() => navigate("/painter/signup")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Painter Sign Up
          </button>
          <button
            onClick={() => navigate("/painter/login")}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            Painter Login
          </button>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={() => navigate("/user/signup")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            User Sign Up
          </button>
          <button
            onClick={() => navigate("/user/login")}
            className="mt-2 text-sm text-green-600 hover:underline"
          >
            User Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
