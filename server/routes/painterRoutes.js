// server/routes/painterRoutes.js
import express from 'express';
import multer from 'multer';
import {
  painterSignup,
  painterLogin,
  getPainterProfile,
  getPainterGallery,
  uploadGalleryImage,
  uploadProfileImage
} from '../controllers/painterController.js';
import authMiddleware from '../middleware/authMiddleware.js';
// const { getPainterProfile } = require('../controllers/painterController');

const router = express.Router();

// Multer setup for profile image
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/auth/signup', painterSignup);
router.post('/auth/login', painterLogin);
router.get('/profile', authMiddleware, getPainterProfile);




router.get('/gallery', authMiddleware, getPainterGallery);
router.post('/gallery', authMiddleware, uploadGalleryImage);

// Upload or update profile image
router.post('/upload-profile/:id', upload.single('profileImage'), uploadProfileImage);

export default router;
