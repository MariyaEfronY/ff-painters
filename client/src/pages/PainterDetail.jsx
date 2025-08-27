import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PainterDetails = () => {
  const { id } = useParams();
  const [painter, setPainter] = useState(null);
  const navigate = useNavigate();

 useEffect(() => {
  const fetchPainter = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/painter/${id}`);
      setPainter(res.data); // this includes gallery
    } catch (err) {
      console.error("❌ Failed to load painter:", err.message);
    }
  };
  fetchPainter();
}, [id]);


  if (!painter) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="text-center">
        <img
          src={`http://localhost:5000/uploads/profileImages/${painter.profileImage}`}
          alt={painter.name}
          className="rounded-full mx-auto border-4 border-gray-200 shadow-md object-cover"
          style={{ width: "180px", height: "180px" }}
        />
        <h1 className="text-2xl font-bold mt-4">Name: {painter.name}</h1>
        <p className="text-gray-600">City: {painter.city}</p>
        <p className="mt-2">Bio: {painter.bio}</p>
      </div>

      {/* Gallery Section */}
<h2 className="text-xl font-semibold mt-6">Projects</h2>
<div className="grid grid-cols-2 gap-3 mt-3">
  {painter.gallery?.map((img, index) => (
    <div key={index} className="bg-white shadow rounded p-2">
      <img
        src={`http://localhost:5000/uploads/galleryImages/${img.image}`}
        alt={img.description || "Project image"}
        className="w-full h-40 object-cover rounded"
      />
      <p className="text-sm text-gray-600 mt-1">{img.description}</p>
    </div>
  ))}
</div>





      {/* Booking Button */}
      <button
        onClick={() => navigate(`/book/${painter._id}`)}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full"
      >
        Book Painter
      </button>
    </div>
  );
};

export default PainterDetails;
