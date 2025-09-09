import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { label: "🏠 Dashboard", path: "/" },
  { label: "✏️ Edit Profile", path: "/edit-profile" },
  { label: "📸 Gallery", path: "/gallery" },
  { label: "📋 View Bookings", path: "/painter/bookings" },
  { label: "🚪 Logout", path: "/logout" },
];

const PainterDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  const fetchPainter = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("painterToken");
      const response = await axios.get(
        "https://painter-backend-inky.vercel.app/api/painter/profile",
        { headers: { Authorization: `Bearer ${token}` } }
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
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNavigation = (path) => {
    if (path === "/logout") {
      const token = localStorage.getItem("painterToken");
      if (token) {
        axios.post("https://painter-backend-inky.vercel.app/api/painter/logout", {}, {
          headers: { Authorization: `Bearer ${token}` },
        }).catch((err) => console.error("Logout error:", err.message));
      }
      localStorage.removeItem("painterToken");
      navigate("/");
      return;
    }
    navigate(path);
  };

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Unable to load profile.</p>;

const profileImageUrl = profile?.profileImage || null;



  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-pink-500 text-white flex flex-col justify-between shadow-lg">
        <div>
          <h2 className="text-2xl font-bold p-6 text-center">🎨 Painter Panel</h2>
          <nav className="flex flex-col gap-2 p-4">
            {sidebarItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavigation(item.path)}
                className="text-left px-4 py-2 rounded hover:bg-pink-600 transition font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6 text-center text-gray-100 text-sm">
          ⏰ {currentTime.toLocaleTimeString()}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {profile.name}!</h1>

        {/* Profile Card */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Image */}
          
{profileImageUrl ? (
  <img
  src={profileImageUrl}  // ✅ will now be Cloudinary URL
  alt="Profile"
  className="w-32 h-32 rounded-full border-2 border-gray-200 object-cover"
/>
) : (
  <div className="w-32 h-32 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400">
    No Image
  </div>
)}


          {/* Profile Info */}
          <div className="flex-1 space-y-2">
            <p>📧 <strong>Email:</strong> {profile.email || "N/A"}</p>
            <p>📞 <strong>Phone:</strong> {profile.phoneNumber || "N/A"}</p>
            <p>🛠️ <strong>Experience:</strong> {profile.workExperience || "N/A"} years</p>
            <p>🏙️ <strong>City:</strong> {profile.city || "N/A"}</p>
            <p>📝 <strong>Bio:</strong> {profile.bio || "N/A"}</p>
            <p>🎯 <strong>Specification:</strong> {profile.specification?.length ? profile.specification.join(", ") : "None"}</p>

            {/* Refresh Button */}
            <button
              onClick={fetchPainter}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition mt-2"
            >
              🔄 Refresh Profile
            </button>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-500 transition"
            onClick={() => navigate("/edit-profile")}
          >
            ✏️ Edit Profile
          </button>
          <button
            className="bg-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-purple-500 transition"
            onClick={() => navigate("/gallery")}
          >
            📸 Gallery
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-orange-400 transition"
            onClick={() => navigate("/painter/bookings")}
          >
            📋 View Bookings
          </button>
        </div>
      </main>
    </div>
  );
};

export default PainterDashboard;
