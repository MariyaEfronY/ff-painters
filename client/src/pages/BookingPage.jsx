import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookingPage = () => {
  const { id: painterId } = useParams();
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmPm] = useState("AM");
  const navigate = useNavigate();

  const colors = {
    primary: "#ec4899",
    secondary: "#f472b6",
    background: "#f3f4f6",
    textDark: "#111827",
    cardBg: "#fff",
    textMuted: "#6b7280",
  };

  const handleBooking = async () => {
    if (!date || !hour || !minute) {
      toast.error("Please select date and time!");
      return;
    }

    // Convert to 24-hour format
    let hour24 = parseInt(hour);
    if (ampm === "PM" && hour24 !== 12) hour24 += 12;
    if (ampm === "AM" && hour24 === 12) hour24 = 0;
    const time = `${hour24.toString().padStart(2, "0")}:${minute.padStart(2, "0")}`;

    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        toast.error("You must be logged in to book!");
        navigate("/user/login");
        return;
      }

      const res = await axios.post(
        "https://painter-backend.netlify.app/api/bookings",
        { painterId, date, time },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("✅ Booking confirmed!");
      navigate("/user/bookings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  // Generate hour and minute options
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "3rem auto",
        padding: "2rem",
        backgroundColor: colors.cardBg,
        borderRadius: "1rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1.5rem", textAlign: "center" }}>
        🖌️ Book Painter
      </h2>

      {/* Date */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, color: colors.textDark }}>
          📅 Select Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "0.5rem",
            border: "1px solid #d1d5db",
            outline: "none",
            fontSize: "1rem",
          }}
        />
      </div>

      {/* Time */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, color: colors.textDark }}>
          ⏰ Select Time (AM/PM)
        </label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <select
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #d1d5db",
              outline: "none",
            }}
          >
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          <select
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #d1d5db",
              outline: "none",
            }}
          >
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            value={ampm}
            onChange={(e) => setAmPm(e.target.value)}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #d1d5db",
              outline: "none",
            }}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleBooking}
        style={{
          width: "100%",
          padding: "0.75rem",
          fontSize: "1rem",
          fontWeight: 600,
          color: "#fff",
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
          border: "none",
          borderRadius: "0.75rem",
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        ✅ Confirm Booking
      </button>
    </div>
  );
};

export default BookingPage;
