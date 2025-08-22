// routes/userRoutes.js
import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/userController.js";
import { userProtect } from "../middleware/auth.js";
import { uploadUserProfileImage } from "../middleware/userProfileUpload.js";

const router = express.Router();

// Public
router.post("/register", uploadUserProfileImage.single("profileImage"), registerUser);

router.post("/login", loginUser);

// Protected
router.get("/me", userProtect, getMe);

export default router;
