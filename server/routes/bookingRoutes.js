import express from "express";
import {
  createBooking,
  getPainterBookings,
  getCustomerBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking); // user books painter
router.get("/customer/:customerId", getCustomerBookings); // user views own bookings
router.get("/painter/:painterId", getPainterBookings); // painter views bookings
router.put("/:bookingId/status", updateBookingStatus); // painter approves/rejects

export default router;
