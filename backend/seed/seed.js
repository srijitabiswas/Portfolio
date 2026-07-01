import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import Project from "../models/Project.js";
import Hackathon from "../models/Hackathon.js";
import Certification from "../models/Certification.js";
import Experience from "../models/Experience.js";
import { AdminUser, Skill, Exploring, SocialLink } from "../models/misc.js";

dotenv.config();
await connectDB();

/* ── 1. Seed the single admin account (idempotent) ── */
const existingAdmin = await AdminUser.findOne({ email: process.env.ADMIN_EMAIL });
if (!existingAdmin) {
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  await AdminUser.create({ email: process.env.ADMIN_EMAIL, passwordHash });
  console.log("✅ Admin account created:", process.env.ADMIN_EMAIL);
} else {
  console.log("ℹ️  Admin account already exists, skipping.");
}

/* ── 2. Seed projects with exact dates you specified ──
   Dates drive automatic ordering — newest endDate first.
   Case-study deep content (overview/problem/solution/sections/techStack)
   can be filled in or refined later via the admin dashboard — that's the
   whole point of this system. Card-level fields below are complete. */

const projects = [
  {
    title: "Glow-AI",
    slug: "glowai",
    thumbnail: "/images/glowai.png",
    category: "AI · Computer Vision · Marketplace",
    tagline: "AI beauty & salon marketplace with live facial-analysis scanning, an LLM concierge, and a Mumbai-wide salon discovery engine. Built in a 48-hour buildathon.",
    accent: "#EC4899",
    icon: "✨",
    startDate: new Date("2026-06-16"),
    endDate:   new Date("2026-06-19"),
    datePrecision: "day",
    type: "Hackathon",
    cardTags: ["React", "MediaPipe", "Groq LLM", "Tailwind"],
    filter: "ML",
    links: [
      { label: "Live Demo", href: "https://glow-ai-frontend.onrender.com", icon: "🌐" },
      { label: "Demo Video", href: "https://youtu.be/yUpHiGzo7LA?si=iIN__hrd0UWDE1d5", icon: "▶" },
      { label: "View Code", href: "https://github.com/Shrezzzzz/Glow-AI", icon: "⌥" },
    ],
    caseStudy: {
      subtitle: "AI beauty & salon marketplace with live facial-analysis scanning, an LLM concierge for personalized recommendations, and a Mumbai-wide salon discovery engine.",
      tags: ["React", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MediaPipe", "Groq LLM"],
      color: "#FCEAF3",
      overview: "Glow-AI is an AI-powered beauty, grooming, and salon marketplace that delivers personalized beauty analysis, style recommendations, and salon discovery in one seamless experience.",
      problem: "Choosing the right hairstyle, skincare routine, or salon is overwhelming without expert guidance — generic advice doesn't account for someone's actual face shape, skin tone, or budget.",
      solution: "Glow-AI runs a live webcam beauty scan through MediaPipe face landmarking to detect face shape, skin tone, undertone, and facial symmetry, feeding a Groq-powered LLM concierge for personalized advice and salon ranking.",
      sections: [
        { title: "AI Beauty Scan Pipeline", body: ["Live webcam scan with guided capture and smile detection", "Real-time validation — face detected, centered, well-lit, not blurry", "MediaPipe Face Landmarker extracts facial geometry", "Face shape, skin tone & undertone, symmetry scoring"] },
        { title: "Glow AI Concierge", body: "Conversational AI powered by Groq's Llama 3.3 70B, streamed via Server-Sent Events for real-time beauty advice, salon recommendations, and bridal planning." },
        { title: "My Role", body: "I led UI/UX design and frontend development for the camera-scan flow, beauty profile wizard, and salon marketplace browsing experience." },
      ],
      techStack: [
        { label: "Frontend", items: ["React 18", "Vite", "Tailwind CSS", "Framer Motion"] },
        { label: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
        { label: "AI & Computer Vision", items: ["Groq API (Llama 3.3 70B)", "MediaPipe"] },
      ],
      team: ["Shreya Chowdhury", "Prakriti Sarkar", "Srijita Biswas"],
    },
  },
  {
    title: "MediFlow",
    slug: "mediflow",
    thumbnail: "/images/mediflow.png",
    category: "Full-Stack · AI Healthcare",
    tagline: "AI-powered hospital queue & appointment system that predicts wait times in real time and tells patients exactly when to leave.",
    accent: "#22C55E",
    icon: "🏥",
    startDate: new Date("2026-06-20"),
    endDate:   new Date("2026-06-22"),
    datePrecision: "day",
    type: "Hackathon",
    cardTags: ["React", "Node.js", "Socket.io", "MongoDB"],
    filter: "Dev",
    links: [
      { label: "Live Demo", href: "https://mediflow-5zon.onrender.com/", icon: "🌐" },
      { label: "Demo Video", href: "https://youtu.be/QoBl4wYs3wc?si=qaCWAS1mEtW1yxXn", icon: "▶" },
      { label: "View Code", href: "https://github.com/srijitabiswas/MediFlow", icon: "⌥" },
    ],
    caseStudy: {
      subtitle: "AI-powered hospital queue & appointment system that predicts wait times in real time.",
      tags: ["React", "Vite", "Tailwind CSS", "Node.js", "Socket.io", "MongoDB"],
      color: "#E8F5F0",
      overview: "MediFlow reduces patient waiting time through real-time queue tracking, intelligent wait-time estimation, and AI-powered recommendations.",
      problem: "Traditional hospital token systems only display a queue position — they don't tell patients when to leave home or whether the doctor is delayed.",
      solution: "MediFlow combines real-time queue monitoring, AI-based wait-time prediction, delay transparency, and smart recommendations via live Socket.io events.",
      sections: [
        { title: "Key Features", body: ["Patient Portal with live queue position and smart arrival recommendations", "Doctor Dashboard for delay reporting and emergency insertion", "Admin Dashboard for analytics", "Built-in chatbot assistant"] },
        { title: "Future Scope", body: ["ML-based wait prediction", "SMS/WhatsApp notifications", "Multi-hospital support"] },
      ],
      techStack: [
        { label: "Frontend", items: ["React", "Vite", "Tailwind CSS"] },
        { label: "Backend", items: ["Node.js", "Express.js", "Socket.io", "MongoDB"] },
      ],
      team: ["Srijita Biswas"],
    },
  },
  {
    title: "DeskGuard",
    slug: "deskguard",
    thumbnail: "/images/deskguard.png",
    category: "Full-Stack · Library Systems",
    tagline: "University library seat-management OS with live SVG floor maps, a trust-score system, and abandoned-seat auto-detection.",
    accent: "#2563EB",
    icon: "🪪",
    startDate: new Date("2026-05-01"),
    datePrecision: "month",
    type: "Personal Project",
    cardTags: ["React", "Node.js", "MongoDB", "Framer Motion"],
    filter: "Dev",
    links: [
      { label: "Live Demo", href: "https://deskguard-2.onrender.com/", icon: "🌐" },
      { label: "View Code", href: "https://github.com/srijitabiswas/DeskGuard", icon: "⌥" },
    ],
    caseStudy: {
      subtitle: "University library seat-management OS with live SVG floor maps and a trust-score system.",
      tags: ["React 18", "Vite", "Tailwind CSS 3", "Framer Motion", "Node.js", "MongoDB"],
      color: "#EAF1FB",
      overview: "DeskGuard replaces first-come-first-served chaos with a fair, transparent reservation system across Student, Librarian, and Admin roles.",
      problem: "University libraries struggle with seat hoarding, no-shows, and zero visibility into real occupancy.",
      solution: "A two-phase reserve-then-check-in flow holds seats for 10 minutes, auto-releasing no-shows, while a Responsible Study Score rewards honored reservations.",
      sections: [
        { title: "Student Features", body: ["Smart Library Map with live SVG floor status", "Find Me a Seat preference-based recommendations", "Buddy Study for group reservations"] },
        { title: "Librarian Features", body: ["Live Command Center", "Abandoned Seat Detection", "Emergency Mode"] },
      ],
      techStack: [
        { label: "Frontend", items: ["React 18", "Vite", "Tailwind CSS 3", "Framer Motion"] },
        { label: "Backend", items: ["Node.js", "Express 4", "MongoDB", "JWT"] },
      ],
      team: ["Srijita Biswas"],
    },
  },
  {
    title: "Savor",
    slug: "savor",
    thumbnail: "/images/savor.png",
    category: "Full-Stack · Decision UX",
    tagline: "Decision-first food ordering platform with a natural-language AI Crave Assistant and 1,100+ structured dish records.",
    accent: "#D4712A",
    icon: "🍽️",
    startDate: new Date("2026-04-01"),
    endDate:   new Date("2026-06-01"),
    datePrecision: "month",
    type: "Personal Project",
    cardTags: ["React", "Node.js", "MongoDB", "AI"],
    filter: "UX",
    links: [
      { label: "Live Demo", href: "https://savor-a-decision-first-food-ordering-app-p0yi.onrender.com", icon: "🌐" },
      { label: "View Code", href: "https://github.com/srijitabiswas/Savor-A-decision-first-food-ordering-app", icon: "⌥" },
    ],
    caseStudy: {
      subtitle: "Decision-first food ordering platform with a natural-language AI Crave Assistant, built on a real MERN stack with 1,100+ dish records.",
      tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
      color: "#FFF0E6",
      overview: "Savor guides users to the right meal through budget-first filtering, curated recommendations, and Crave Assistant — a conversational AI that understands natural-language cravings.",
      problem: "Most food delivery apps prioritize endless scrolling over decision-making, overwhelming users with choice and weak personalization.",
      solution: "A custom intent-detection layer parses budget, spice, diet, and allergens from natural language, then scores dishes via MongoDB aggregation — zero external AI API cost.",
      sections: [
        { title: "Key Features", body: ["Crave Assistant natural-language AI", "Budget-first discovery", "1,100+ dishes across global cuisines", "Full MERN backend with JWT auth"] },
        { title: "Future Scope", body: ["Payment gateway integration", "Order history-based personalization", "Live order tracking"] },
      ],
      techStack: [
        { label: "Frontend", items: ["React 18", "Vite", "Tailwind CSS", "Context API"] },
        { label: "Backend", items: ["Node.js", "Express", "MongoDB", "JWT", "bcrypt"] },
        { label: "AI / Recommendation Engine", items: ["Custom NLP intent-detection", "MongoDB aggregation scoring"] },
      ],
      team: ["Srijita Biswas"],
    },
  },
  {
    title: "ZeroShield AI",
    slug: "zeroshield",
    thumbnail: "/images/zeroshield.png",
    category: "Full-Stack · Cybersecurity",
    tagline: "AI-powered cybersecurity SOC dashboard with real-time threat detection, attack simulation, and automated response handling.",
    accent: "#C43030",
    icon: "🛡️",
    startDate: new Date("2026-04-22"),
    endDate:   new Date("2026-05-01"),
    datePrecision: "day",
    type: "Hackathon",
    cardTags: ["React", "Node.js", "TypeScript", "Tailwind"],
    filter: "Dev",
    links: [
      { label: "Demo Video", href: "https://youtu.be/KWsmJgv7vKU?si=6MPcR84HllX1122L", icon: "▶" },
      { label: "View Code", href: "https://github.com/srijitabiswas/ZeroShield-AI", icon: "⌥" },
    ],
    caseStudy: {
      subtitle: "AI-powered cybersecurity SOC dashboard with real-time threat detection and an attack simulation engine.",
      tags: ["React", "Vite", "TypeScript", "Tailwind CSS", "Node.js"],
      color: "#1A1414",
      overview: "ZeroShield AI is a security operations center dashboard that visualizes live threats and simulates attacks for training purposes.",
      problem: "Small security teams often lack affordable, visual SOC tooling for monitoring and response training.",
      solution: "A modular simulation engine generates realistic attack scenarios while a live dashboard visualizes detection and automated response flows.",
      sections: [
        { title: "Key Features", body: ["Real-time threat visualization", "Attack simulation engine", "Automated response handling"] },
      ],
      techStack: [
        { label: "Frontend", items: ["React", "Vite", "TypeScript", "Tailwind CSS", "Radix UI"] },
        { label: "Backend", items: ["Node.js", "Express"] },
        { label: "Visualisation", items: ["Recharts"] },
      ],
      team: ["Shreya Chowdhury", "Prakriti Sarkar", "Srijita Biswas"],
    },
  },
  {
    title: "Fake News Classification",
    slug: "fakenews",
    thumbnail: "/images/fakenews.png",
    category: "NLP · Machine Learning",
    tagline: "NLP-based supervised ML system that classifies news articles as fake or real with 93.58% accuracy.",
    accent: "#C4A000",
    icon: "📰",
    startDate: new Date("2026-04-01"),
    datePrecision: "month",
    type: "Academic",
    cardTags: ["Python", "TF-IDF", "Scikit-learn"],
    filter: "ML",
    links: [],
    caseStudy: {
      subtitle: "NLP-based supervised ML system that classifies news articles as fake or real.",
      tags: ["Python", "TF-IDF", "Scikit-learn"],
      color: "#1A1810",
      overview: "A supervised machine learning pipeline that classifies news articles as fake or real using TF-IDF vectorization and classical ML models.",
      problem: "Misinformation spreads faster than fact-checking can keep up, requiring automated first-pass detection tools.",
      solution: "TF-IDF feature extraction combined with tuned classifiers achieves 93.58% accuracy on held-out test data.",
      sections: [
        { title: "Key Features", body: ["TF-IDF vectorization pipeline", "Model comparison across multiple classifiers", "93.58% test accuracy"] },
      ],
      techStack: [
        { label: "Languages & Libraries", items: ["Python", "Scikit-learn", "Pandas", "NumPy"] },
      ],
      team: ["Srijita Biswas"],
    },
  },
  {
    title: "TeamForge",
    slug: "teamforge",
    thumbnail: "/images/teamforge.png",
    category: "Full-Stack · Collaboration Platform",
    tagline: "Student innovation OS guiding idea → team → execution, with a TeamDNA compatibility system.",
    accent: "#8B5CF6",
    icon: "🧩",
    startDate: new Date("2026-03-01"),
    datePrecision: "month",
    type: "Personal Project",
    cardTags: ["React", "Node.js", "MongoDB", "Matching AI"],
    filter: "Dev",
    links: [
      { label: "Live Demo", href: "https://team-forge-1-gws7.onrender.com/", icon: "🌐" },
      { label: "View Code", href: "https://github.com/srijitabiswas/Team-Forge", icon: "⌥" },
    ],
    caseStudy: {
      subtitle: "Student innovation OS guiding idea → team → execution, scoring team compatibility via a TeamDNA system.",
      tags: ["React", "Vite", "Tailwind CSS", "Node.js", "MongoDB"],
      color: "#F1ECFB",
      overview: "TeamForge helps students turn ideas into real projects through the complete journey: IDEA → TEAM → CHEMISTRY → BUILD → EXECUTION.",
      problem: "Students often have great ideas but struggle to find compatible teammates and stay organized through execution.",
      solution: "IdeaForge converts plain-language ideas into required roles and a viability score, while a TeamDNA quiz scores chemistry before a team commits.",
      sections: [
        { title: "Smart Matching System", body: "Explainable scoring algorithms across idea generation, collaborator recommendations, and team chemistry analysis." },
      ],
      techStack: [
        { label: "Frontend", items: ["React", "Vite", "Tailwind CSS"] },
        { label: "Backend", items: ["Node.js", "Express.js", "MongoDB", "JWT"] },
      ],
      team: ["Srijita Biswas"],
    },
  },
  {
    title: "LuxeStay Villas",
    slug: "luxestay",
    thumbnail: "/images/luxestay.png",
    category: "UX Design · Figma",
    tagline: "End-to-end product design for a dual-sided rental platform — from research to high-fidelity prototypes.",
    accent: "#7C6FCD",
    icon: "🏖️",
    startDate: new Date("2025-12-15"),
    endDate:   new Date("2026-01-30"),
    datePrecision: "day",
    type: "Personal Project",
    cardTags: ["Figma", "UX Research", "Prototyping"],
    filter: "UX",
    links: [],
    caseStudy: {
      subtitle: "End-to-end product design for a dual-sided villa rental platform.",
      tags: ["Figma", "UX Research", "Prototyping"],
      color: "#EFEBFA",
      overview: "LuxeStay is a high-fidelity UX case study covering research, wireframes, and prototyping for a dual-sided rental marketplace.",
      problem: "Dual-sided marketplaces (hosts and guests) need clearly separated yet connected flows.",
      solution: "Structured research informed distinct host and guest journeys, validated through high-fidelity Figma prototypes.",
      sections: [
        { title: "Design Process", body: "User research, wireframing, and iterative high-fidelity prototyping in Figma." },
      ],
      techStack: [
        { label: "Design", items: ["Figma", "Prototyping", "User Research"] },
      ],
      team: ["Srijita Biswas"],
    },
  },
  {
    title: "Wellness Personas of SNU",
    slug: "wellness",
    thumbnail: "/images/wellness.png",
    category: "ML · Streamlit",
    tagline: "ML-powered lifestyle persona discovery app using KMeans clustering with interactive sliders and radar charts.",
    accent: "#2E5FE8",
    icon: "🧘",
    startDate: new Date("2025-11-01"),
    datePrecision: "month",
    type: "Academic",
    cardTags: ["Python", "Scikit-learn", "Streamlit"],
    filter: "ML",
    links: [],
    caseStudy: {
      subtitle: "ML-powered lifestyle persona discovery app using KMeans clustering.",
      tags: ["Python", "Scikit-learn", "Streamlit"],
      color: "#101830",
      overview: "Users discover their wellness persona through interactive sliders and radar-chart visualizations, powered by KMeans clustering.",
      problem: "Generic wellness advice doesn't reflect individual lifestyle patterns.",
      solution: "Unsupervised clustering on lifestyle survey data groups users into distinct wellness personas, visualized interactively.",
      sections: [
        { title: "Key Features", body: ["KMeans clustering on lifestyle data", "Interactive sliders", "Radar chart visualization"] },
      ],
      techStack: [
        { label: "Languages & Libraries", items: ["Python", "Scikit-learn", "Streamlit"] },
      ],
      team: ["Srijita Biswas"],
    },
  },
  {
    title: "SplitX",
    slug: "splitx",
    thumbnail: "/images/splitx.png",
    category: "Full-Stack · Expense Tracking",
    tagline: "Smart group expense tracker with automatic splitting, settlement tracking, and a trust-score badge system.",
    accent: "#2D8653",
    icon: "💸",
    startDate: new Date("2025-08-24"),
    datePrecision: "day",
    type: "Hackathon",
    displayLabel: "24 Aug 2025 (36-hour Hackathon)",
    cardTags: ["JavaScript", "Node.js", "MongoDB"],
    filter: "Dev",
    links: [
      { label: "Live Demo", href: "https://split-x-umber.vercel.app/", icon: "🌐" },
      { label: "Demo Video", href: "https://youtu.be/XQ5NcQqnnzA?si=PS32KuPk1aS1AcEi", icon: "▶" },
      { label: "View Code", href: "https://github.com/srijitabiswas/SplitX-", icon: "⌥" },
    ],
    caseStudy: {
      subtitle: "Smart group expense tracker with automatic splitting and settlement tracking.",
      tags: ["JavaScript", "Node.js", "Express.js", "MongoDB"],
      color: "#0F1A14",
      overview: "SplitX simplifies group spending, settlements, and shared financial management for trips, roommates, and teams.",
      problem: "Manually tracking who owes what across a group leads to confusion and awkward conversations.",
      solution: "Automatic expense splitting, settlement tracking, and a trust-score badge system keep everyone accountable.",
      sections: [
        { title: "Key Features", body: ["Create and manage expense groups", "Automatic splitting among members", "Real-time balance calculations"] },
      ],
      techStack: [
        { label: "Frontend", items: ["HTML", "Tailwind CSS", "JavaScript"] },
        { label: "Backend", items: ["Node.js", "Express.js", "MongoDB", "Mongoose"] },
      ],
      team: ["Srijita Biswas"],
    },
  },
];

await Project.deleteMany({});
await Project.insertMany(projects);
console.log(`✅ Seeded ${projects.length} projects with their original dates.`);

/* ── 3. Seed Hackathons ──
   "Girls Hackathon" and "Smart India Hackathon" are intentionally NOT
   seeded — they'll be added later via the admin dashboard. Each of these
   four links to its matching project via projectSlug, powering the
   "View Project" button on the public hackathon card. */
const hackathons = [
  {
    name: "AI Startup Buildathon 2026 – Beauty Salon Marketplace Challenge",
    date: "Jun 2026",
    badge: "48-Hour Buildathon",
    bullets: [
      "Built Glow-AI, an AI-powered beauty and salon marketplace, from scratch in 48 hours.",
      "Led UI/UX design and frontend development for the AI face-scan and salon-discovery experience.",
    ],
    projectSlug: "glowai",
    order: 1,
  },
  {
    name: "Bharat Academix CodeQuest",
    date: "2026",
    badge: "",
    bullets: [
      "Competed in a national-level coding and product-building challenge focused on solving real-world problems using technology.",
    ],
    projectSlug: "mediflow",
    order: 2,
  },
  {
    name: "Cloud Innovation Challenge",
    date: "Mar 2026 – Apr 2026",
    badge: "🏆 Top 150 of 1.4K+ participants",
    bullets: [
      "Led product design, user flow planning, and prototype development.",
      "Built an AI-powered solution addressing the challenge brief end-to-end.",
    ],
    projectSlug: "zeroshield",
    order: 3,
  },
  {
    name: "Status Code 2.0",
    date: "Aug 2025",
    badge: "",
    bullets: [
      "Participated in a collaborative hackathon involving problem-solving, development, and team-based project building.",
    ],
    projectSlug: "splitx",
    order: 4,
  },
];

await Hackathon.deleteMany({});
await Hackathon.insertMany(hackathons);
console.log(`✅ Seeded ${hackathons.length} hackathons.`);

/* ── 4. Seed Certifications ── */
const certifications = [
  { title: "National Cloud Innovation Challenge – National Finalist (Top 150)", organization: "Unstop", issueDate: new Date("2026-01-01"), credentialUrl: "https://unstop.com/certificate-preview/1027380c-2f68-477b-8d50-6bad3c6826d1" },
  { title: "Google UX Design", organization: "Google", issueDate: new Date("2026-01-01"), credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/MNZG5823BEWA" },
  { title: "Digital Transformation & Product Design", organization: "Employability.life", issueDate: new Date("2026-01-01"), credentialUrl: "https://verify.employability.life/verify?data=U2FsdGVkX1%2B1qEqkuZHLmCW%2BsC84ygmTb5Qw8nEi3UydXmE5iF7B81T%2F7p5lwzczV4OHx3DfcS90ZCe0qaW%2F2DwvFzZVCndWwMKAwm28gGc%3D" },
  { title: "Design Thinking for Innovation", organization: "Univ. of Virginia", issueDate: new Date("2025-01-01"), credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/L0FBDJ3HWC16" },
  { title: "Introduction to Artificial Intelligence (AI)", organization: "Coursera", issueDate: new Date("2025-01-01"), credentialUrl: "https://www.coursera.org/account/accomplishments/verify/2I7B575SEINP" },
  { title: "Introduction to Generative AI", organization: "Google Cloud", issueDate: new Date("2025-01-01"), credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/RA7BCCALZL72" },
  { title: "Generative AI: Introduction and Applications", organization: "IBM", issueDate: new Date("2025-01-01"), credentialUrl: "https://www.coursera.org/account/accomplishments/verify/QBB3SXADCZWO" },
  { title: "Machine Learning and NLP Basics", organization: "Coursera", issueDate: new Date("2025-01-01"), credentialUrl: "https://www.coursera.org/account/accomplishments/verify/IO8DPNDQYXBN" },
  { title: "Algorithms for Searching, Sorting, and Indexing", organization: "Coursera", issueDate: new Date("2025-01-01"), credentialUrl: "https://www.coursera.org/account/accomplishments/verify/VP08S60S8XLL" },
  { title: "Python for Data Science, AI & Development", organization: "IBM", issueDate: new Date("2025-01-01"), credentialUrl: "https://www.coursera.org/account/accomplishments/verify/5G38LS2269UX" },
  { title: "Trees and Graphs: Basics", organization: "Coursera", issueDate: new Date("2025-01-01"), credentialUrl: "https://www.coursera.org/account/accomplishments/verify/QQJHN29OXZY5" },
].map((c, i) => ({ ...c, order: i + 1 }));

await Certification.deleteMany({});
await Certification.insertMany(certifications);
console.log(`✅ Seeded ${certifications.length} certifications.`);

/* ── 5. Seed Skills ── */
const skillGroups = {
  "Languages": ["C", "C++", "Java", "Python", "JavaScript"],
  "Web Development": ["React", "Vite", "Node.js", "Express.js", "Tailwind CSS", "Socket.io"],
  "Databases": ["MongoDB", "MySQL"],
  "AI & Machine Learning": ["Scikit-learn", "Streamlit", "Recommendation Systems", "Computer Vision", "Generative AI"],
  "Tools & Design": ["Git", "GitHub", "VS Code", "Figma", "Canva"],
};
const skills = [];
let skillOrder = 0;
for (const [category, names] of Object.entries(skillGroups)) {
  for (const name of names) {
    skills.push({ name, category, order: skillOrder++ });
  }
}

await Skill.deleteMany({});
await Skill.insertMany(skills);
console.log(`✅ Seeded ${skills.length} skills across ${Object.keys(skillGroups).length} categories.`);

/* ── 6. Seed "Currently Exploring" ── */
const exploringTopics = [
  "Artificial Intelligence & Machine Learning",
  "Full-Stack MERN Development",
  "Product Design & UX",
  "Recommendation Systems",
  "Intelligent Decision Support Platforms",
  "Scalable Web Applications",
].map((topic, i) => ({ topic, order: i }));

await Exploring.deleteMany({});
await Exploring.insertMany(exploringTopics);
console.log(`✅ Seeded ${exploringTopics.length} "Currently Exploring" topics.`);

/* ── 7. Seed Social Links ── */
const socialLinks = [
  { platform: "Email", url: "mailto:srijitabiswas05@gmail.com", order: 0 },
  { platform: "GitHub", url: "https://github.com/srijitabiswas", order: 1 },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/srijita-biswas-9690a3284", order: 2 },
].map((l) => ({ ...l, label: "" }));

await SocialLink.deleteMany({});
await SocialLink.insertMany(socialLinks);
console.log(`✅ Seeded ${socialLinks.length} social links.`);

/* ── 8. Seed Work Experience ── */
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

/* Note: Resume is NOT seeded — it requires an actual PDF file upload,
   which can't be seeded as text data. Upload it once via /admin/resume. */

process.exit(0);