import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const { id } = useParams(); // painter ID
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    date: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/painter/${id}/book`, form);
      alert("Booking sent!");
      navigate("/"); // go to homepage or painters list
    } catch (err) {
      console.error(err);
      alert("Failed to book painter.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Book Painter</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="userName"
          placeholder="Your Name"
          value={form.userName}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="userEmail"
          placeholder="Your Email"
          value={form.userEmail}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Book
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
