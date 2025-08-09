import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { protectUser } from '../middleware/userAuthMiddleware.js'; // auth middleware
import upload from '../middleware/userProfileUpload.js'; // multer for profile image upload

const router = express.Router();

// Signup
router.post('/signup', upload.single('profileImage'), registerUser);

// Login
router.post('/login', loginUser);

// Get user profile (protected route)
router.get('/profile/:id', protectUser, getUserProfile);

// Update user profile (protected route + image upload)
router.put('/profile/:id', protectUser, upload.single('profileImage'), updateUserProfile);

export default router;
