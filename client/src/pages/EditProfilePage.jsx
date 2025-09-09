// src/pages/EditProfilePage.jsx
import React, { useEffect, useState } from "react";
import PainterEditForm from "../components/PainterEditForm";

const EditProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("painterToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://painter-backend-inky.vercel.app/api/painter/profile", {
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

  if (!profile) return <p className="text-center mt-12 text-gray-500">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">✏️ Edit Your Profile</h1>
        <p className="text-gray-500 mb-6 text-center">
          Update your details and keep your profile up-to-date 🎨
        </p>

        {/* Profile Card Preview */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6 flex items-center gap-4">
          {profile.profileImage ? (
            <img
              src={`https://painter-backend-inky.vercel.app/uploads/profileImages/${profile.profileImage}`}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400">
              📷
            </div>
          )}
          <div>
            <p className="text-gray-800 font-semibold text-lg">{profile.name}</p>
            <p className="text-gray-500 text-sm">{profile.email}</p>
          </div>
        </div>

        {/* Edit Form */}
        <PainterEditForm
          painterId={profile._id}
          initialData={profile}
          onProfileUpdated={() => (window.location.href = "/dashboard")}
        />

        {/* Info Footer */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          🔒 All changes are secure and saved immediately after update.
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
