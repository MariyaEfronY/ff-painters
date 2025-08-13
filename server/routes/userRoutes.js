import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUserDashboard
} from "../controllers/userController.js";
import userProtect from "../middleware/userAuthMiddleware.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/userprofileImages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Public routes
router.post("/signup", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", userProtect, getUserProfile);
router.get("/dashboard", userProtect, getUserDashboard);
router.put("/profile", userProtect, upload.single("profileImage"), updateUserProfile);

export default router;
