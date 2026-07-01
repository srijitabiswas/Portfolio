import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import resumeRoutes from "./routes/resume.js";
import uploadRoutes from "./routes/upload.js";
import contactRoutes from "./routes/contact.js";
import {
  certificationRoutes,
  experienceRoutes,
  hackathonRoutes,
  skillRoutes,
  exploringRoutes,
  socialLinkRoutes,
} from "./routes/miscRoutes.js";

dotenv.config();
await connectDB();

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(express.json({ limit: "5mb" }));

// Collapse accidental double slashes (e.g. a frontend env var with a
// trailing slash turning "/api/" + "/contact" into "/api//contact")
// so a stray slash never falls through to the 404 handler below.
app.use((req, res, next) => {
  if (req.url.includes("//")) {
    req.url = req.url.replace(/\/{2,}/g, "/");
  }
  next();
});

// Rate-limit the login route specifically — this is the most attacked endpoint
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many login attempts. Try again later." },
});
app.use("/api/auth/login", loginLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/hackathons", hackathonRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/exploring", exploringRoutes);
app.use("/api/social-links", socialLinkRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/contact", contactRoutes);

app.use("/uploads", express.static("uploads"));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// 404 for unmatched API routes
app.use("/api", (req, res) => res.status(404).json({ message: "Route not found" }));

// Global error handler — catches multer errors (file too large, bad type) and anything unhandled
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === "MulterError") {
    return res.status(400).json({ message: err.message });
  }
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));