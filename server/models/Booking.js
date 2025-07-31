// models/Booking.js

import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  painterId: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  notes: String,
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
