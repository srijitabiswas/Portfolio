import mongoose from "mongoose";

/* ── Skill ── */
const skillSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true },
    category: { type: String, required: true }, // "Languages", "Web Development", "Databases", "AI & Machine Learning", "Tools & Design"
    order:    { type: Number, default: 0 },
    published:{ type: Boolean, default: true },
  },
  { timestamps: true }
);
export const Skill = mongoose.model("Skill", skillSchema);

/* ── Currently Exploring ── */
const exploringSchema = new mongoose.Schema(
  {
    topic:  { type: String, required: true },
    order:  { type: Number, default: 0 },
  },
  { timestamps: true }
);
export const Exploring = mongoose.model("Exploring", exploringSchema);

/* ── Social Links ── */
const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true }, // "GitHub", "LinkedIn", "Email", "Portfolio", "YouTube", "X", "Custom"
    label:    { type: String, default: "" },    // custom display label, for "Other custom links"
    url:      { type: String, required: true },
    order:    { type: Number, default: 0 },
  },
  { timestamps: true }
);
export const SocialLink = mongoose.model("SocialLink", socialLinkSchema);

/* ── Resume — only ever one active record; uploading a new one supersedes the last ── */
const resumeSchema = new mongoose.Schema(
  {
    fileUrl:  { type: String, required: true },
    fileName: { type: String, default: "resume.pdf" },
    active:   { type: Boolean, default: true },
  },
  { timestamps: true }
);
export const Resume = mongoose.model("Resume", resumeSchema);

/* ── Admin User — single account, seeded once via env vars, never publicly registerable ── */
const adminUserSchema = new mongoose.Schema(
  {
    email:        { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);
export const AdminUser = mongoose.model("AdminUser", adminUserSchema);
