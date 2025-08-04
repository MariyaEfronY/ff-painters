// server/routes/painterRoutes.js
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
import verifyToken from "../middleware/verifyToken.js";
import Painter from '../models/Painter.js';



const router = express.Router();



// Multer setup for profile image
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/auth/signup', painterSignup);
router.post('/auth/login', painterLogin);
// Protected Route
router.get('/profile', verifyToken, async (req, res) => {
  try {
    console.log("✅ Token verified. Painter ID from token:", req.painterId);

    const painter = await Painter.findById(req.painterId);
    if (!painter) {
      console.log("❌ Painter not found in DB.");
      return res.status(404).json({ message: "Painter not found" });
    }

    console.log("🎨 Painter profile found:", painter);
    res.json(painter);
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});




router.get('/gallery', authMiddleware, getPainterGallery);
router.post('/gallery', authMiddleware, uploadGalleryImage);
// Update painter profile info
router.put('/:id/update', updatePainterProfile);


// Upload or update profile image
router.post('/upload-profile/:id', upload.single('profileImage'), uploadProfileImage);

export default router;
