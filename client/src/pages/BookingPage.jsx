import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookingPage = () => {
  const { id: painterId } = useParams();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        toast.error("You must be logged in to book!");
        navigate("/user/login");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        { painterId, date, time },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Booking confirmed!");
      navigate("/user/bookings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Book Painter</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button
        onClick={handleBooking}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingPage;
