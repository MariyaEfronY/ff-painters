import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BookingPage = () => {
  const { id } = useParams(); // painterId from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you store logged-in user in localStorage
      const customerId = localStorage.getItem("userId"); 
      if (!customerId) {
        toast.error("You must be logged in to book!");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/bookings", {
        customerId,
        painterId: id,
        date: form.date,
        time: form.time,
      });

      toast.success("Booking created successfully!");
      navigate("/user/bookings"); // redirect to user bookings page
    } catch (error) {
      console.error(error);
      toast.error("Failed to create booking");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Book This Painter</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
