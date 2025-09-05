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
        const res = await axios.get(`https://painter-backend.netlify.app/api/painter/${id}`);
        setPainter(res.data);
      } catch (err) {
        console.error("❌ Failed to load painter:", err.message);
      }
    };
    fetchPainter();
  }, [id]);

  if (!painter) return <p style={{ textAlign: "center", marginTop: "2.5rem", color: colors.textDark }}>Loading...</p>;

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
    <div style={{ padding: "1.5rem", maxWidth: "768px", margin: "0 auto", backgroundColor: colors.background, color: colors.textDark }}>
      <div style={{ textAlign: "center" }}>
        <img
          src={`https://painter-backend.netlify.app/uploads/profileImages/${painter.profileImage}`}
          alt={painter.name}
          style={{ width: "180px", height: "180px", borderRadius: "50%", margin: "0 auto", border: "4px solid #ddd", objectFit: "cover", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
        />
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "1rem" }}>Name: {painter.name}</h1>
        <p style={{ color: "#555" }}>City: {painter.city}</p>
        <p style={{ marginTop: "0.5rem" }}>Bio: {painter.bio}</p>
      </div>

      <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "1.5rem" }}>Projects</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.75rem", marginTop: "0.75rem" }}>
        {painter.gallery?.length > 0 ? (
          painter.gallery.map((img, index) => (
            <div key={index} style={{ backgroundColor: "#fff", padding: "0.5rem", borderRadius: "0.5rem", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
              <img
                src={`https://painter-backend.netlify.app${img.image}`}
                alt={img.description || "Project image"}
                style={{ width: "100%", borderRadius: "0.3rem" }}
              />
              <p style={{ fontSize: "0.75rem", color: "#555", marginTop: "0.25rem" }}>{img.description}</p>
            </div>
          ))
        ) : (
          <p style={{ color: "#777" }}>No projects uploaded yet.</p>
        )}
      </div>

      <button
        onClick={handleBooking}
        style={{
          marginTop: "1.5rem",
          width: "100%",
          padding: "0.75rem",
          backgroundColor: colors.primary,
          color: "#fff",
          borderRadius: "0.5rem",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Book Painter
      </button>
    </div>
  );
};

export default PainterDetails;
