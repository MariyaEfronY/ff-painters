// server/routes/painterImageRoutes.js
import express from 'express';
import multer from 'multer';
import { updateProfileImage } from '../controllers/painterImageController.js';

const router = express.Router();

// multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// POST /api/painter/profile-image/:id
router.post('/profile-image/:id', upload.single('profileImage'), updateProfileImage);

export default router;
