import express from "express";
import { db } from "../config/firebaseAdmin.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  const { title, message, createdBy, roleAllowed } = req.body;

  if (!title || !message)
    return res.status(400).json({ success: false });

  const ref = await db.collection("notifications").add({
    title,
    message,
    createdBy,
    roleAllowed: roleAllowed || "student",
    createdAt: new Date(),
  });

  res.json({ success: true, id: ref.id });
});

router.get("/list", async (_, res) => {
  const snap = await db
    .collection("notifications")
    .orderBy("createdAt", "desc")
    .get();

  res.json({
    success: true,
    notes: snap.docs.map(d => ({ id: d.id, ...d.data() })),
  });
});

router.delete("/:id", async (req, res) => {
  await db.collection("notifications").doc(req.params.id).delete();
  res.json({ success: true });
});

export default router;
