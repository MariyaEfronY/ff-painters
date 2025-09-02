import React, { useEffect, useState } from "react";
import adminAPI from "../../utils/adminApi";
import AdminSidebar from "../../components/admin/AdminSidebar";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await adminAPI.get("/users");
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("🗑️ Are you sure you want to delete this user?")) return;
    await adminAPI.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-extrabold mb-6 flex items-center gap-2">
          👥 Manage Users
        </h1>

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-left">
                <th className="p-3">👤 Name</th>
                <th className="p-3">📧 Email</th>
                <th className="p-3">📅 Joined</th>
                <th className="p-3 text-center">⚙️ Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr
                  key={u._id}
                  className={`hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="p-3 font-medium">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{new Date(u.createdAt).toDateString()}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow transition"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-6 text-gray-500 italic"
                  >
                    🚫 No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
