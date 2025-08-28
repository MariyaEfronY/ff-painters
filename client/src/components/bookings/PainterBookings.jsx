import React, { useEffect, useState } from "react";
import axios from "axios";

const PainterBookings = ({ painterId }) => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await axios.get(`http://localhost:5000/api/bookings/painter/${painterId}`);
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, [painterId]);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/bookings/${id}/status`, { status });
    fetchBookings();
  };

  return (
    <div>
      <h3>Bookings Requests</h3>
      {bookings.map((b) => (
        <div key={b._id}>
          <p>Customer: {b.customerId?.name}</p>
          <p>Date: {b.date} at {b.time}</p>
          <p>Status: {b.status}</p>
          {b.status === "pending" && (
            <>
              <button onClick={() => updateStatus(b._id, "approved")}>Approve</button>
              <button onClick={() => updateStatus(b._id, "rejected")}>Reject</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PainterBookings;
