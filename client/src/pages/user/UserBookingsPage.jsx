import React, { useEffect, useState } from "react";
import axios from "axios";

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) return;

      const res = await axios.get("http://localhost:5000/api/bookings/my-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    };
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>
      {bookings.map((b) => (
        <div key={b._id} className="border p-4 mb-2 rounded">
          <p><strong>Painter:</strong> {b.painterId?.name}</p>
          <p><strong>Date:</strong> {b.date}</p>
          <p><strong>Time:</strong> {b.time}</p>
          <p><strong>Status:</strong> {b.status}</p>
        </div>
      ))}
    </div>
  );
};

export default UserBookingsPage;
