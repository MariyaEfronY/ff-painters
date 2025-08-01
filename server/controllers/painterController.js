// server/controllers/painterController.js
import Painter from '../models/Painter.js';
import Booking from '../models/Booking.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

export const painterSignup = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await Painter.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already in use' });

  const hashed = await bcrypt.hash(password, 10);
  const painter = new Painter({ name, email, password: hashed });

  await painter.save();
  res.status(201).json({ message: 'Signup successful' });
};

export const painterLogin = async (req, res) => {
  const { email, password } = req.body;

  const painter = await Painter.findOne({ email });
  if (!painter) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, painter.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: painter._id }, 'secret', { expiresIn: '1d' });

  res.json({ message: 'Login successful', token, painter });
};



// Get painter profile
export const getPainterProfile = async (req, res) => {
  try {
    const painter = await Painter.findById(req.params.id);
    if (!painter) {
      return res.status(404).json({ error: 'Painter not found' });
    }
    res.status(200).json(painter);
  } catch (error) {
    console.error('Error getting painter profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update painter profile
export const updatePainterProfile = async (req, res) => {
  try {
    const painter = await Painter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!painter) {
      return res.status(404).json({ error: 'Painter not found' });
    }
    res.status(200).json(painter);
  } catch (error) {
    console.error('Error updating painter profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Upload profile image
export const uploadProfileImage = async (req, res) => {
  try {
    const painterId = req.params.id;
    const profileImage = req.file.filename;

    const painter = await Painter.findById(painterId);
    if (!painter) return res.status(404).json({ message: 'Painter not found' });

    // 🧹 Optional cleanup: delete old image
    if (painter.profileImage) {
      const oldPath = path.join('uploads', painter.profileImage);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    painter.profileImage = profileImage;
    await painter.save();

    res.status(200).json({ message: 'Profile image updated', profileImage });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ message: 'Server error uploading image' });
  }
};

// Upload gallery image
export const uploadGalleryImage = async (req, res) => {
  try {
    const painterId = req.params.id;
    const newImage = {
      imageUrl: req.file.path,
      description: req.body.description
    };

    const painter = await Painter.findById(painterId);
    if (!painter) {
      return res.status(404).json({ error: 'Painter not found' });
    }

    painter.gallery.push(newImage);
    await painter.save();

    res.status(201).json({ message: 'Gallery image uploaded', gallery: painter.gallery });
  } catch (error) {
    console.error('Error uploading gallery image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ THIS IS THE ONE YOU’RE MISSING!
export const getPainterGallery = async (req, res) => {
  try {
    const painterId = req.params.id;
    const painter = await Painter.findById(painterId);
    if (!painter) {
      return res.status(404).json({ error: 'Painter not found' });
    }
    res.status(200).json(painter.gallery);
  } catch (error) {
    console.error('Error getting gallery:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Bookings for painter
export const getPainterBookings = async (req, res) => {
  try {
    const painterId = req.params.id;
    const bookings = await Booking.find({ painterId });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error getting painter bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



