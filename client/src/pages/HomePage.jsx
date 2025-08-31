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

  const colors = {
    primary: "#ec4899",      // Pink
    secondary: "#f472b6",    // Lighter pink
    background: "#f3f4f6",   // Light gray
    textDark: "#111827",     // Dark gray/black
    cardBg: "#ffffff",        // White cards
    textMuted: "#6b7280",     // Muted gray text
  };

  return (
    <div style={{ backgroundColor: colors.background, color: colors.textDark, fontFamily: "'Poppins', sans-serif" }}>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background Lottie Animation */}
        <Lottie
          animationData={heroAnimation}
          loop={true}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            opacity: 0.7,
          }}
        />

        {/* Overlay Text & Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            color: "#fff",
            padding: "0 1.5rem",
            maxWidth: "900px",
          }}
        >
          <h1
            style={{
              fontSize: "2.75rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              lineHeight: 1.2,
              textShadow: "0px 2px 10px rgba(0,0,0,0.6)",
            }}
          >
            Find the Best Painters for Your Home & Office
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              marginBottom: "2rem",
              textShadow: "0px 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            Book trusted painters with just a few clicks. Browse profiles, check reviews, and hire instantly.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            style={{
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
              color: "#fff",
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: "1rem",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
            }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          >
            Find Painters
          </motion.button>
        </motion.div>
      </section>

      {/* Search Section */}
      <section style={{ padding: "2.5rem 2rem", backgroundColor: colors.cardBg, boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ maxWidth: "1024px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <input
            type="text"
            placeholder="Enter city / location..."
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #d1d5db",
              outline: "none",
              color: colors.textDark,
            }}
          />
          <select
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #d1d5db",
              outline: "none",
              color: colors.textDark,
            }}
          >
            <option>Select Specialization</option>
            <option>Interior</option>
            <option>Exterior</option>
            <option>Wall Art</option>
          </select>
          <button
            style={{
              backgroundColor: colors.primary,
              color: "#fff",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
      </section>

      {/* Featured Painters */}
      <section style={{ padding: "4rem 2rem" }}>
        <h2 style={{ textAlign: "center", fontSize: "1.75rem", fontWeight: "bold", marginBottom: "2.5rem" }}>
          Featured Painters
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          {painters.length > 0 ? (
            painters.map((p) => (
              <motion.div
                key={p._id}
                whileHover={{ scale: 1.05 }}
                style={{
                  backgroundColor: colors.cardBg,
                  borderRadius: "1rem",
                  padding: "1.5rem",
                  textAlign: "center",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={`http://localhost:5000/uploads/profileImages/${p.profileImage}`}
                  alt={p.name}
                  style={{ width: "6rem", height: "6rem", borderRadius: "50%", margin: "0 auto 1rem", objectFit: "cover" }}
                />
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600 }}>{p.name}</h3>
                <p style={{ fontSize: "0.875rem", color: colors.textMuted }}>{p.city}</p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    marginTop: "0.5rem",
                    color: colors.textMuted,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {p.bio}
                </p>
                <button
                  onClick={() => navigate(`/painters/${p._id}`)}
                  style={{
                    marginTop: "1rem",
                    backgroundColor: colors.secondary,
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  View Profile
                </button>
              </motion.div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: colors.textMuted }}>No featured painters found.</p>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "4rem 2rem", backgroundColor: colors.background, textAlign: "center" }}>
        <h2 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "2.5rem" }}>How It Works</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "2rem" }}>
          <div>
            <Search style={{ width: 48, height: 48, color: colors.primary, margin: "0 auto 1rem" }} />
            <h4 style={{ fontWeight: 600 }}>Browse Painters</h4>
          </div>
          <div>
            <Calendar style={{ width: 48, height: 48, color: colors.primary, margin: "0 auto 1rem" }} />
            <h4 style={{ fontWeight: 600 }}>Book Instantly</h4>
          </div>
          <div>
            <Paintbrush style={{ width: 48, height: 48, color: colors.primary, margin: "0 auto 1rem" }} />
            <h4 style={{ fontWeight: 600 }}>Get Painted</h4>
          </div>
          <div>
            <Home style={{ width: 48, height: 48, color: colors.primary, margin: "0 auto 1rem" }} />
            <h4 style={{ fontWeight: 600 }}>Enjoy Your Home</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: colors.primary, color: "#fff", padding: "2rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.875rem" }}>© 2025 Painter Booking. All rights reserved.</p>
        <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem", fontSize: "0.875rem" }}>
          <a href="#" style={{ color: "#fff" }}>About</a>
          <a href="#" style={{ color: "#fff" }}>Contact</a>
          <a href="#" style={{ color: "#fff" }}>Privacy</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
