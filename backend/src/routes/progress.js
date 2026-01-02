import { Router } from "express";
import { db } from "../config/firebaseAdmin.js";

const router = Router();

router.post("/sync", async (req, res) => {
  const { userId, lessonsCompleted, badges } = req.body;

  await db.collection("progress").doc(userId).set(
    {
      lessonsCompleted,
      badges,
      lastSyncAt: new Date(),
    },
    { merge: true }
  );

  res.json({ success: true });
});

export default router;
