import mongoose from 'mongoose';

const PainterSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phoneNumber: String,
  city: String,
  workExperience: String,
  bio: String,
  specification: [String], // e.g., ["interior", "exterior"]
  profileImage: {
  type: String,
  default: '', // or 'default.jpg' if you have a fallback image
},

});

const Painter = mongoose.model('Painter', PainterSchema);
export default Painter;
