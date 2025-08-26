import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadGallery = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle file input
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("⚠️ Please select an image.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    try {
      setLoading(true);

      // Grab token from localStorage
      const token = localStorage.getItem("painterToken");
      if (!token) {
        alert("Unauthorized: No token found ❌");
        setLoading(false);
        return;
      }

      // API request
      const res = await axios.post(
        "http://localhost:5000/api/painter/gallery",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        alert("✅ Gallery image uploaded successfully!");
        navigate("/gallery"); 
      }
    } catch (error) {
      console.error("❌ Upload error:", error.response?.data || error.message);
      alert("Failed to upload image ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📸 Upload to Gallery</h2>

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <br />

        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "300px", height: "80px", marginTop: "10px" }}
        />
        <br />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "10px",
            backgroundColor: "#6f42c1",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadGallery;
