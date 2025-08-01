import React, { useEffect, useState } from 'react';
import API from "../utils/axios";


const PainterDashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchPainter = async () => {
      try {
        const res = await API.get('/painter/profile');
        setProfile(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        alert(err.response?.data?.message || 'Failed to fetch profile');
      }
    };

    fetchPainter();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Welcome, {profile.name}</h2>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default PainterDashboard;
