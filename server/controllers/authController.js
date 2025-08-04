// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Painter from '../models/Painter.js';

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingPainter = await Painter.findOne({ email });
    if (existingPainter) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newPainter = new Painter({ name, email, password: hashedPassword });
    await newPainter.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const painter = await Painter.findOne({ email });
    if (!painter) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, painter.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: painter._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token, painter });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const loginPainter = async (req, res) => {
  const { email, password } = req.body;
  const painter = await Painter.findOne({ email });

  if (!painter || painter.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken(painter._id); // ✅ Correct token creation
  res.status(200).json({ token });
};
