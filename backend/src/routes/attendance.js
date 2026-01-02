import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { db } from "../config/firebaseAdmin.js";

const router = Router();
let liveAttendance = null;

function generateCode(length = 4) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

router.post("/start", auth, (req, res) => {
  liveAttendance = {
    code: generateCode(),
    expiresAt: Date.now() + (req.body.durationSeconds || 60) * 1000,
  };
  res.json(liveAttendance);
});

router.post("/mark", auth, async (req, res) => {
  if (!liveAttendance)
    return res.status(400).json({ message: "Attendance not started" });

  if (Date.now() > liveAttendance.expiresAt) {
    liveAttendance = null;
    return res.status(400).json({ message: "Code expired" });
  }

  if (req.body.code !== liveAttendance.code)
    return res.status(400).json({ message: "Invalid code" });

  const date = new Date().toISOString().split("T")[0];
  const studentId = req.user.id;

  const ref = db.collection("attendance").doc(`${studentId}_${date}`);
  if ((await ref.get()).exists)
    return res.status(409).json({ message: "Attendance already marked" });

  await ref.set({
    studentId,
    studentName: req.user.name,
    date,
    code: liveAttendance.code,
    createdAt: new Date(),
  });

  res.json({ message: "Attendance marked successfully" });
});

export default router;
