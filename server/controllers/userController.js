import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";






export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, city, bio } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      city,
      bio,
      profileImage: req.file ? req.file.filename : null
    });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      city: newUser.city,
      bio: newUser.bio,
      profileImage: newUser.profileImage
        ? `/uploads/userProfileImages/${newUser.profileImage}`
        : null,
      token: jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "30d" })
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: error.message });
  }
};


// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" }),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch logged-in user's profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      city: user.city || "",
      bio: user.bio || "",
      profileImage: user.profileImage
        ? `/uploads/userProfileImages/${user.profileImage}`
        : null
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// server/controllers/userController.js
export const getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.city,
      bio: user.bio,
      profileImage: user.profileImage
        ? `/uploads/userprofileImages/${user.profileImage}`
        : null
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Update user profile with image replacement
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.city = req.body.city || user.city;
    user.bio = req.body.bio || user.bio;

    // Handle image replacement
    if (req.file) {
      if (user.profileImage) {
        const oldPath = path.join(
          process.cwd(),
          "server",
          "uploads",
          "userProfileImages",
          user.profileImage
        );
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
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
          : null
      }
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};