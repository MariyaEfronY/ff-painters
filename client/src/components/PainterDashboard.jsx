import React, { useEffect, useState } from 'react';
import API from '../utils/axios';
import PainterEditForm from '../components/PainterEditForm';



const PainterDashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchPainter = async () => {
      try {
        const res = await API.get('/painter/profile');
        console.log("✅ Painter Response:", res.data);
        setProfile(res.data); 
      } catch (err) {
        console.error('Error fetching profile:', err);
        alert(err.response?.data?.message || 'Failed to fetch profile');
      }
    };

    fetchPainter();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  const profileImageUrl = profile.profileImage
    ? `http://localhost:5000${profile.profileImage}`
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

    <hr style={{ margin: '30px 0' }} />

    <h3>Edit Your Profile</h3>
    {/* ✅ Here’s the edit form with ID */}
    <PainterEditForm painterId={profile._id} />
  </div>
);

};

export default PainterDashboard;
