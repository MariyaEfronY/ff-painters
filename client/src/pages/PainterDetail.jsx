import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PainterDetails = () => {
  const { id } = useParams();
  const [painter, setPainter] = useState(null);
  const navigate = useNavigate();

  const colors = {
    primary: "#2563eb",
    secondary: "#9333ea",
    background: "#f9fafb",
    textDark: "#111827",
  };

  useEffect(() => {
    const fetchPainter = async () => {
      try {
        const res = await axios.get(
          `https://painter-backend-inky.vercel.app/api/painter/${id}`
        );
        setPainter(res.data);
      } catch (err) {
        console.error("❌ Failed to load painter:", err.message);
      }
    };
    fetchPainter();
  }, [id]);

  if (!painter)
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: "2.5rem",
          color: colors.textDark,
        }}
      >
        Loading...
      </p>
    );

  const handleBooking = () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      localStorage.setItem("redirectAfterLogin", `/book/${painter._id}`);
      toast.info("Please signup/login to continue booking");
      navigate("/user/signup");
    } else {
      navigate(`/book/${painter._id}`);
    }
  };

  return (
    <div
      style={{
        padding: "1.5rem",
        maxWidth: "900px",
        margin: "0 auto",
        backgroundColor: colors.background,
        color: colors.textDark,
      }}
    >
      {/* Profile Section */}
<div style={{ textAlign: "center" }}>
  <img
    src={painter.profileImage || "/default-avatar.png"}
    alt={painter.name}
    style={{
      width: "120px",          // smaller profile image
      height: "120px",
      borderRadius: "50%",
      margin: "0 auto",
      border: "3px solid #ddd",
      objectFit: "cover",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    }}
  />
  <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "0.8rem" }}>
    {painter.name}
  </h1>
  <p style={{ color: "#555", fontSize: "0.9rem" }}>📍 {painter.city}</p>
  <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", lineHeight: "1.4", color: "#333" }}>
    {painter.bio}
  </p>
</div>

{/* Gallery Section */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", // smaller card width
    gap: "1rem",
  }}
>
  {painter.gallery?.length > 0 ? (
    painter.gallery.map((img, index) => (
      <div
        key={index}
        style={{
          backgroundColor: "#fff",
          borderRadius: "0.75rem",
          boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
          overflow: "hidden",
          transition: "transform 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <img
          src={img.image}
          alt={img.description || "Project image"}
          style={{
            width: "100%",
            height: "150px", // reduced height
            objectFit: "cover",
          }}
        />
        <div style={{ padding: "0.5rem" }}>
          <p style={{ fontSize: "0.8rem", color: "#444", lineHeight: "1.3" }}>
            {img.description || "No description provided."}
          </p>
        </div>
      </div>
    ))
  ) : (
    <p style={{ color: "#777" }}>No projects uploaded yet.</p>
  )}
</div>


      {/* Booking Button */}
      <button
        onClick={handleBooking}
        style={{
          marginTop: "2rem",
          width: "100%",
          padding: "0.9rem",
          backgroundColor: colors.primary,
          color: "#fff",
          border: "none",
          borderRadius: "0.6rem",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "1rem",
        }}
      >
        Book Painter
      </button>
    </div>
  );
};

export default PainterDetails;
