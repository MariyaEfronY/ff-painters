import React from "react";
import MyBookings from "../../components/bookings/MyBookings";

const UserBookingsPage = () => {
  const customerId = "USER_ID_HERE"; // replace with logged-in user id from context/auth

  return (
    <div>
      <h2>User Dashboard - My Bookings</h2>
      <MyBookings customerId={customerId} />
    </div>
  );
};

export default UserBookingsPage;
