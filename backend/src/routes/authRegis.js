// src/routes/authRegis.js
import express from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../db/User.js";   // 👈 yaha fix
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

// nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const ALLOWED_USER_TYPES = ["student", "faculty", "admin"];

// ---------- REGISTER ----------
router.post("/register", async (req, res) => {
  try {
    const payload = req.body;
    const { email, phone, userType } = payload;

    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        error: "Provide email or phone",
      });
    }

    if (!userType || !ALLOWED_USER_TYPES.includes(userType)) {
      return res.status(400).json({
        success: false,
        error: "Invalid userType. Allowed: student, faculty, admin",
      });
    }

    if (userType === "student" && !payload.student) {
      return res
        .status(400)
        .json({ success: false, error: "Student data required" });
    }
    if (userType === "faculty" && !payload.faculty) {
      return res
        .status(400)
        .json({ success: false, error: "Faculty data required" });
    }
    if (userType === "admin" && !payload.admin) {
      return res
        .status(400)
        .json({ success: false, error: "Admin data required" });
    }

    if (email) {
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({
          success: false,
          error: "Email already registered",
        });
      }
    }

    const user = new User(payload);

    const token = crypto.randomBytes(32).toString("hex");
    user.verifyToken = token;
    user.verifyTokenExpires = Date.now() + 1000 * 60 * 60 * 24;

    await user.save();

    const verifyLink = `${BACKEND_URL}/api/auth/verify-email?token=${token}&userId=${user._id}`;

    if (user.email) {
      await transporter.sendMail({
        from: `"My App" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Verify your email",
        html: `
          <h3>Hi ${user.name || ""},</h3>
          <p>Please verify your email by clicking the link below:</p>
          <a href="${verifyLink}">${verifyLink}</a>
          <p>This link will expire in 24 hours.</p>
        `,
      });
    }

    return res.json({
      success: true,
      message: "User registered. Verification link sent to email.",
      verifyLink,
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

// ---------- VERIFY EMAIL ----------
router.get("/verify-email", async (req, res) => {
  try {
    const { token, userId } = req.query;

    if (!token || !userId) {
      return res.status(400).json({
        success: false,
        error: "Token and userId required",
      });
    }

    const user = await User.findOne({
      _id: userId,
      verifyToken: token,
      verifyTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid or expired verification link",
      });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpires = undefined;
    await user.save();

    return res.redirect("http://localhost:5173/verified-success-page");
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

// LOGIN (better debug + role handling)
router.post("/login", async (req, res) => {
  try {
    let { email, password, userType } = req.body;

    // normalize
    email = (email || "").trim().toLowerCase();
    password = (password || "").trim();

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Email and password required" });
    }

    // 1) sirf email se user dhundo
    const user = await User.findOne({ email });

    if (!user) {
      console.log("LOGIN: user not found for email", email);
      return res
        .status(401)
        .json({ success: false, error: "User not found with this email" });
    }

    // 2) agar role bheja hai to check karo
    if (userType && ALLOWED_USER_TYPES.includes(userType)) {
      if (user.userType !== userType) {
        console.log(
          "LOGIN: role mismatch. DB:",
          user.userType,
          "CLIENT:",
          userType
        );
        return res.status(400).json({
          success: false,
          error: `You are registered as '${user.userType}', not '${userType}'`,
        });
      }
    }

    // 3) password check
    if (user.password !== password) {
      console.log("LOGIN: wrong password for", email);
      return res
        .status(401)
        .json({ success: false, error: "Incorrect password" });
    }

    // 4) verify check
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        error: "Please verify your email before login",
      });
    }

    // 5) success
    return res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});


// ---------- FIND USER ----------
router.post("/find", async (req, res) => {
  try {
    const { identifier } = req.body;

    if (!identifier) {
      return res
        .status(400)
        .json({ success: false, error: "identifier required" });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!user) {
      return res.json({
        success: false,
        user: null,
      });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      success: false,
      error: err.message,
    });
  }
});

export default router;
