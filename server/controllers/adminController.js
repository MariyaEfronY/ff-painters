// controllers/adminController.js
import Admin from "../models/Admin.js";
import User from "../models/userModel.js";
import Painter from "../models/Painter.js";
import Booking from "../models/Booking.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



/* ---------- SIGNUP ---------- */
export const adminSignup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // check if admin exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create admin
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    // generate token
    const token = jwt.sign(
      { id: newAdmin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Admin registered successfully",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------- LOGIN ---------- */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------- DASHBOARD OVERVIEW ---------- */
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPainters = await Painter.countDocuments();
    const totalBookings = await Booking.countDocuments();

    res.json({ totalUsers, totalPainters, totalBookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------- USER MANAGEMENT ---------- */
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

/* ---------- PAINTER MANAGEMENT ---------- */
export const getAllPainters = async (req, res) => {
  const painters = await Painter.find().select("-password");
  res.json(painters);
};
export const approvePainter = async (req, res) => {
  const painter = await Painter.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
  res.json(painter);
};
export const deletePainter = async (req, res) => {
  await Painter.findByIdAndDelete(req.params.id);
  res.json({ message: "Painter deleted" });
};

/* ---------- BOOKING MANAGEMENT ---------- */
export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("customerId", "name email")
    .populate("painterId", "name email city");
  res.json(bookings);
};
export const cancelBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "Booking cancelled" });
};
