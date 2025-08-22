import express from "express";
import {
  painterSignup,
  painterLogin,
  getPainterProfile,
  updatePainterProfile,
  getPainterGallery,
  getPainterBookings,
} from "../controllers/painterController.js";

import { painterProtect } from "../middleware/auth.js";
import {
  uploadProfileImage,
  uploadGalleryImage,
} from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Auth
// 🔹 use uploadProfileImage for signup only if you allow profile image upload during signup
router.post("/signup", uploadProfileImage.single("profileImage"), painterSignup);
router.post("/login", painterLogin);

// Profile
router.get("/profile", painterProtect, getPainterProfile);
router.put(
  "/profile/:id",
  painterProtect,
  uploadProfileImage.single("profileImage"),
  updatePainterProfile
);

// Gallery
router.post(
  "/gallery/:id",
  painterProtect,
  uploadGalleryImage.single("galleryImage")
);
router.get("/gallery/:id", painterProtect, getPainterGallery);

// Bookings
router.get("/bookings/:id", painterProtect, getPainterBookings);

export default router;
