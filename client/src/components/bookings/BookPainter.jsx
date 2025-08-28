import React, { useState } from "react";
import axios from "axios";

const BookPainter = ({ customerId, painterId }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = async () => {
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

  return (
    <div>
      <h3>Book Painter</h3>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default BookPainter;
