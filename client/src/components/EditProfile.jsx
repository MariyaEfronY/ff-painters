import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/painter/profile', {
          params: { id: localStorage.getItem('painterId') },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h3>Edit Profile</h3>
      {profile ? (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          {/* add more fields as needed */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default EditProfile;
