import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = ({ customerId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bookings/customer/${customerId}`)
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, [customerId]);

  return (
    <div>
      <h3>My Bookings</h3>
      {bookings.map((b) => (
        <div key={b._id}>
          <p>Painter: {b.painterId?.name}</p>
          <p>Date: {b.date} at {b.time}</p>
          <p>Status: {b.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
