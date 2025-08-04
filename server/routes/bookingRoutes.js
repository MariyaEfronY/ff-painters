import express from 'express';
const router = express.Router();

import {
  createBooking,
  getPainterBookings,
  getCustomerBookings // ✅ correct name
} from '../controllers/bookingController.js';



// Create a new booking
router.post('/', createBooking);  

// Get bookings for a painter
router.get('/painter/:painterId', getPainterBookings);

// Get bookings for a user
router.get('/customer/:userId', getCustomerBookings);


export default router;
