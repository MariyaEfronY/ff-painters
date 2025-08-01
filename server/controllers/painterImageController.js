import express from 'express';
import multer from 'multer';
import path from 'path';
import Painter from '../models/Painter.js';

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profileImages/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage: storage });

// ✅ Upload profile image route
router.post('/upload-profile-image/:id', upload.single('profileImage'), async (req, res) => {
  try {
    const painterId = req.params.id;
    const imagePath = req.file.filename;

    const painter = await Painter.findByIdAndUpdate(
      painterId,
      { profileImage: imagePath },
      { new: true }
    );

    if (!painter) return res.status(404).json({ message: 'Painter not found' });

    res.status(200).json({ message: 'Image uploaded', painter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
}); // 👈 this closing parenthesis ends the router.post() — it must be only one

export default router;
