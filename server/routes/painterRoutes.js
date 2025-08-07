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

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/profileImages'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

/* ---------- AUTH ROUTES ---------- */
router.post('/auth/signup', painterSignup);
router.post('/auth/login', painterLogin);

/* ---------- PROFILE ROUTES ---------- */
router.get('/profile', authMiddleware, getPainterProfile);
router.put('/profile', authMiddleware, upload.single('profileImage'), updatePainterProfile);

/* ---------- GALLERY ROUTES ---------- */
router.get('/gallery/:id', getPainterGallery);
router.post('/gallery/:id', upload.single('image'), uploadGalleryImage);

/* ---------- OPTIONAL: SEPARATE PROFILE IMAGE UPLOAD ---------- */
router.post('/upload-profile/:id', upload.single('profileImage'), uploadProfileImage);

export default router;
