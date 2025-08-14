import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import userProtect from "../middleware/userAuthMiddleware.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "server/uploads/userProfileImages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Auth routes
router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);

// Dashboard (protected)
router.get("/dashboard", userProtect, getUserProfile);

// Update profile
router.put("/update-profile", userProtect, upload.single("profileImage"), updateUserProfile);

export default router;
