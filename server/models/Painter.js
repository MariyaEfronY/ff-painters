// server/models/Painter.js

const mongoose = require('mongoose');

const PainterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  workExperience: {
    type: String,
  },
  city: {
    type: String,
  },
  bio: {
    type: String,
  },
  specification: {
    type: [String],
    enum: ['interior', 'exterior'],
    default: [],
  },
});

module.exports = mongoose.model('Painter', PainterSchema);
