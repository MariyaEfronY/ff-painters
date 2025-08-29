import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li><Link to="/admin/dashboard" className="hover:text-blue-400">Dashboard</Link></li>
        <li><Link to="/admin/users" className="hover:text-blue-400">Users</Link></li>
        <li><Link to="/admin/painters" className="hover:text-blue-400">Painters</Link></li>
        <li><Link to="/admin/bookings" className="hover:text-blue-400">Bookings</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
