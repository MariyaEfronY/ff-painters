import Painter from '../models/Painter.js';
import Booking from '../models/Booking.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import createToken from '../utils/createToken.js';

// ✅ Signup
export const painterSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Painter.findOne({ email });

    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const painter = new Painter({ name, email, password: hashed });
    await painter.save();

    const token = createToken(painter._id);
    res.status(201).json({ message: 'Signup successful', token, painterId: painter._id, painter });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ✅ Login
export const painterLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const painter = await Painter.findOne({ email });

    if (!painter) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, painter.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = createToken(painter._id);
    res.status(200).json({ message: 'Login successful', token, painterId: painter._id, painter });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ✅ Get profile
export const getPainterProfile = async (req, res) => {
  try {
    const painter = await Painter.findById(req.painterId);
    if (!painter) return res.status(404).json({ message: 'Painter not found' });
    res.status(200).json(painter);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Upload profile image
export const uploadProfileImage = async (req, res) => {
  try {
    const painterId = req.params.id;
    const profileImage = req.file.filename;

    const painter = await Painter.findById(painterId);
    if (!painter) return res.status(404).json({ message: 'Painter not found' });

    // Delete old image
    if (painter.profileImage) {
      const oldPath = path.join('uploads', 'profileImages', painter.profileImage);
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

// ✅ Upload gallery image
export const uploadGalleryImage = async (req, res) => {
  try {
    const painterId = req.params.id;
    const newImage = {
      imageUrl: req.file.path,
      description: req.body.description
    };

    const painter = await Painter.findById(painterId);
    if (!painter) return res.status(404).json({ error: 'Painter not found' });

    painter.gallery.push(newImage);
    await painter.save();

    res.status(201).json({ message: 'Gallery image uploaded', gallery: painter.gallery });
  } catch (error) {
    console.error('Error uploading gallery image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Get gallery
export const getPainterGallery = async (req, res) => {
  try {
    const painterId = req.params.id;
    const painter = await Painter.findById(painterId);
    if (!painter) return res.status(404).json({ error: 'Painter not found' });
    res.status(200).json(painter.gallery);
  } catch (error) {
    console.error('Error getting gallery:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Get bookings
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

// ✅ Update profile
export const updatePainterProfile = async (req, res) => {
  try {
    const {
      painterId,
      name,
      phoneNumber,
      workExperience,
      city,
      bio,
      specification,
    } = req.body;

    let profileImage = req.body.profileImage;

    // If a new profile image is uploaded via multer
    if (req.file) {
      profileImage = req.file.filename;
    }

    const updatedPainter = await Painter.findByIdAndUpdate(
      painterId,
      {
        name,
        phoneNumber,
        workExperience,
        city,
        bio,
        specification,
        profileImage,
      },
      { new: true }
    );

    if (!updatedPainter) {
      return res.status(404).json({ message: 'Painter not found' });
    }

    res.status(200).json(updatedPainter);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};

