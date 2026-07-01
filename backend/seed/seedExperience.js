import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Experience from "../models/Experience.js";

dotenv.config();
await connectDB();

/* Seeds ONLY the Experience collection — safe to run even if you've
   already customized Projects/Hackathons/etc. via the admin dashboard,
   since it doesn't touch any other collection. */

const experience = [
  {
    role: "Product Design Trainee",
    company: "Employability.life",
    startDate: new Date("2025-12-01"),
    endDate: new Date("2026-01-31"),
    achievements: [
      "Led user research, wireframing, prototyping, and UI design across product cycles.",
      "Applied product-thinking frameworks to shape design decisions from concept to delivery.",
    ],
    order: 0,
  },
  {
    role: "Social Media Manager",
    company: "Aperture Alchemist · Student Club",
    startDate: new Date("2025-04-01"),
    // no endDate — omitted on purpose so the UI shows "Present"
    achievements: [
      "Planned and managed Instagram content strategy for community engagement and event promotion.",
      "Drove brand identity initiatives and grew community reach through visual storytelling.",
    ],
    order: 1,
  },
];

await Experience.deleteMany({});
await Experience.insertMany(experience);
console.log(`✅ Seeded ${experience.length} work experience entries.`);

process.exit(0);