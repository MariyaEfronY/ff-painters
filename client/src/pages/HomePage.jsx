import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Paintbrush, Home } from "lucide-react";
import Lottie from "lottie-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import heroAnimation from "../assets/hero-painter.json"; // downloaded JSON

const HomePage = () => {
  const [painters, setPainters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPainters = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/painter/main");
        setPainters(res.data);
      } catch (err) {
        console.error("❌ Failed to load painters:", err.message);
      }
    };
    fetchPainters();
  }, []);

  return (
    <div className="bg-background text-textDark font-sans">
      {/* ✅ Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 py-16 lg:py-24 bg-gradient-to-r from-primary to-secondary text-white">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <h1 className="text-3xl sm:text-4xl text-primary lg:text-5xl font-bold mb-4 leading-tight">
            Find the Best Painters for Your Home & Office
          </h1>
          <p className="mb-6 text-base sm:text-lg lg:text-xl">
            Book trusted painters with just a few clicks. Browse profiles, check
            reviews, and hire instantly.
          </p>
          <button className="bg-white text-primary px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition">
            Find Painters
          </button>
        </motion.div>

        {/* Right animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-64 sm:w-80 lg:w-96 mb-10 lg:mb-0"
        >
          <Lottie animationData={heroAnimation} loop={true} />
        </motion.div>
      </section>

      {/* ✅ Search Section */}
      <section className="px-6 sm:px-10 lg:px-16 py-10 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter city / location..."
            className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-primary"
          />
          <select className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-primary">
            <option>Select Specialization</option>
            <option>Interior</option>
            <option>Exterior</option>
            <option>Wall Art</option>
          </select>
          <button className="bg-primary text-white px-6 py-3 rounded-lg hover:scale-105 transition">
            Search
          </button>
        </div>
      </section>

      {/* ✅ Featured Painters Section */}
      <section className="px-6 sm:px-10 lg:px-16 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-textDark">
          Featured Painters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {painters.length > 0 ? (
            painters.map((p) => (
              <motion.div
                key={p._id}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <img
                  src={`http://localhost:5000/uploads/profileImages/${p.profileImage}`}
                  alt={p.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg sm:text-xl font-semibold">{p.name}</h3>
                <p className="text-textDark/70 text-sm sm:text-base">
                  {p.city}
                </p>
                <p className="text-xs sm:text-sm mt-2 line-clamp-2 text-textDark/60">
                  {p.bio}
                </p>
                <button
                  onClick={() => navigate(`/painters/${p._id}`)}
                  className="mt-4 bg-secondary text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                >
                  View Profile
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-textDark/60">
              No featured painters found.
            </p>
          )}
        </div>
      </section>

      {/* ✅ How It Works Section */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 bg-background">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-textDark">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          <div>
            <Search className="w-12 h-12 mx-auto text-primary mb-4" />
            <h4 className="font-semibold">Browse Painters</h4>
          </div>
          <div>
            <Calendar className="w-12 h-12 mx-auto text-primary mb-4" />
            <h4 className="font-semibold">Book Instantly</h4>
          </div>
          <div>
            <Paintbrush className="w-12 h-12 mx-auto text-primary mb-4" />
            <h4 className="font-semibold">Get Painted</h4>
          </div>
          <div>
            <Home className="w-12 h-12 mx-auto text-primary mb-4" />
            <h4 className="font-semibold">Enjoy Your Home</h4>
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-primary text-white py-8 text-center">
        <p className="text-sm sm:text-base">
          © 2025 Painter Booking. All rights reserved.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm sm:text-base">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
        </div>
      </footer>
    </div>
  );



};

export default HomePage;
