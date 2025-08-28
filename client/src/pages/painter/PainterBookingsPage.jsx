import React from "react";
import PainterBookings from "../../components/bookings/PainterBookings";

const PainterBookingsPage = () => {
  const painterId = "PAINTER_ID_HERE"; // replace with logged-in painter id from context/auth

  return (
    <div>
      <h2>Painter Dashboard - Booking Requests</h2>
      <PainterBookings painterId={painterId} />
    </div>
  );
};

export default PainterBookingsPage;
