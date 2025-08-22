import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ import navigation

const PainterDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ hook to redirect

  const fetchPainter = async () => {
  try {
    const token = localStorage.getItem('painterToken');
    const response = await axios.get("http://localhost:5000/api/painter/profile", {
  headers: { Authorization: `Bearer ${token}` },
});



    setProfile(response.data);
  } catch (error) {
    console.error('Error fetching profile:', error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchPainter();
  }, []);

  const profileImageUrl = profile?.profileImage
    ? `http://localhost:5000/uploads/profileImages/${profile.profileImage}`
    : null;

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Unable to load profile.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {profile.name}</h2>
      <p>Email: {profile.email || 'N/A'}</p>
      <p>Phone: {profile.phoneNumber || 'N/A'}</p>
      <p>Experience: {profile.workExperience || 'N/A'} years</p>
      <p>City: {profile.city || 'N/A'}</p>
      <p>Bio: {profile.bio || 'N/A'}</p>
      <p>
        Specification:{' '}
        {profile.specification?.length ? profile.specification.join(', ') : 'None'}
      </p>

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
            marginTop: '10px',
          }}
        />
      ) : (
        <p>No profile image uploaded.</p>
      )}

      <button onClick={fetchPainter} style={{ marginTop: '10px' }}>
        🔄 Refresh Profile
      </button>

      <br />

      {/* ✅ Edit Profile Button */}
       <button
        style={{
          marginTop: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          padding: '8px 12px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/edit-profile')} // ✅ navigate to edit page
      >
        ✏️ Edit Profile
      </button>
    </div>
  );
};

export default PainterDashboard;
