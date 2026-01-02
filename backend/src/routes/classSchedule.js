import { Router } from "express";

const router = Router();

router.post("/add", async (req, res) => {
  try {
    const { subject, day, startTime, endTime, room, facultyName } = req.body;

    if (!subject || !day || !startTime || !endTime || !room) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // TEMP response (DB later)
    res.status(201).json({
      success: true,
      message: "Class schedule added",
      data: {
        subject,
        day,
        startTime,
        endTime,
        room,
        facultyName,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
