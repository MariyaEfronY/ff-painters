import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Calendar, Paintbrush, Home } from "lucide-react";
import Lottie from "lottie-react";
import axios from "axios";
import API from "../api/axiosConfig";
import heroAnimation from "../assets/hero-painter.json";
import SearchPainter from "../components/SearchPainter";

const HomePage = () => {
  const [painters, setPainters] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Section refs
  const heroRef = useRef(null);
  const searchRef = useRef(null);
  const featuredRef = useRef(null);
  const howRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // ✅ Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    };
  }, [menuOpen]);

  useEffect(() => {
    const fetchPainters = async () => {
      try {
        const res = await axios.get(
          "https://painter-backend-inky.vercel.app/api/painter/main"
        );
        setPainters(res.data);
      } catch (err) {
        console.error("❌ Failed to load painters:", err.message);
      }
    };
    fetchPainters();
  }, []);

  const colors = {
    primary: "#ec4899",
    secondary: "#f472b6",
    background: "#f3f4f6",
    textDark: "#111827",
    cardBg: "#ffffff",
    textMuted: "#6b7280",
  };

  return (
    <div
      style={{
        backgroundColor: colors.background,
        color: colors.textDark,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* ✅ Navigation */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#fff",
          zIndex: 1000,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.8rem 1.5rem",
            height: "70px",
          }}
        >
          {/* ✅ Brand Name Only (Animated Gradient Text) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
            }}
            onClick={() => scrollToSection(heroRef)}
          >
            ff painter&apos;s
          </motion.div>

          {/* Desktop Menu */}
          <div
            className="nav-links"
            style={{
              display: "flex",
              gap: "1.5rem",
              alignItems: "center",
            }}
          >
            <span onClick={() => scrollToSection(heroRef)}>Home</span>
            <span onClick={() => scrollToSection(searchRef)}>Search</span>
            <span onClick={() => scrollToSection(featuredRef)}>Featured</span>
            <span onClick={() => scrollToSection(howRef)}>How It Works</span>
            <span onClick={() => navigate("/contact")}>Contact</span>

            <button
              onClick={() => navigate("/login-choice")}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: colors.primary,
                color: "#fff",
                borderRadius: "0.5rem",
                border: "none",
              }}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup-choice")}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: colors.secondary,
                color: "#fff",
                borderRadius: "0.5rem",
                border: "none",
              }}
            >
              Signup
            </button>
          </div>

          {/* Hamburger Button */}
          <button
            className="hamburger"
            style={{
              display: "none",
              fontSize: "1.8rem",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Overlay */}
        {menuOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.4)",
              zIndex: 1500,
            }}
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "75%",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              padding: "2rem 1rem",
              boxShadow: "-2px 0 6px rgba(0,0,0,0.1)",
              zIndex: 2000,
              overflowY: "auto",
            }}
          >
            {/* Close Button */}
            <button
              style={{
                alignSelf: "flex-end",
                fontSize: "1.5rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                marginBottom: "1.5rem",
              }}
              onClick={() => setMenuOpen(false)}
            >
              ✖
            </button>
            <span onClick={() => scrollToSection(heroRef)}>Home</span>
            <span onClick={() => scrollToSection(searchRef)}>Search</span>
            <span onClick={() => scrollToSection(featuredRef)}>Featured</span>
            <span onClick={() => scrollToSection(howRef)}>How It Works</span>
            <span onClick={() => navigate("/contact")}>Contact</span>

            <button
              onClick={() => {
                navigate("/login-choice");
                setMenuOpen(false);
              }}
              style={{
                marginTop: "2rem",
                padding: "0.75rem 1rem",
                backgroundColor: colors.primary,
                color: "#fff",
                borderRadius: "0.5rem",
                border: "none",
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/signup-choice");
                setMenuOpen(false);
              }}
              style={{
                marginTop: "0.75rem",
                padding: "0.75rem 1rem",
                backgroundColor: colors.secondary,
                color: "#fff",
                borderRadius: "0.5rem",
                border: "none",
              }}
            >
              Signup
            </button>
          </motion.div>
        )}

        {/* Responsive Styles */}
        <style>
          {`
            nav span {
              cursor: pointer;
              margin: 0.5rem 0;
            }
            @media (max-width: 768px) {
              .nav-links { display: none !important; }
              .hamburger { display: block !important; }
            }
          `}
        </style>
      </nav>

      {/* ✅ Hero Section */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
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

        {/* Foreground Content */}
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
            Book trusted painters with just a few clicks. Browse profiles, check
            reviews, and hire instantly.
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
            onClick={() => scrollToSection(featuredRef)}
          >
            Find Painters
          </motion.button>
        </motion.div>
      </section>

      {/* ✅ Search Section */}
      <SearchPainter colors={colors} />

      {/* ✅ Featured Painters */}
      <section ref={featuredRef} style={{ padding: "4rem 2rem" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.75rem",
            fontWeight: "bold",
            marginBottom: "2.5rem",
          }}
        >
          Featured Painters
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
          }}
        >
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
                  src={p.profileImage || "/default-avatar.png"}
                  alt={p.name}
                  style={{
                    width: "6rem",
                    height: "6rem",
                    borderRadius: "50%",
                    margin: "0 auto 1rem",
                    objectFit: "cover",
                  }}
                />
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                  {p.name}
                </h3>
                <p style={{ fontSize: "0.875rem", color: colors.textMuted }}>
                  {p.city}
                </p>
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
            <p style={{ textAlign: "center", color: colors.textMuted }}>
              No featured painters found.
            </p>
          )}
        </div>
      </section>

      {/* ✅ How It Works */}
      <section
        ref={howRef}
        style={{
          padding: "4rem 2rem",
          backgroundColor: colors.background,
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: "bold",
            marginBottom: "2.5rem",
          }}
        >
          How It Works
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "2rem",
          }}
        >
          <div>
            <Search
              style={{
                width: 48,
                height: 48,
                color: colors.primary,
                margin: "0 auto 1rem",
              }}
            />
            <h4 style={{ fontWeight: 600 }}>Browse Painters</h4>
          </div>
          <div>
            <Calendar
              style={{
                width: 48,
                height: 48,
                color: colors.primary,
                margin: "0 auto 1rem",
              }}
            />
            <h4 style={{ fontWeight: 600 }}>Book Instantly</h4>
          </div>
          <div>
            <Paintbrush
              style={{
                width: 48,
                height: 48,
                color: colors.primary,
                margin: "0 auto 1rem",
              }}
            />
            <h4 style={{ fontWeight: 600 }}>Get Painted</h4>
          </div>
          <div>
            <Home
              style={{
                width: 48,
                height: 48,
                color: colors.primary,
                margin: "0 auto 1rem",
              }}
            />
            <h4 style={{ fontWeight: 600 }}>Enjoy Your Home</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
<footer style={{ backgroundColor: colors.textDark, color: "#fff", marginTop: "2rem" }}>
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    style={{
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "3rem 1.5rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "2rem",
    }}
  >
    {/* Brand Info */}
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: colors.primary }}>
        🎨 PainterBooking
      </h2>
      <p style={{ marginTop: "1rem", color: colors.textMuted, fontSize: "0.9rem" }}>
        Find the best painters near you. Easy b ooking, trusted professionals, and a colorful experience!
      </p>
    </div>

    {/* Quick Links */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h3 style={{ fontWeight: "600", marginBottom: "1rem" }}>Remain Links</h3>
      <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.9rem" }}>
        <li>
  <Link to="/about" style={{ color: "#fff", cursor: "pointer" }}>About</Link>
</li>
        <li>
  <Link to="/contact" style={{ color: "#fff", cursor: "pointer" }}>Contact</Link>
</li>
        <li><a href="#" style={{ color: "#fff" }}>Privacy Policy</a></li>
      </ul>
    </motion.div>

    {/* Subscribe */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h3 style={{ fontWeight: "600", marginBottom: "1rem" }}>📩 Subscribe</h3>
      <p style={{ fontSize: "0.9rem", marginBottom: "1rem", color: colors.textMuted }}>
        Get updates, tips, and offers directly in your inbox.
      </p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const email = e.target.email.value;
          try {
            await axios.post("https://painter-backend-inky.vercel.app/api/subscribe", { email });
            alert("✅ Subscribed successfully!");
            e.target.reset();
          } catch (err) {
            alert("❌ Failed to subscribe. Try again.");
          }
        }}
        style={{ display: "flex", gap: "0.5rem" }}
      >
        <input
  type="email"
  name="email"
  placeholder="Enter your email"
  required
  className="flex-1 px-3 py-2 rounded-md border-2 border-white bg-transparent text-white placeholder-white placeholder-opacity-80 transition-all duration-300 focus:border-pink-500 focus:shadow-[0_0_10px_rgba(236,72,153,0.8)] hover:border-pink-300"
/>


        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          style={{
            padding: "0.75rem 1rem",
            background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
            border: "none",
            borderRadius: "0.5rem",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Subscribe
        </motion.button>
      </form>
    </motion.div>
  </motion.div>

  {/* Bottom Bar */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 1 }}
    style={{
      borderTop: "1px solid rgba(255,255,255,0.2)",
      padding: "1rem",
      textAlign: "center",
      fontSize: "0.85rem",
      color: "#ddd",
    }}
  >
    © {new Date().getFullYear()} FF Painters. All rights reserved. 🌟
  </motion.div>
</footer>

    </div>
  );
};

export default HomePage;
