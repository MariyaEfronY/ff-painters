import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaintersList = () => {
  const [painters, setPainters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchPainters = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/painters/main");
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
        <div key={p._id} className="shadow-lg rounded-xl p-4 bg-white">
          <img
            src={`/uploads/profileImages/${p.profileImage}`}
            alt={p.name}
            className="w-32 h-32 rounded-full mx-auto object-cover"
          />
          <h2 className="text-xl font-bold mt-2">{p.name}</h2>
          <p className="text-gray-600">{p.city}</p>
          <p className="text-sm mt-2">{p.bio}</p>

          {/* Gallery preview */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {p.galleryPreview?.map((img) => (
              <img
                key={img._id}
                src={img.image}
                alt={img.description}
                className="w-full h-24 object-cover rounded"
              />
            ))}
          </div>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4 w-full"
            onClick={() => navigate(`/painters/${p._id}`)}
          >
            View Profile & Book
          </button>
        </div>
      ))}
    </div>
  );
};

export default PaintersList;
