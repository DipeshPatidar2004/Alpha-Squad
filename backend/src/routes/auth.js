import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const auth = (req, res, next) => {

  // ✅ DEV MODE BYPASS (VERY IMPORTANT)
  if (env.NODE_ENV === "development") {
    req.user = {
      id: "DEV_STUDENT_ID",
      name: "Demo Student",
      role: "student",
    };
    return next();
  }

  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded; // { id, email }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
