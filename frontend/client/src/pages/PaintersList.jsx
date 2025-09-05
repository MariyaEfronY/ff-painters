import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaintersList = () => {
  const [painters, setPainters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPainters = async () => {
      try {
        const res = await axios.get("https://painter-backend-inky.vercel.app/api/painter/main");
        setPainters(res.data);
      } catch (err) {
        console.error("❌ Failed to load painters:", err.message);
      }
    };
    fetchPainters();
  }, []);

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      {painters.map((p) => (
        <div key={p._id} className="shadow-lg rounded-xl p-4 bg-white text-center">
          <img
            src={`https://painter-backend-inky.vercel.app/uploads/profileImages/${p.profileImage}`}
            alt={p.name}
            className="rounded-full object-cover mx-auto border-4 border-gray-200 shadow-md"
            style={{ width: "160px", height: "160px", maxWidth: "200px", maxHeight: "200px" }}
          />

          <h2 className="text-xl font-bold mt-2">Name: {p.name}</h2>
          <p className="text-gray-600">City: {p.city}</p>
          <p className="text-sm mt-2 line-clamp-2">Bio: {p.bio}</p>

          {/* 👉 Button to view projects */}
          <button
            onClick={() => navigate(`/painters/${p._id}`)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View Projects
          </button>
        </div>
      ))}
    </div>
  );
};

export default PaintersList;
