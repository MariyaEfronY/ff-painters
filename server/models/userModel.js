import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  bio: String,
  profileImage: { type: String, default: "" }
});

export default mongoose.model("User", userSchema);
