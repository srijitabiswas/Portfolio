import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true },
    date:        { type: String, required: true }, // free text, e.g. "Mar 2026 – Apr 2026"
    badge:       { type: String, default: "" },     // e.g. "🏆 Top 150 of 1.4K+ participants"
    bullets:     [{ type: String }],
    projectSlug: { type: String, default: "" },     // if set, shows a "View Project" button linking to /case/:slug
    order:       { type: Number, default: 0 },
    published:   { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Hackathon", hackathonSchema);
