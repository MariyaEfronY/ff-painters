import React, { useEffect, useState } from "react";
import axios from "axios";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("userToken"));

  useEffect(() => {
    if (!loggedInUser?.token) return;

    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/bookings/user/${loggedInUser._id}`,
          {
            headers: { Authorization: `Bearer ${loggedInUser.token}` },
          }
        );
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      }
    };

    fetchBookings();
  }, [loggedInUser]);

  if (!bookings.length) return <p>No bookings found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Painter Bookings</h2>
      <ul>
        {bookings.map((b) => (
          <li key={b._id} style={{ marginBottom: "10px" }}>
            <p>
              <strong>Painter:</strong> {b.painterName}
            </p>
            <p>
              <strong>Date:</strong> {new Date(b.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Message:</strong> {b.message}
            </p>
            <p>
              <strong>Status:</strong> {b.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBookings;
