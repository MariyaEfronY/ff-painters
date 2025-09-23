// src/components/SearchPainter.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import API from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const SearchPainter = ({ colors }) => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchedPainter, setSearchedPainter] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const trimmedPhone = phone.trim();
    if (!trimmedPhone || !/^\d{10}$/.test(trimmedPhone)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      setLoading(true);
      setSearchedPainter(null);
      setNotFound(false);

      const { data } = await API.get("/painter/search", {
        params: { phoneNumber: trimmedPhone },
      });

      if (data && data._id) {
        setSearchedPainter(data);
        navigate(`/painter/${data._id}`); // ✅ redirect immediately
      } else {
        setNotFound(true);
      }
    } catch (err) {
      console.error("❌ Search failed:", err);
      if (err.response && err.response.status === 404) setNotFound(true);
      setSearchedPainter(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔍 Search Section */}
      <section
        style={{
          padding: "2.5rem 2rem",
          backgroundColor: colors.cardBg,
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            display: "flex",
            gap: "1rem",
          }}
        >
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter mobile number..."
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #d1d5db",
              outline: "none",
              color: colors.textDark,
            }}
          />
          <button
            style={{
              backgroundColor: colors.primary,
              color: "#fff",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </section>

      {/* ❌ No painter found */}
      {notFound && (
        <section style={{ padding: "2rem" }}>
          <h3
            style={{
              textAlign: "center",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: colors.textMuted,
            }}
          >
            No painter found with this phone number
          </h3>
        </section>
      )}
    </>
  );
};

export default SearchPainter;
