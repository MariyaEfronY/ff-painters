import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PainterDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date()); // ⏰ clock
  const navigate = useNavigate();

  // ✅ Fetch Painter Profile
  const fetchPainter = async () => {
    try {
      setLoading(true); // ensure loading state when refreshing
      const token = localStorage.getItem("painterToken");

      const response = await axios.get(
        "http://localhost:5000/api/painter/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPainter();

    // ⏰ Update current time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const profileImageUrl = profile?.profileImage
    ? `http://localhost:5000/uploads/profileImages/${profile.profileImage}`
    : null;

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Unable to load profile.</p>;

  return (
    <div style={{ padding: "20px", position: "relative" }}>
      {/* ⏰ Current Time (top right corner) */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
          fontWeight: "bold",
          fontSize: "14px",
          color: "#555",
        }}
      >
        {currentTime.toLocaleTimeString()}
      </div>

      <h2>Welcome, {profile.name}</h2>
      <p>Email: {profile.email || "N/A"}</p>
      <p>Phone: {profile.phoneNumber || "N/A"}</p>
      <p>Experience: {profile.workExperience || "N/A"} years</p>
      <p>City: {profile.city || "N/A"}</p>
      <p>Bio: {profile.bio || "N/A"}</p>
      <p>
        Specification:{" "}
        {profile.specification?.length
          ? profile.specification.join(", ")
          : "None"}
      </p>

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

      {/* ✅ Refresh Button (fixed) */}
      <button
        onClick={fetchPainter}
        style={{
          marginTop: "10px",
          backgroundColor: "#28a745",
          color: "white",
          padding: "8px 12px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        🔄 Refresh Profile
      </button>

      <br />

      {/* ✅ Edit Profile Button */}
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
        onClick={() => navigate("/edit-profile")}
      >
        ✏️ Edit Profile
      </button>
    </div>
  );
};

export default PainterDashboard;
