import React, { useEffect, useState } from "react";
import adminAPI from "../../utils/adminApi";
import AdminSidebar from "../../components/admin/AdminSidebar";

const PaintersPage = () => {
  const [painters, setPainters] = useState([]);

  useEffect(() => {
    fetchPainters();
  }, []);

  const fetchPainters = async () => {
    try {
      const { data } = await adminAPI.get("/painters");
      setPainters(data);
    } catch (err) {
      console.error("Failed to fetch painters", err);
    }
  };

  const handleApproval = async (id, status) => {
    if (status === "deleted") {
      if (!window.confirm("🗑️ Are you sure you want to delete this painter?")) return;
      await adminAPI.delete(`/painters/${id}`);
    } else {
      await adminAPI.put(`/painters/${id}`, { status });
    }
    fetchPainters();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-extrabold mb-6 flex items-center gap-2">
          🎨 Manage Painters
        </h1>

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-left">
                <th className="p-3">👤 Name</th>
                <th className="p-3">📧 Email</th>
                <th className="p-3">🏙️ City</th>
                {/* <th className="p-3">📌 Status</th> */}
                <th className="p-3 text-center">⚙️ Actions</th>
              </tr>
            </thead>
            <tbody>
              {painters.map((p, index) => (
                <tr
                  key={p._id}
                  className={`hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.email}</td>
                  <td className="p-3">{p.city}</td>
                  {/* <td className="p-3">{p.status}</td> */}
                  <td className="p-3 text-center flex gap-2 justify-center">
                    {/* Uncomment if you want Approve/Reject too */}
                    {/* <button
                      onClick={() => handleApproval(p._id, "approved")}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg shadow transition"
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => handleApproval(p._id, "rejected")}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg shadow transition"
                    >
                      🚫 Reject
                    </button> */}
                    <button
                      onClick={() => handleApproval(p._id, "deleted")}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow transition"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}

              {painters.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-6 text-gray-500 italic"
                  >
                    🚫 No painters found
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

export default PaintersPage;
