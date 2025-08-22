// controllers/userController.js
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ✅ Register User
export const registerUser = async (req, res) => {
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
    profileImage: req.file ? `/uploads/profileImages/${req.file.filename}` : null,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

// ✅ Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};


// controllers/userController.js
export const getUserProfile = async (req, res) => {
  try {
    const user = req.user;

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage
        ? `${req.protocol}://${req.get("host")}/uploads/userProfileImages/${user.profileImage}`
        : null,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile", error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = req.user;

    // ✅ update basic fields
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // ✅ update profile image if uploaded
    if (req.file) {
      user.profileImage = req.file.filename;
    }

    await user.save();

    res.json({
      message: "Profile updated",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage
          ? `${req.protocol}://${req.get("host")}/uploads/userProfileImages/${user.profileImage}`
          : null,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};
