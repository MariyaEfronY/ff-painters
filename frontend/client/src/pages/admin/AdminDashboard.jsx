import React, { useEffect, useState } from "react";
import adminAPI, { adminLogout } from "../../utils/adminApi";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, painters: 0, bookings: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await adminAPI.get("/stats");
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  // ✅ handle logout
  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="p-6 flex-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold flex items-center gap-2">
            📊 Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg shadow hover:bg-red-600 transition"
          >
            🚪 Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              👤 Total Users
            </h2>
            <p className="text-4xl font-bold mt-2">{stats.users}</p>
          </div>

          <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-green-400 to-green-600 text-white">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              🎨 Total Painters
            </h2>
            <p className="text-4xl font-bold mt-2">{stats.painters}</p>
          </div>

          <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              📅 Total Bookings
            </h2>
            <p className="text-4xl font-bold mt-2">{stats.bookings}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
