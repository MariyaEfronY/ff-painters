// src/pages/AboutPage.jsx
import React from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white flex flex-col items-center justify-center px-6 py-12">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold mb-6 text-center"
      >
        🎨 About <span className="text-purple-400">FF-Painters</span> 🖌️
      </motion.h1>

      {/* Animated Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="max-w-2xl text-lg text-gray-300 text-center mb-10"
      >
        Welcome to <span className="font-semibold text-purple-300">FF-Painters</span>!  
        We connect homeowners 🏡 with talented painters 👩‍🎨👨‍🎨 to bring colors 🌈, 
        creativity ✨, and life 💫 to your walls.
      </motion.p>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Mission */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white/10 rounded-2xl shadow-lg backdrop-blur-md text-center"
        >
          <h2 className="text-2xl font-bold mb-4">🚀 Our Mission</h2>
          <p className="text-gray-200">
            To make finding reliable painters easy, fast, and trustworthy.  
            We believe every home deserves beautiful walls 💖.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white/10 rounded-2xl shadow-lg backdrop-blur-md text-center"
        >
          <h2 className="text-2xl font-bold mb-4">🌟 Our Vision</h2>
          <p className="text-gray-200">
            To become the #1 platform 🔝 for homeowners and painters,  
            creating dream spaces with colors 🎉.
          </p>
        </motion.div>

        {/* Values */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white/10 rounded-2xl shadow-lg backdrop-blur-md text-center"
        >
          <h2 className="text-2xl font-bold mb-4">💡 Our Values</h2>
          <p className="text-gray-200">
            🎯 Quality Work  
            🤝 Trust & Transparency  
            💎 Creativity & Innovation  
            ❤️ Customer Happiness
          </p>
        </motion.div>
      </div>

      {/* Footer Quote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-12 text-lg italic text-purple-300 text-center"
      >
        ✍️ "Painting is the silent poetry 🎶 that brings walls to life."
      </motion.p>
    </div>
  );
};

export default AboutPage;
