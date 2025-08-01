import React, { useEffect, useState } from 'react';
import API from '../utils/axios';

const PainterDashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchPainter = async () => {
      try {
        const res = await API.get('/painter/profile');
        console.log('✅ Response:', res.data); // Confirm here
        setProfile(res.data.painter); // ✅ direct set
      } catch (err) {
        console.error('Error fetching profile:', err);
        alert(err.response?.data?.message || 'Failed to fetch profile');
      }
    };

    fetchPainter();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  const profileImageUrl = profile.profileImage
    ? `http://localhost:5000/uploads/${profile.profileImage}`
    : null;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {profile.name}</h2>
      <p>Email: {profile.email}</p>

      {profileImageUrl ? (
        <img
          src={profileImageUrl}
          alt="Profile"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #ddd',
            marginTop: '10px'
          }}
        />
      ) : (
        <p>No profile image uploaded.</p>
      )}
    </div>
  );
};

export default PainterDashboard;
