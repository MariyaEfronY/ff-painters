import express from 'express';
import multer from 'multer';
import {
  painterSignup,
  painterLogin,
  getPainterProfile,
  getPainterGallery,
  uploadGalleryImage,
  uploadProfileImage,
  updatePainterProfile 
} from '../controllers/painterController.js';
import authMiddleware from '../middleware/authMiddleware.js'; // ✅ Middleware imported correctly
import Painter from '../models/Painter.js';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/profileImages'), // ✅ Store in profileImages
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/auth/signup', painterSignup);
router.post('/auth/login', painterLogin);

// ✅ GET and PUT profile with middleware
router.get('/profile', authMiddleware, getPainterProfile);
router.put('/profile', authMiddleware, upload.single('profileImage'), updatePainterProfile);

// ✅ Gallery routes
router.get('/gallery/:id', getPainterGallery);
router.post('/gallery/:id', upload.single('image'), uploadGalleryImage);

// ✅ Upload profile image separately
router.post('/upload-profile/:id', upload.single('profileImage'), uploadProfileImage);

export default router;
