import mongoose from 'mongoose';

const painterSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phoneNumber: String,
  workExperience: Number,
  city: String,
  bio: String,
  specification: [String],
  profileImage: String,
  gallery: [
    {
      imageUrl: String,
      description: String,
    },
  ],
});

const Painter = mongoose.model('Painter', painterSchema);

export default Painter; // ✅ ES module export
