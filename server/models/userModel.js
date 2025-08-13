import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  city: String,
  bio: String,
  profileImage: { type: String, default: "" }
});

export default mongoose.model("User", userSchema);
