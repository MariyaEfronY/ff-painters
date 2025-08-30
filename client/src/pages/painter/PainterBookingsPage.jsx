import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PainterBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date()); // ⏰ Date + Time

  // Fetch painter bookings
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("painterToken");
      if (!token) return;

      const res = await axios.get(
        "http://localhost:5000/api/bookings/painter/bookings",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBookings(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch bookings");
    }
  };

  // Update booking status (approve/reject)
  const handleStatusChange = async (bookingId, status) => {
    try {
      const token = localStorage.getItem("painterToken");

      await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(`Booking ${status}`);
      fetchBookings(); // refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchBookings();

    // ⏰ update every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6">
      {/* ⏰ Date + Time in top-right */}
      <div
        className="fixed top-3 right-4 z-50 text-purple-700 font-semibold tracking-wide"
        style={{
          fontSize: "16px",
          fontFamily: "'Orbitron', sans-serif",
        }}
      >
        {currentTime.toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}{" "}
        - {currentTime.toLocaleTimeString()}
      </div>

      <h2 className="text-xl font-bold mb-4">My Painter Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div
            key={b._id}
            className="border p-4 mb-2 rounded shadow-sm flex justify-between items-center"
          >
            <div>
              <p>
                <strong>Customer:</strong> {b.customerId?.name} (
                {b.customerId?.email})
              </p>
              <p>
                <strong>Date:</strong> {b.date}
              </p>
              <p>
                <strong>Time:</strong> {b.time}
              </p>
              <p>
                <strong>Status:</strong> {b.status}
              </p>
            </div>
            {b.status === "pending" && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(b._id, "approved")}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(b._id, "rejected")}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PainterBookingsPage;
