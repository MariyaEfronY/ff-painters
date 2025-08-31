import React, { useState } from "react";
import axios from "axios";

const BookPainter = ({ customerId, painterId }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = async () => {
    if (!date || !time) {
      alert("Please select both date and time!");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/bookings", {
        customerId,
        painterId,
        date,
        time,
      });
      alert(res.data.message);
    } catch (error) {
      console.error(error);
      alert("Failed to book painter");
    }
  };

  const colors = {
    primary: "#ec4899",
    secondary: "#f472b6",
    background: "#f3f4f6",
    textDark: "#111827",
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: "1rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1.5rem" }}>
        🖌️ Book Painter
      </h3>

      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="booking-date"
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}
        >
          📅 Select Date
        </label>
        <input
          type="date"
          id="booking-date"
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

      <div style={{ marginBottom: "1.5rem" }}>
        <label
          htmlFor="booking-time"
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}
        >
          ⏰ Select Time
        </label>
        <input
          type="time"
          id="booking-time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
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
        ✅ Book Now
      </button>
    </div>
  );
};

export default BookPainter;
