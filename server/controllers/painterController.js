// server/controllers/painterController.js
import Painter from '../models/Painter.js';
import Booking from '../models/Booking.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import createToken from '../utils/createToken.js';


// Signup Controller
export const painterSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Painter.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const painter = new Painter({ name, email, password: hashed });
    await painter.save();

    const token = createToken(painter._id);

    // ✅ Return painterId explicitly
    res.status(201).json({
      message: 'Signup successful',
      token,
      painterId: painter._id,
      painter,
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Login Controller
export const painterLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const painter = await Painter.findOne({ email });
    if (!painter) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, painter.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createToken(painter._id);

    // ✅ Return painterId explicitly
    res.status(200).json({
      message: 'Login successful',
      token,
      painterId: painter._id,
      painter,
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getPainterProfile = async (req, res) => {
  try {
    const painter = await Painter.findById(req.painterId);
    if (!painter) {
      return res.status(404).json({ message: 'Painter not found' });
    }

    res.status(200).json(painter);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error' });
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


// controllers/painterController.js
export const updatePainterProfile = async (req, res) => {
  try {
    const painterId = req.painter.id;
    const painter = await Painter.findById(painterId);

    if (!painter) return res.status(404).json({ message: 'Painter not found' });

    // ✅ Delete old profile image if new one is uploaded
    if (req.file && painter.profileImage) {
      const oldImagePath = path.join(process.cwd(), painter.profileImage); // ✅ get full path
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // ✅ Build update object
    const updatedData = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      workExperience: req.body.workExperience,
      city: req.body.city,
      bio: req.body.bio,
      specification: Array.isArray(req.body.specification)
        ? req.body.specification
        : [req.body.specification],
    };

    // ✅ Update profile image path if uploaded
    if (req.file) {
      updatedData.profileImage = `/uploads/${req.file.filename}`;
    }

    // ✅ Update in DB
    const updatedPainter = await Painter.findByIdAndUpdate(
      painterId,
      updatedData,
      { new: true }
    );

    res.json(updatedPainter);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Server error during profile update' });
  }
};




