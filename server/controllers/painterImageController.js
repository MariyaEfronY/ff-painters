import Painter from '../models/Painter.js';
import fs from 'fs';
import path from 'path';

// Upload or Update Profile Image
export const uploadProfileImage = async (req, res) => {
  try {
    const painterId = req.params.id;
    const profileImage = req.file.filename;

    const painter = await Painter.findById(painterId);
    if (!painter) return res.status(404).json({ message: 'Painter not found' });

    // Optional: Remove old image if exists
    if (painter.profileImage) {
      const oldPath = path.join('uploads', painter.profileImage);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    painter.profileImage = profileImage;
    await painter.save();

    res.status(200).json({ message: 'Profile image updated', profileImage });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ message: 'Server error uploading image' });
  }
};
