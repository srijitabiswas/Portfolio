import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    label: { type: String, required: true }, // "Live Demo", "View Code", "Demo Video"
    href:  { type: String, required: true },
    icon:  { type: String, default: "🌐" },
  },
  { _id: false }
);

const techGroupSchema = new mongoose.Schema(
  {
    label: { type: String, required: true }, // "Frontend", "Backend", "Additional", "Deployment"
    items: [{ type: String }],
  },
  { _id: false }
);

const sectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // "Key Features", "Core Innovation", "User Flow", etc.
    body: mongoose.Schema.Types.Mixed,         // string OR string[] — CaseLayout already supports both
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    /* ── Basic Information ── */
    title:     { type: String, required: true, trim: true },
    slug:      { type: String, required: true, unique: true, lowercase: true }, // used for /case/:slug
    category:  { type: String, required: true },   // "Full-Stack · AI Healthcare"
    tagline:   { type: String, required: true },   // short card description
    thumbnail: { type: String, default: "" },       // image URL
    accent:    { type: String, default: "#8B5CF6" },// card accent color
    icon:      { type: String, default: "🚀" },     // emoji fallback if no thumbnail

    /* ── Dates (drive automatic ordering — NEVER a manual number field) ── */
    startDate:     { type: Date, required: true },
    endDate:       { type: Date },                     // optional — omitted = ongoing/single date
    datePrecision: { type: String, enum: ["day", "month"], default: "month" },
    type: {
      type: String,
      enum: ["Hackathon", "Personal Project", "Internship", "Freelance", "Team Project", "Academic", ""],
      default: "",
    },
    displayLabel: { type: String, default: "" }, // manual override, e.g. "24 Aug 2025 (36-hour Hackathon)"

    /* ── Tech stack shown on the card (short tag list) ── */
    cardTags: [{ type: String }],

    /* ── Filtering ── */
    filter: { type: String, enum: ["UX", "Dev", "ML"], default: "Dev" },

    /* ── External Links ── */
    links: [linkSchema],

    /* ── Case Study (maps 1:1 onto <CaseLayout /> props — format never changes) ── */
    caseStudy: {
      subtitle: { type: String, default: "" },
      tags:     [{ type: String }],          // chips shown at top of case page
      color:    { type: String, default: "#1A1A1A" },
      overview: { type: String, default: "" },
      problem:  { type: String, default: "" },
      research: { type: String, default: "" },
      solution: { type: String, default: "" },
      sections: [sectionSchema],             // Key Features / Core Innovation / User Flow / Role-Based Architecture / Future Scope / etc.
      techStack: [techGroupSchema],          // Frontend / Backend / Additional / Deployment
      team: [{ type: String }],
    },

    /* ── Publishing ── */
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
