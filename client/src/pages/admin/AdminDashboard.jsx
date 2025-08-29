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
    <div className="flex">
      <AdminSidebar />
      <div className="p-6 flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-2xl">{stats.users}</p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Painters</h2>
            <p className="text-2xl">{stats.painters}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Bookings</h2>
            <p className="text-2xl">{stats.bookings}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
