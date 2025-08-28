import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    painter: { type: mongoose.Schema.Types.ObjectId, ref: "Painter", required: true },
    date: { type: Date, required: true },
    message: { type: String },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
