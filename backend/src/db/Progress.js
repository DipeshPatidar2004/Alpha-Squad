import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    lessonsCompleted: {
      type: Number,
      default: 0,
    },
    badges: {
      type: [String],
      default: [],
    },
    lastSyncAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Progress ||
  mongoose.model("Progress", progressSchema);
