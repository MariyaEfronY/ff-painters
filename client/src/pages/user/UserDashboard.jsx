import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.token) return;

      try {
        const { data } = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        setProfile(data);
      } catch (err) {
        console.error("Unable to load profile", err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome {profile.name}</h1>
      <p>{profile.bio}</p>
      {profile.profileImage && (
        <img
          src={`http://localhost:5000/uploads/userprofileImages/${profile.profileImage}`}
          alt="Profile"
          style={{ width: "150px", borderRadius: "50%" }}
        />
      )}
    </div>
  );
};

export default UserDashboard;
