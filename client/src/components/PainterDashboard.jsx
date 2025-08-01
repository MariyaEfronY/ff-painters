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

  // 🟢 Fetch painter profile securely
  useEffect(() => {
    const fetchPainter = async () => {
      const token = localStorage.getItem('painterToken'); // Make sure this matches what you stored during login

      if (!token) {
        console.error('❌ No token found in localStorage');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/painter/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch profile');
        }

        console.log("✅ Painter profile fetched:", data);
        setPainter(data);
      } catch (err) {
        console.error("❌ Error fetching painter profile:", err.message);
      }
    };

    fetchPainter();
  }, []);

  const handleImagePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
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
