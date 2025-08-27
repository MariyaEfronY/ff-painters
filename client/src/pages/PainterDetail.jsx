import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PainterDetail = () => {
  const { id } = useParams();
  const [painter, setPainter] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [date, setDate] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/painters/${id}`)
      .then((res) => setPainter(res.data));

    axios.get(`http://localhost:5000/api/painters/${id}/gallery`)
      .then((res) => setGallery(res.data));
  }, [id]);

  const handleBooking = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/user/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/bookings",
        { painterId: id, date, projectDetails },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Booking request sent!");
    } catch (err) {
      alert("Booking failed: " + err.response.data.message);
    }
  };

  if (!painter) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{painter.name}</h1>
      <p>{painter.city} | {painter.specification.join(", ")}</p>
      <p className="mt-2">{painter.bio}</p>

      {/* Gallery */}
      <h2 className="text-2xl mt-6">Project Gallery</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {gallery.map((img) => (
          <div key={img._id}>
            <img
              src={img.image}
              alt={img.description}
              className="w-full h-40 object-cover rounded"
            />
            <p className="text-sm mt-1">{img.description}</p>
          </div>
        ))}
      </div>

      {/* Booking */}
      <div className="mt-6 border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Book This Painter</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Project details..."
          value={projectDetails}
          onChange={(e) => setProjectDetails(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={handleBooking}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default PainterDetail;
