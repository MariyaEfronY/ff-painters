import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newDesc, setNewDesc] = useState("");
  const navigate = useNavigate();

  // Fetch gallery images
  const fetchGallery = async () => {
    try {
      const token = localStorage.getItem("painterToken");
      const { data } = await axios.get("http://localhost:5000/api/painter/gallery", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGallery(data.gallery || []);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("painterToken");

    await axios.delete(`http://localhost:5000/api/painter/gallery/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Image deleted successfully!");
    setGallery(gallery.filter((img) => img._id !== id));
  } catch (err) {
    console.error("❌ Delete error:", err.response?.data || err.message);
  }
};



  // Handle Edit
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
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎨 My Gallery</h2>

      {/* Add Image Button */}
      <button
        onClick={() => navigate("/upload-gallery")}
        style={{
          marginBottom: "20px",
          backgroundColor: "#6f42c1",
          color: "white",
          padding: "8px 12px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ➕ Add Image
      </button>

      {/* Gallery Images */}
      {gallery.length === 0 ? (
        <p>No images uploaded yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "15px",
          }}
        >
          {gallery.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <img
                src={`http://localhost:5000${item.image}`}
                alt="Gallery"
                style={{ width: "100%", borderRadius: "5px" }}
              />

              {editId === item._id ? (
                <>
                  <textarea
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    style={{ width: "100%", marginTop: "5px" }}
                  />
                  <button
                    onClick={() => handleSave(item._id)}
                    style={{ marginTop: "5px", background: "green", color: "white", padding: "5px" }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    style={{ marginLeft: "5px", marginTop: "5px", background: "gray", color: "white", padding: "5px" }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p style={{ marginTop: "5px" }}>{item.description}</p>
                  <button
                    onClick={() => handleEdit(item._id, item.description)}
                    style={{ marginRight: "5px", background: "blue", color: "white", padding: "5px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{ background: "red", color: "white", padding: "5px" }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
