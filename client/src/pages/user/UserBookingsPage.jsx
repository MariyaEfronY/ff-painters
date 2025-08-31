import React, { useEffect, useState } from "react";
import axios from "axios";

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:5000/api/bookings/my-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  // Function to get color for status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "#facc15"; // Yellow
      case "approved":
        return "#22c55e"; // Green
      case "rejected":
        return "#ef4444"; // Red
      default:
        return "#6b7280"; // Gray for unknown
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "'Poppins', sans-serif" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1.5rem", textAlign: "center" }}>
        📝 My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>No bookings found.</p>
      ) : (
        bookings.map((b) => (
          <div
            key={b._id}
            style={{
              border: "1px solid #e5e7eb",
              borderLeft: `6px solid ${getStatusColor(b.status)}`,
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "0.75rem",
              backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            <p><strong>Painter:</strong> {b.painterId?.name}</p>
            <p><strong>Date:</strong> {b.date}</p>
            <p><strong>Time:</strong> {b.time}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span style={{ color: getStatusColor(b.status), fontWeight: 600 }}>
                {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default UserBookingsPage;
