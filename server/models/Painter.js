import mongoose from 'mongoose';

const painterSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profileImage: String,
  gallery: [
    {
      image: String,
      description: String
    }
  ],
  ratings: [Number]
});

const Painter = mongoose.model('Painter', painterSchema);
export default Painter;
