import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) {
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/users/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const profileImageUrl = profile?.profileImage
    ? `http://localhost:5000/uploads/profileImages/${profile.profileImage}`
    : null;

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Unable to load profile. Please login again.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {profile.name}</h2>
      <p>Email: {profile.email || "N/A"}</p>
      <p>Bio: {profile.bio || "N/A"}</p>

      {profileImageUrl ? (
        <img
          src={profileImageUrl}
          alt="Profile"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #ddd",
            marginTop: "10px",
          }}
        />
      ) : (
        <p>No profile image uploaded.</p>
      )}

      <button onClick={fetchUserProfile} style={{ marginTop: "10px" }}>
        🔄 Refresh Profile
      </button>

      <br />

      <button
        style={{
          marginTop: "10px",
          backgroundColor: "#007bff",
          color: "white",
          padding: "8px 12px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/user/edit-profile")}
      >
        ✏️ Edit Profile
      </button>
    </div>
  );
};

export default UserDashboard;
