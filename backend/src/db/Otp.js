import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  
  // Who is verifying? (Student / Faculty / Admin)
  userType: { 
    type: String, 
    enum: ["student", "faculty", "admin"], 
    required: true 
  },

  // Email or Phone for verification
  identifier: {
    type: String,
    required: true, // email or phone
  },

  // OTP Information
  otp: { type: String, required: true },
  channel: { type: String, enum: ["email", "sms"], required: true },

  // Expiry Time
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },

  // To avoid reuse
  verified: { type: Boolean, default: false }
});

export default mongoose.models.Otp || mongoose.model("Otp", otpSchema);
