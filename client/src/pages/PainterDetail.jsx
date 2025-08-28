// PainterDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PainterDetails = () => {
  const { id } = useParams();
  const [painter, setPainter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPainter = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/painter/${id}`);
        setPainter(res.data);
      } catch (err) {
        console.error("❌ Failed to load painter:", err.message);
      }
    };
    fetchPainter();
  }, [id]);

  if (!painter) return <p className="text-center mt-10">Loading...</p>;

  // ✅ Booking handler
  const handleBooking = () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      // save the intended path
      localStorage.setItem("redirectAfterLogin", `/book/${painter._id}`);
      toast.info("Please signup/login to continue booking");
      navigate("/user/signup"); // send to signup first
    } else {
      navigate(`/book/${painter._id}`);
    }
  };

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

      <h2 className="text-xl font-semibold mt-6">Projects</h2>
      <div className="grid grid-cols-2 gap-3 mt-3">
        {painter.gallery?.length > 0 ? (
          painter.gallery.map((img, index) => (
            <div key={index} className="bg-white shadow rounded p-2">
              <img
                src={`http://localhost:5000${img.image}`}
                alt={img.description || "Project image"}
                style={{ width: "100%", borderRadius: "5px" }}
              />
              <p className="text-sm text-gray-600 mt-1">{img.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No projects uploaded yet.</p>
        )}
      </div>

      {/* Booking Button */}
      <button
        onClick={handleBooking}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full"
      >
        Book Painter
      </button>
    </div>
  );
};

export default PainterDetails;
