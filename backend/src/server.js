import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";

import { env } from "./config/env.js";

import attendanceRoutes from "./routes/attendance.js";
import notificationRoutes from "./routes/notifications.js";
import progressRoutes from "./routes/progress.js";
import healthRoutes from "./routes/health.js";
import publicRoutes from "./routes/public.js";
import chatRoutes from "./routes/chat.routes.js";

import { notFound, errorHandler } from "./middleware/error.js";

// 🔹 Path helpers (ESM fix)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 🔹 Security & middlewares
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 60000, max: 120 }));

// 🔹 API routes
app.use("/api", healthRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/chat", chatRoutes);

// 🔹 FRONTEND SERVE (🔥 FIX HERE 🔥)
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// 🔹 React SPA fallback
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../frontend/dist/index.html")
  );
});

// 🔹 Error handlers (LAST)
app.use(notFound);
app.use(errorHandler);

// 🔹 Start server
app.listen(env.PORT, () =>
  console.log(`✅ Server running on port ${env.PORT}`)
);
