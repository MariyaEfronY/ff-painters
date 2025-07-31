// ✅ NEW
import express from 'express';

const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const { uploadGallery, getGallery, deleteGalleryImage } = require('../controllers/galleryController');

router.post('/', auth, upload.single('galleryImage'), uploadGallery);
router.get('/', auth, getGallery);
router.delete('/:id', auth, deleteGalleryImage);

module.exports = router;
