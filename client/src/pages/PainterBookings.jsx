import React, { useEffect, useState } from "react";
import axios from "axios";

const PainterBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("painterToken"); // ✅ must exist after login
      if (!token) {
        console.error("Painter token not found");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/painter/bookings/me",
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token
          },
        }
      );

      setBookings(response.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc", paddingBottom: "5px" }}>
              <p><strong>User:</strong> {booking.userName}</p>
              <p><strong>Email:</strong> {booking.userEmail}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleString()}</p>
              <p><strong>Message:</strong> {booking.message}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PainterBookings;
