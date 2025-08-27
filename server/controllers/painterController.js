import Painter from '../models/Painter.js';
import Booking from '../models/Booking.js';
import bcrypt from 'bcryptjs';
import createToken from '../utils/createToken.js';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";



// ✅ Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------- SIGNUP ---------- */
export const painterSignup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      city,
      workExperience,
      bio,
      specification,
    } = req.body;

    // check existing
    const existingPainter = await Painter.findOne({ email });
    if (existingPainter) {
      return res.status(400).json({ message: 'Painter already exists' });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // if multer attached, we get req.file
    const profileImage = req.file ? req.file.filename : '';

    // create
    const painter = await Painter.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      city,
      workExperience,
      bio,
      specification: Array.isArray(specification)
        ? specification
        : specification
        ? [specification]
        : [],
      profileImage,
    });

    // generate token
    const token = createToken(painter._id);

    res.status(201).json({
      message: 'Painter registered successfully',
      token,
      painterId: painter._id,
      painter,
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/* ---------- LOGIN ---------- */
export const painterLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const painter = await Painter.findOne({ email });
    if (!painter) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, painter.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = createToken(painter._id);
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

/* ---------- GET PROFILE ---------- */
export const getPainterProfile = async (req, res) => {
  try {
    // Use req.painter instead of req.user
    const painter = await Painter.findById(req.painter._id).select("-password");
    if (!painter) {
      return res.status(404).json({ message: "Painter not found" });
    }
    res.json(painter);
  } catch (error) {
    console.error("Error fetching painter profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/* ---------- UPDATE PROFILE ---------- */
export const updatePainterProfile = async (req, res) => {
  try {
    const updates = { ...req.body };

    // If image uploaded, multer stores it in req.file
    if (req.file) {
      updates.profileImage = req.file.filename;
    }

    // req.params.id comes from /profile/:id
    const painter = await Painter.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!painter) {
      return res.status(404).json({ message: "Painter not found" });
    }

    res.json(painter);
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};



// Add image to gallery
export const addGalleryImage = async (req, res) => {
  try {
    const painterId = req.painter._id; // ✅ FIXED: use req.painter from middleware
    const { description } = req.body;

    const painter = await Painter.findById(painterId);
    if (!painter) return res.status(404).json({ message: "Painter not found" });

    const newImage = {
      image: `/uploads/galleryImages/${req.file.filename}`, // ✅ saved path
      description,
    };

    painter.gallery.push(newImage);
    await painter.save();

    res.status(200).json({
      message: "Image uploaded successfully",
      gallery: painter.gallery,
    });
  } catch (error) {
    console.error("Gallery upload error:", error);
    res.status(500).json({ message: "Server error while uploading gallery" });
  }
};


// ✅ Fetch Painter's Gallery
export const getGallery = async (req, res) => {
  try {
    const painter = await Painter.findById(req.painter._id).select("gallery");
    if (!painter) {
      return res.status(404).json({ message: "Painter not found" });
    }

    res.status(200).json({ gallery: painter.gallery });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch gallery", error: err.message });
  }
};


// ✅ Edit gallery image description
export const updateGallery = async (req, res) => {
  try {
    const { imageId } = req.params;
    const { description } = req.body;

    const painter = await Painter.findById(req.painter._id);
    if (!painter) return res.status(404).json({ message: "Painter not found" });

    const image = painter.gallery.id(imageId);
    if (!image) return res.status(404).json({ message: "Image not found" });

    // Update description
    image.description = description || image.description;
    await painter.save();

    res.status(200).json({ message: "Gallery updated", gallery: painter.gallery });
  } catch (err) {
    res.status(500).json({ message: "Failed to update gallery", error: err.message });
  }
};

// ✅ Delete gallery image (correct)
// ✅ Delete gallery image (fixed)
export const deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params; // ✅ match router param

    const painter = await Painter.findById(req.painter._id);
    if (!painter) {
      return res.status(404).json({ message: "Painter not found" });
    }

    const imageDoc = painter.gallery.id(id);
    if (!imageDoc) {
      return res.status(404).json({ message: "Image not found" });
    }

    // remove file from disk if exists
    if (imageDoc.image) {
      const relativePath = imageDoc.image.replace(/^\//, "");
      const absolutePath = path.join(__dirname, "..", relativePath);

      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }
    }

    imageDoc.deleteOne();
    await painter.save();

    res.json({
      message: "Image deleted successfully",
      gallery: painter.gallery,
    });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
