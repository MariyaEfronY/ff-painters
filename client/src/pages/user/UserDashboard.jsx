import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get("http://localhost:5000/api/users/dashboard", {
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
    <div style={{ textAlign: "center" }}>
      <h1>Welcome {profile.name}</h1>
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phone || "N/A"}</p>
      <p>City: {profile.city || "N/A"}</p>
      <p>Bio: {profile.bio || "No bio provided"}</p>

      {profile.profileImage && (
        <img
          src={`http://localhost:5000${profile.profileImage}`}
          alt="Profile"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "10px"
          }}
        />
      )}

      <br />
      <button
        onClick={() => navigate("/user/edit-profile")}
        style={{
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default UserDashboard;
