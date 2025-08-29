import React, { useEffect, useState } from "react";
import adminAPI from "../../utils/adminApi";
import AdminSidebar from "../../components/admin/AdminSidebar";

const PaintersPage = () => {
  const [painters, setPainters] = useState([]);

  useEffect(() => {
    fetchPainters();
  }, []);

  const fetchPainters = async () => {
    const { data } = await adminAPI.get("/painters");
    setPainters(data);
  };

  const handleApproval = async (id, status) => {
  if (status === "deleted") {
    await adminAPI.delete(`/painters/${id}`);
  } else {
    await adminAPI.put(`/painters/${id}`, { status });
  }
  fetchPainters();
};

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold mb-4">Manage Painters</h1>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">City</th>
              {/* <th className="p-2 border">Status</th> */}
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {painters.map((p) => (
              <tr key={p._id}>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.email}</td>
                <td className="p-2 border">{p.city}</td>
                {/* <td className="p-2 border">{p.status}</td> */}
                <td className="p-2 border flex gap-2">
                  {/* <button onClick={() => handleApproval(p._id, "approved")} className="bg-green-500 text-white px-3 py-1 rounded">
                    Approve
                  </button>
                  <button onClick={() => handleApproval(p._id, "rejected")} className="bg-yellow-500 text-white px-3 py-1 rounded">
                    Reject
                  </button> */}
                  <button onClick={() => handleApproval(p._id, "deleted")} className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaintersPage;
