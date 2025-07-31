import Painter from '../models/Painter.js';
import Booking from '../models/Booking.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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



export const getPainterProfile = async (req, res) => {
  try {
    const painter = await Painter.findById(req.userId);
    if (!painter) {
      return res.status(404).json({ message: 'Painter not found' });
    }
    res.status(200).json(painter);
  } catch (error) {
    console.error('Error fetching painter profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// GET /api/painter/gallery
export const getPainterGallery = async (req, res) => {
  try {
    const painter = await Painter.findById(req.userId);
    if (!painter) return res.status(404).json({ message: 'Painter not found' });

    res.json(painter.gallery || []);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/painter/gallery
export const uploadGalleryImage = async (req, res) => {
  try {
    const { imageUrl, description } = req.body;

    const painter = await Painter.findById(req.userId);
    if (!painter) return res.status(404).json({ message: 'Painter not found' });

    painter.gallery.push({ imageUrl, description });
    await painter.save();

    res.json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Server error' });
  }
};