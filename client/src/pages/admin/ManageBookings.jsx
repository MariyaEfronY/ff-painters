import React, { useEffect, useState } from "react";
import adminAPI from "../../utils/adminApi";
import AdminSidebar from "../../components/admin/AdminSidebar";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const { data } = await adminAPI.get("/bookings");
    setBookings(data);
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    await adminAPI.delete(`/bookings/${id}`);
    fetchBookings();
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold mb-4">Manage Bookings</h1>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Painter</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td className="p-2 border">{b.customer?.name}</td>
                <td className="p-2 border">{b.painter?.name}</td>
                <td className="p-2 border">{new Date(b.date).toDateString()}</td>
                <td className="p-2 border">{b.status}</td>
                <td className="p-2 border">
                  <button onClick={() => cancelBooking(b._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                    Cancel
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

export default BookingsPage;
