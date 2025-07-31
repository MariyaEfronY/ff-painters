import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  try {
    const { customerId, painterId, date, time } = req.body;
    const newBooking = new Booking({
      customerId,
      painterId,
      date,
      time,
    });
    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

export const getPainterBookings = async (req, res) => {
  try {
    const painterId = req.params.painterId;
    const bookings = await Booking.find({ painterId }).populate('customerId');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCustomerBookings = async (req, res) => { // Renamed function
  try {
    const bookings = await Booking.find({ customerId: req.params.userId });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
