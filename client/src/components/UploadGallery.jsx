import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadGallery = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.warn("⚠️ Please select an image.", { position: "top-right" });
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    try {
      setLoading(true);
      const token = localStorage.getItem("painterToken");
      if (!token) {
        toast.error("Unauthorized: No token found ❌", { position: "top-right" });
        setLoading(false);
        return;
      }

      const res = await axios.post(
        "https://painter-backend-inky.vercel.app/api/painter/gallery",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        toast.success("✅ Gallery image uploaded successfully!", { position: "top-right" });
        navigate("/gallery");
      }
    } catch (error) {
      console.error("❌ Upload error:", error.response?.data || error.message);
      toast.error("Failed to upload image ❌", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center font-sans">
      <ToastContainer /> {/* Toast container */}

      {/* Header */}
      <div className="w-full max-w-md mb-8">
        <div className="bg-purple-600 text-white rounded-xl shadow-md p-6 text-center">
          <h1 className="text-3xl font-bold mb-2">📸 Upload to Gallery</h1>
          <p className="text-purple-200">Add new images and showcase your amazing work! 🎨</p>
        </div>
      </div>

      {/* Upload Form Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">🖼️ Select Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">📝 Description</label>
          <textarea
            placeholder="Enter a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            rows={4}
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-2 bg-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-purple-500 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "⏳ Uploading..." : "📤 Upload"}
        </button>
      </div>

      <div className="w-full max-w-md mt-6 p-4 bg-purple-100 rounded-lg text-purple-800 text-sm text-center">
        💡 Tip: Add high-quality images and catchy descriptions to attract more clients! 🌟
      </div>
    </div>
  );
};

export default UploadGallery;
