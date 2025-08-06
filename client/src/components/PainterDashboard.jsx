import React, { useEffect, useState } from 'react';
import API from '../utils/axios';
import PainterEditForm from '../components/PainterEditForm';

const PainterDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPainter = async () => {
    try {
      setLoading(true);
      const res = await API.get('/painter/profile');
      setProfile(res.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      alert(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPainter();
  }, []);

  const profileImageUrl = profile?.profileImage
    ? `http://localhost:5000${profile.profileImage}`
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
        {profile.specification?.length
          ? profile.specification.join(', ')
          : 'None'}
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

      <hr style={{ margin: '30px 0' }} />

      <h3>Edit Your Profile</h3>

      <PainterEditForm painterId={profile._id} onProfileUpdated={fetchPainter} />
    </div>
  );
};

export default PainterDashboard;
