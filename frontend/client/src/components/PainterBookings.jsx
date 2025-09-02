import React, { useEffect, useState } from 'react';
import API from '../api/axiosConfig';

const PainterBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get('/painter/bookings').then((res) => setBookings(res.data));
  }, []);

  return (
    <div>
      <h3>Bookings</h3>
      {bookings.map((b) => (
        <div key={b._id}>
          <p>{b.customerName}</p>
          <p>{b.date}</p>
          <p>{b.status}</p>
        </div>
      ))}
    </div>
  );
};

export default PainterBookings;
