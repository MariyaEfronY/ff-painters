// src/pages/EditProfilePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PainterEditForm from '../components/PainterEditForm';

const EditProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const fetchPainter = async () => {
    try {
      const token = localStorage.getItem('painterToken');
      const response = await axios.get('http://localhost:5000/api/painter/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchPainter();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Your Profile</h2>
      {/* Pass profile data so form is pre-filled */}
      <PainterEditForm
        painterId={profile._id}
        initialData={profile} // ✅ New prop
        onProfileUpdated={() => navigate('/painter/dashboard')}
      />
    </div>
  );
};

export default EditProfilePage;
