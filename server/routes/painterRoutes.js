import express from 'express';
import multer from 'multer';
import {
  painterSignup,
  painterLogin,
  getPainterProfile,
  getPainterGallery,
  uploadGalleryImage,
  uploadProfileImage,
  updatePainterProfile,
} from '../controllers/painterController.js';
import { painterProtect } from '../middleware/auth.js'; // ✅ use painterProtect

const router = express.Router();

// ✅ Multer setup for profile/gallery images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/profileImages'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

/* ---------- AUTH ROUTES ---------- */
router.post('/auth/signup', upload.single('profileImage'), painterSignup);
router.post('/auth/login', painterLogin);

/* ---------- PROFILE ROUTES ---------- */
router.get('/profile', painterProtect, getPainterProfile);
router.put('/profile', painterProtect, upload.single('profileImage'), updatePainterProfile); // ✅ update own profile

/* ---------- GALLERY ROUTES ---------- */
router.get('/gallery/:id', getPainterGallery); // public gallery
router.post('/gallery', painterProtect, upload.single('image'), uploadGalleryImage); // ✅ auth required to upload

/* ---------- OPTIONAL: SEPARATE PROFILE IMAGE UPLOAD ---------- */
router.post(
  '/upload-profile',
  painterProtect,
  upload.single('profileImage'),
  uploadProfileImage
);

export default router;
