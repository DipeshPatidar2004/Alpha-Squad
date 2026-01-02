import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Common for All
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true, required: true },
    phone: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    userType: {
      type: String,
      enum: ["student", "faculty", "admin"],
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },

    // Student Fields
    student: {
      className: { type: String }, // 10th / 12th / BSc etc.
      rollNo: { type: String },
      stream: { type: String }, // Science / Arts / Commerce / CS etc.
      batchYear: { type: String },
    },

    // Faculty Fields
    faculty: {
      department: { type: String }, // CSE / IT / Mechanical...
      employeeId: { type: String, unique: true, sparse: true },
      designation: { type: String }, // Lecturer / Professor etc.
      experience: { type: String }, // Optional
    },

    // Admin Fields
    admin: {
      adminCode: { type: String }, // Access key for admin only
      roleLevel: { type: String, default: "super" }, // super / panel / moderator
    },

    // Email verification
    verifyToken: { type: String },
    verifyTokenExpires: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
