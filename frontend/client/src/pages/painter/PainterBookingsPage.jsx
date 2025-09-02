import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Status color mapping
const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  unknown: "bg-gray-100 text-gray-700",
};

const PainterBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

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

  const handleStatusChange = async (bookingId, status) => {
    try {
      const token = localStorage.getItem("painterToken");
      await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchBookings();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Current Date & Time */}
      <div className="fixed top-4 right-4 text-gray-600 font-medium tracking-wide text-sm">
        {currentTime.toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}{" "}
        - {currentTime.toLocaleTimeString()}
      </div>

      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">My Painter Bookings</h1>
        <p className="text-gray-500 mt-1">Keep track of all your appointments</p>
      </header>

      {/* Bookings */}
      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center mt-12 text-lg">No bookings available.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row justify-between items-start md:items-center transition hover:shadow-lg"
            >
              {/* Booking Info */}
              <div className="flex-1 mb-4 md:mb-0">
                <p className="text-gray-800 font-semibold text-lg">
                  {b.customerId?.name}{" "}
                  <span className="text-gray-400 text-sm">({b.customerId?.email})</span>
                </p>
                <p className="text-gray-600 mt-1">
                  <strong>Date:</strong> {b.date}
                </p>
                <p className="text-gray-600 mt-1">
                  <strong>Time:</strong> {b.time}
                </p>
                {/* Status Badge */}
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${statusColors[b.status]}`}
                >
                  {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                </span>
              </div>

              {/* Action Buttons */}
              {b.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(b._id, "approved")}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition font-medium"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(b._id, "rejected")}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition font-medium"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PainterBookingsPage;
