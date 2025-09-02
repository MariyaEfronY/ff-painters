import React, { useEffect, useState } from "react";
import adminAPI from "../../utils/adminApi";
import AdminSidebar from "../../components/admin/AdminSidebar";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await adminAPI.get("/bookings");
      setBookings(data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("❌ Cancel this booking?")) return;
    await adminAPI.delete(`/bookings/${id}`);
    fetchBookings();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-extrabold mb-6 flex items-center gap-2">
          📅 Manage Bookings
        </h1>

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-left">
                <th className="p-3">👤 Customer</th>
                <th className="p-3">🎨 Painter</th>
                <th className="p-3">📆 Date</th>
                <th className="p-3">📌 Status</th>
                <th className="p-3 text-center">⚙️ Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, index) => (
                <tr
                  key={b._id}
                  className={`hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="p-3 font-medium">{b.customerId?.name || "—"}</td>
                  <td className="p-3">{b.painterId?.name || "—"}</td>
                  <td className="p-3">
                    {new Date(b.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td
                    className={`p-3 font-semibold ${
                      b.status === "confirmed"
                        ? "text-green-600"
                        : b.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {b.status}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => cancelBooking(b._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow transition"
                    >
                      ❌ Cancel
                    </button>
                  </td>
                </tr>
              ))}

              {bookings.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-6 text-gray-500 italic"
                  >
                    🚫 No bookings found
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

export default BookingsPage;
