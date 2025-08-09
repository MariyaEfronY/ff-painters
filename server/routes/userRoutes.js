import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import upload from "../middleware/userProfileUpload.js"; // fix folder name if needed
import { protectUser } from "../middleware/userAuthMiddleware.js"; // import protectUser middleware

const router = express.Router();

// Auth
router.post("/signup", registerUser);
router.post("/login", loginUser);

// Profile (use protectUser for auth)
router.get("/profile/:id", protectUser, getUserProfile);
router.put(
  "/profile/:id",
  protectUser,
  upload.single("profileImage"),
  updateUserProfile
);

export default router;
