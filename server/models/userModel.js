import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    bio: { type: String, default: '' },
    profileImage: { type: String, default: '' }, // store filename
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
