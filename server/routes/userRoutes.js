import express from "express";
import multer from "multer";
import path from "path";
import { registerUser, loginUser, getUserProfile, updateUserProfile } from "../controllers/userController.js";

const router = express.Router();

// Multer setup for user profile images
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/userprofileImages/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:id", getUserProfile);
router.put("/profile/:id", upload.single("profileImage"), updateUserProfile);

export default router;
