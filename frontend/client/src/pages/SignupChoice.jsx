import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignupChoice = () => {
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState(new Date());

  // ⏰ Auto-update time
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-400 to-teal-400">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6 w-[350px]"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          🚀 Signup As
        </h2>

        {/* Live Date & Time */}
        <div className="bg-gray-100 p-3 rounded-lg text-center text-sm text-gray-600 shadow">
          📅 {dateTime.toLocaleDateString()} <br />
          ⏰ {dateTime.toLocaleTimeString()}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/user/signup")}
            className="w-full px-6 py-3 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
          >
            👤 User Signup
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/painter/signup")}
            className="w-full px-6 py-3 bg-purple-500 text-white rounded-xl shadow hover:bg-purple-600 transition"
          >
            🖌️ Painter Signup
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupChoice;
