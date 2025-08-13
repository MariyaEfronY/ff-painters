import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImage: req.file ? req.file.filename : null,
    });

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
      profileImage: user.profileImage
        ? `/uploads/userProfileImages/${user.profileImage}`
        : null,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
      profileImage: user.profileImage
        ? `/uploads/userProfileImages/${user.profileImage}`
        : null,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};





export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      city: user.city || "",
      bio: user.bio || "",
      profileImage: user.profileImage
        ? `/uploads/userProfileImages/${user.profileImage}`
        : null,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update profile (replace image if new uploaded)
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update text fields
    if (req.body.name) user.name = req.body.name;
    if (req.body.phone) user.phone = req.body.phone;
    if (req.body.city) user.city = req.body.city;
    if (req.body.bio) user.bio = req.body.bio;

    // Replace image if new one uploaded
    if (req.file) {
      if (user.profileImage) {
        const oldImagePath = path.join(
          process.cwd(),
          "server",
          "uploads",
          "userProfileImages",
          user.profileImage
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      user.profileImage = req.file.filename;
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        bio: user.bio,
        profileImage: user.profileImage
          ? `/uploads/userProfileImages/${user.profileImage}`
          : null,
      },
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
