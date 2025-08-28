import Booking from "../models/Booking.js";

// ✅ Create Booking (User side)
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
    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
};

// ✅ Painter can view all bookings
export const getPainterBookings = async (req, res) => {
  try {
    const painterId = req.params.painterId;
    const bookings = await Booking.find({ painterId })
      .populate("customerId", "name email");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ User can view their own bookings
export const getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.params.customerId })
      .populate("painterId", "name city");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Painter updates booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.bookingId);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    res.json({ message: "Booking status updated", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
