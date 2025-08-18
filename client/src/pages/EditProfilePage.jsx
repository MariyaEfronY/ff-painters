// src/pages/EditProfilePage.jsx
import React, { useEffect, useState } from "react";
import PainterEditForm from "../components/PainterEditForm";

const EditProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("painterToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/painter/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [token]);

  if (!profile) return <p>Loading...</p>;

  return (
    <PainterEditForm
      painterId={profile._id}
      initialData={profile}
      onProfileUpdated={() => (window.location.href = "/dashboard")}
    />
  );
};

export default EditProfilePage;
