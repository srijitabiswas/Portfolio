import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company:        { type: String, required: true },
    role:           { type: String, required: true },
    employmentType: { type: String, default: "" }, // "Full-time", "Internship", "Freelance"
    startDate:      { type: Date, required: true },
    endDate:        { type: Date },                 // omitted = "Present"
    location:       { type: String, default: "" },
    description:    { type: String, default: "" },
    achievements:   [{ type: String }],
    technologies:   [{ type: String }],
    companyWebsite: { type: String, default: "" },
    companyLogo:    { type: String, default: "" },
    order:          { type: Number, default: 0 },
    published:      { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);
