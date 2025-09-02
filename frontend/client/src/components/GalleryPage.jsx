import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newDesc, setNewDesc] = useState("");
  const navigate = useNavigate();

  const fetchGallery = async () => {
    try {
      const token = localStorage.getItem("painterToken");
      const { data } = await axios.get("http://localhost:5000/api/painter/gallery", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGallery(data.gallery || []);
    } catch (err) {
      console.error("Error fetching gallery:", err);
      toast.error("❌ Failed to fetch gallery", { position: "top-right" });
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("painterToken");
      await axios.delete(`http://localhost:5000/api/painter/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGallery(gallery.filter((img) => img._id !== id));
      toast.success("🗑️ Image deleted successfully!", { position: "top-right" });
    } catch (err) {
      console.error("❌ Delete error:", err.response?.data || err.message);
      toast.error("❌ Failed to delete image", { position: "top-right" });
    }
  };

  const handleEdit = (id, currentDesc) => {
    setEditId(id);
    setNewDesc(currentDesc);
  };

  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem("painterToken");
      await axios.put(
        `http://localhost:5000/api/painter/gallery/${id}`,
        { description: newDesc },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditId(null);
      fetchGallery();
      toast.success("💾 Description updated successfully!", { position: "top-right" });
    } catch (err) {
      console.error("Update error:", err);
      toast.error("❌ Failed to update description", { position: "top-right" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <ToastContainer /> {/* Toast notifications container */}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">🎨 My Gallery</h2>
        <button
          onClick={() => navigate("/upload-gallery")}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition font-medium"
        >
          ➕ Add Image
        </button>
      </div>

      {/* Gallery Grid */}
      {gallery.length === 0 ? (
        <p className="text-gray-500 text-center mt-12">No images uploaded yet. 🖼️</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {gallery.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              <img
                src={`http://localhost:5000${item.image}`}
                alt="Gallery"
                className="w-full h-48 object-cover"
              />

              <div className="p-4 flex-1 flex flex-col justify-between">
                {editId === item._id ? (
                  <div className="flex flex-col gap-2">
                    <textarea
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      placeholder="Update description..."
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(item._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-500 transition"
                      >
                        💾 Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-300 transition"
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-700 mb-2">🖊️ {item.description || "No description"}</p>
                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={() => handleEdit(item._id, item.description)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-500 transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-500 transition"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
