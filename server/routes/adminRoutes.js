// routes/adminRoutes.js
import express from "express";
import { adminLogin, getDashboardStats, getAllUsers, deleteUser,
         getAllPainters, approvePainter, deletePainter,
         getAllBookings, cancelBooking,  adminSignup } from "../controllers/adminController.js";
import { adminProtect } from "../middleware/adminProtect.js";

const router = express.Router();

// Auth
router.post("/login", adminLogin);
router.post("/signup", adminSignup);

// Dashboard
router.get("/stats", adminProtect, getDashboardStats);

// Users
router.get("/users", adminProtect, getAllUsers);
router.delete("/users/:id", adminProtect, deleteUser);

// Painters
router.get("/painters", adminProtect, getAllPainters);
router.put("/painters/approve/:id", adminProtect, approvePainter);
router.delete("/painters/:id", adminProtect, deletePainter);

// Bookings
router.get("/bookings", adminProtect, getAllBookings);
router.delete("/bookings/:id", adminProtect, cancelBooking);

export default router;
