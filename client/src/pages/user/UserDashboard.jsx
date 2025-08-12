import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setProfile(data);
      } catch (err) {
        console.error("Unable to load profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>Unable to load profile. Please login again.</p>;

  return (
    <div>
      <h1>Welcome {profile.name}</h1>
      <p>{profile.bio}</p>
      {profile.profileImage && (
        <img
          src={`http://localhost:5000${profile.profileImage}`}
          alt="Profile"
          style={{ width: "150px", borderRadius: "50%" }}
        />
      )}
    </div>
  );
};

export default UserDashboard;
