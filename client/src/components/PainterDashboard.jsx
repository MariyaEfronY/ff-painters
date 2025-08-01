import React, { useEffect, useState } from "react";
import axios from "axios";

const PainterDashboard = () => {
  const [painter, setPainter] = useState(null);

 // PainterDashboard.jsx
useEffect(() => {
  const fetchPainter = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/painter/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPainter(res.data);
    } catch (err) {
      console.error("❌ Error from server:", err?.response?.data?.message || err.message);
    }
  };

  fetchPainter();
}, []);


  return (
    <div>
      <h2>Painter Dashboard</h2>
      {painter ? (
        <div>
          <p>Name: {painter.name}</p>
          <p>Email: {painter.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PainterDashboard;
