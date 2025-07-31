const Painter = require('../models/Painter');

exports.uploadGallery = async (req, res) => {
  const { description } = req.body;
  const newImage = {
    imageUrl: req.file.path,
    description,
    createdAt: new Date()
  };
  const painter = await Painter.findById(req.painterId);
  painter.gallery.push(newImage);
  await painter.save();
  res.json({ message: 'Gallery uploaded' });
};

exports.getGallery = async (req, res) => {
  const painter = await Painter.findById(req.painterId);
  res.json(painter.gallery);
};

exports.deleteGalleryImage = async (req, res) => {
  const { id } = req.params;
  const painter = await Painter.findById(req.painterId);
  painter.gallery = painter.gallery.filter(item => item._id.toString() !== id);
  await painter.save();
  res.json({ message: 'Image removed' });
};
