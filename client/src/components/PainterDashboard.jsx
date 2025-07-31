import React, { useEffect, useState } from 'react';
import EditProfile from './EditProfile';
import UploadProfileImage from './UploadProfileImage';
import GalleryUploader from './GalleryUploader';
import GalleryDisplay from './GalleryDisplay';
import PainterBookings from './PainterBookings';
import LogoutButton from './LogoutButton';
import axios from 'axios';

const PainterDashboard = () => {
  const [painter, setPainter] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // For real-time preview

  useEffect(() => {
    const fetchPainter = async () => {
      const token = localStorage.getItem('painterToken');
      if (!token) {
        console.log("No token found");
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/painter/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPainter(res.data);
      } catch (err) {
        console.error("Failed to fetch painter profile:", err.response?.data || err.message);
      }
    };

    fetchPainter();
  }, []);

  const handleImagePreview = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  if (!painter) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {painter.name}</h2>

      <div style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        marginBottom: '30px',
      }}>
        <img
          src={`http://localhost:5000/uploads/${painter.profileImage}`}
          alt="Profile"
          width="150"
          height="150"
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid #333',
          }}
        />
        <div>
          <p><strong>Name:</strong> {painter.name}</p>
          <p><strong>Email:</strong> {painter.email}</p>
        </div>
      </div>

      <UploadProfileImage painterId={painter._id} onPreview={handleImagePreview} />
      <EditProfile painter={painter} />
      <GalleryUploader painterId={painter._id} />
      <GalleryDisplay painterId={painter._id} />
      <PainterBookings painterId={painter._id} />
      <LogoutButton />
    </div>
  );
};

export default PainterDashboard;
