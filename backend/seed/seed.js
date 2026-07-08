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
      "subtitle": "AI beauty & salon marketplace with live facial-analysis scanning, an LLM concierge for personalized recommendations, and a Mumbai-wide salon discovery engine.",
      "tags": [
        "React",
        "Vite",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MediaPipe",
        "Groq LLM"
      ],
      "color": "#FCEAF3",
      "overview": "Glow-AI is an AI-powered beauty and salon discovery platform that combines facial analysis, personalized beauty recommendations, and location-based salon search into a single experience. Using computer vision and conversational AI, the platform helps users understand their facial features, discover suitable styles, and find nearby salons that match their preferences, budget, and beauty goals.",
      "problem": "Choosing beauty services, hairstyles, or salons often involves trial and error. Most platforms only list nearby salons without offering personalized recommendations based on facial features, skin tone, or individual preferences. Users are left researching multiple sources before making a decision, resulting in uncertainty and inconsistent outcomes.",
      "research": [
        "Studied how users choose beauty services and salons before appointments.",
        "Found that most users depend on social media or trial and error for beauty decisions.",
        "Identified a lack of personalized recommendations in existing salon discovery platforms.",
        "Observed that users want recommendations based on their own facial features rather than generic trends.",
        "Recognized the importance of combining AI analysis with human-friendly explanations.",
        "Concluded that personalization increases user confidence before booking salon services."
      ],
      "solution": "Glow-AI simplifies beauty decisions through AI-powered facial analysis and personalized recommendations. It analyzes facial attributes, understands user preferences, and suggests suitable hairstyles, beauty services, and nearby salons. By combining computer vision, conversational AI, and location intelligence, the platform delivers a more personalized and confident beauty planning experience.",
      "sections": [
        {
          "title": "Product Goals",
          "body": [
            "Personalize beauty recommendations using AI.",
            "Simplify salon discovery based on user preferences.",
            "Reduce uncertainty before booking beauty services.",
            "Help users understand their facial characteristics.",
            "Deliver an interactive and engaging beauty consultation experience.",
            "Combine beauty analysis and salon discovery within one platform."
          ]
        },
        {
          "title": "Design Approach",
          "body": [
            "Designed a guided, step-by-step beauty analysis journey.",
            "Focused on creating a premium and visually engaging interface.",
            "Simplified complex AI outputs into understandable recommendations.",
            "Used conversational interactions to make the experience feel more natural.",
            "Optimized the interface for desktop and mobile devices."
          ]
        },
        {
          "title": "Key Features",
          "body": [
            "AI-powered live beauty scan using webcam.",
            "Automatic face validation with lighting, blur, and smile detection.",
            "Face shape and skin tone analysis.",
            "Personalized beauty profile generation.",
            "AI Beauty Concierge for conversational beauty advice.",
            "Smart salon discovery based on location, budget, and services.",
            "Bridal planner with personalized beauty timeline.",
            "AI-generated beauty recommendations and styling suggestions.",
            "Location-aware salon marketplace with filters and personalized ranking."
          ]
        },
        {
          "title": "Core Innovation",
          "body": [
            "Combines computer vision, conversational AI, and salon discovery within a single platform.",
            "Moves beyond salon listings by delivering recommendations based on real facial analysis.",
            "Explains recommendations using personalized AI insights instead of generic beauty advice.",
            "Creates a complete beauty journey from analysis to salon selection."
          ]
        },
        {
          "title": "Challenges & Decisions",
          "body": [
            "Implemented guided camera validation to improve image quality before analysis.",
            "Simplified technical AI outputs into user-friendly recommendations.",
            "Combined multiple AI services into a seamless workflow.",
            "Designed the experience to build trust through transparent analysis results.",
            "Balanced personalization with an intuitive user interface."
          ]
        },
        {
          "title": "Impact",
          "body": [
            "Helps users make more confident beauty decisions.",
            "Reduces reliance on trial-and-error salon selection.",
            "Improves personalization in beauty recommendations.",
            "Simplifies salon discovery through AI-assisted guidance.",
            "Creates an engaging digital beauty consultation experience."
          ]
        },
        {
          "title": "Future Scope",
          "body": [
            "Virtual hairstyle preview.",
            "AI makeup try-on.",
            "Hair color simulation.",
            "Celebrity look matching.",
            "Online appointment booking.",
            "Payment gateway integration.",
            "Salon owner dashboard.",
            "Loyalty and membership programs."
          ]
        }
      ],
      "techStack": [
        {
          "label": "Frontend",
          "items": [
            "React 18",
            "Vite",
            "Tailwind CSS",
            "Framer Motion"
          ]
        },
        {
          "label": "Backend",
          "items": [
            "Node.js",
            "Express.js",
            "REST APIs"
          ]
        },
        {
          "label": "AI & Computer Vision",
          "items": [
            "Groq API (Llama 3.3 70B)",
            "MediaPipe"
          ]
        }
      ],
      "team": [
        "Shreya Chowdhury",
        "Prakriti Sarkar",
        "Srijita Biswas"
      ]
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
      "subtitle": "AI-powered hospital queue & appointment system that predicts wait times in real time.",
      "tags": [
        "React",
        "Vite",
        "Tailwind CSS",
        "Node.js",
        "Socket.io",
        "MongoDB"
      ],
      "color": "#E8F5F0",
      "overview": "MediFlow is an AI-powered hospital queue and appointment optimization platform designed to make hospital visits more predictable and efficient. Instead of displaying only queue numbers, it provides real-time wait time estimates, live queue tracking, and personalized recommendations that help patients decide when to leave for the hospital. The platform serves three user groups—patients, doctors, and hospital administrators—through dedicated dashboards. By combining real-time updates, intelligent queue management, and AI-assisted decision support, MediFlow improves patient experience while helping hospitals manage appointments and resources more efficiently.",
      "problem": "Traditional hospital queue systems only display token numbers or queue positions, giving patients little visibility into their actual waiting time. As a result, patients often arrive too early, spend long periods waiting, or miss schedule changes caused by doctor delays and emergency cases. Hospitals also struggle with overcrowded waiting areas, limited communication between patients and staff, and a lack of real-time operational insights. Existing systems focus on queue management rather than helping patients make informed decisions.",
      "research": [
        "The primary users are patients, doctors, and hospital administrators.",
        "Patients are more concerned about when they should arrive than their queue position.",
        "Doctors need an easier way to manage delays and emergency consultations.",
        "Administrators require better visibility into queue performance and waiting times.",
        "Long and uncertain waiting periods increase patient frustration.",
        "Poor communication during delays creates confusion and overcrowding.",
        "Real-time transparency can significantly improve the overall hospital experience."
      ],
      "solution": "MediFlow transforms traditional queue management into an intelligent decision-support system. It continuously monitors queue progress, doctor availability, consultation speed, and emergency interruptions to generate dynamic wait-time predictions. Instead of simply displaying queue numbers, the platform provides real-time recommendations such as when to leave for the hospital, whether delays have occurred, and how estimated consultation times change throughout the day.",
      "sections": [
        {
          "title": "Product Goals",
          "body": [
            "Reduce unnecessary patient waiting time.",
            "Improve transparency in hospital queues.",
            "Help patients make informed travel decisions.",
            "Reduce overcrowding inside hospitals.",
            "Provide hospitals with real-time operational insights.",
            "Create a better overall appointment experience."
          ]
        },
        {
          "title": "Design Approach",
          "body": [
            "The platform follows a clean, accessible, and user-friendly interface designed for users of all age groups. Information is presented clearly with minimal cognitive load, allowing patients to quickly understand their queue status without navigating complex screens.",
            "Dedicated dashboards for patients, doctors, and administrators ensure that each user only sees the information relevant to their role."
          ]
        },
        {
          "title": "Key Features",
          "body": [
            "Online appointment booking with real-time queue assignment.",
            "AI-powered wait time prediction that updates continuously.",
            "Live queue tracking with dynamic consultation estimates.",
            "Smart recommendations such as \"Leave Now\" or \"Wait at Home.\"",
            "Instant notifications for doctor delays and emergency cases.",
            "Doctor dashboard for managing appointments and consultation progress.",
            "Admin dashboard with hospital analytics and queue monitoring.",
            "Integrated chatbot for answering common patient queries."
          ]
        },
        {
          "title": "Core Innovation",
          "body": "Unlike traditional hospital systems that only display queue numbers, MediFlow focuses on helping patients make better decisions. It combines live queue monitoring, AI-powered wait-time prediction, doctor status updates, and personalized recommendations to reduce uncertainty throughout the hospital visit."
        },
        {
          "title": "Challenges & Decisions",
          "body": [
            "Built a dynamic prediction system to handle constantly changing queue conditions.",
            "Used Socket.IO to synchronize updates across all dashboards in real time.",
            "Designed role-based interfaces to simplify workflows for different users.",
            "Optimized the UI for accessibility and ease of use across all age groups."
          ]
        },
        {
          "title": "Technical Highlights",
          "body": [
            "AI-powered wait-time prediction engine.",
            "Real-time queue synchronization using Socket.IO.",
            "Role-based dashboards for patients, doctors, and administrators.",
            "Responsive MERN stack application.",
            "RESTful API architecture.",
            "Real-time doctor delay and emergency handling.",
            "Context-based state management.",
            "Secure MongoDB data management."
          ]
        },
        {
          "title": "Impact",
          "body": [
            "Reduces uncertainty during hospital visits.",
            "Minimizes unnecessary waiting inside hospitals.",
            "Improves communication between patients and hospitals.",
            "Enhances operational visibility for administrators.",
            "Creates a more transparent and efficient appointment experience."
          ]
        },
        {
          "title": "Key Learnings",
          "body": [
            "Designing real-time healthcare applications.",
            "Building scalable MERN architecture.",
            "Managing live data synchronization with Socket.IO.",
            "Applying product thinking to solve real-world healthcare problems.",
            "Creating role-based workflows for multiple user types."
          ]
        },
        {
          "title": "Future Scope",
          "body": [
            "Machine learning-based wait-time prediction.",
            "SMS, email, and WhatsApp notifications.",
            "Multi-hospital support.",
            "Online appointment payments.",
            "Appointment rescheduling.",
            "Advanced analytics and reporting dashboard.",
            "Predictive hospital workload forecasting."
          ]
        }
      ],
      "techStack": [
        {
          "label": "Frontend",
          "items": [
            "React",
            "Vite",
            "Tailwind CSS"
          ]
        },
        {
          "label": "Backend",
          "items": [
            "Node.js",
            "Express.js",
            "Socket.io",
            "MongoDB"
          ]
        }
      ],
      "team": [
        "Srijita Biswas"
      ]
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
      "subtitle": "University library seat-management OS with live SVG floor maps and a trust-score system.",
      "tags": [
        "React 18",
        "Vite",
        "Tailwind CSS 3",
        "Framer Motion",
        "Node.js",
        "MongoDB"
      ],
      "color": "#EAF1FB",
      "overview": "DeskGuard is a smart university library seat management system that helps students find, reserve, and manage study spaces efficiently while giving librarians and administrators complete visibility into library occupancy. The platform replaces manual seat allocation with a real-time reservation system, interactive floor maps, and intelligent seat recommendations to improve resource utilization and create a better study experience.",
      "problem": "University libraries often rely on manual or first-come-first-served seating, making it difficult for students to find available desks during peak hours. Seats are frequently occupied without active usage, reservations are difficult to manage, and librarians have limited control over real-time occupancy. This leads to unfair seat usage, wasted resources, and frustration for both students and library staff.",
      "research": [
        "Studied common challenges faced by students during peak library hours.",
        "Identified that students spend significant time searching for available seats.",
        "Found that many reserved seats remain unused because users fail to check in.",
        "Observed limited visibility for librarians to monitor real-time occupancy.",
        "Recognized the need for preference-based seat recommendations instead of manual searching.",
        "Concluded that automating seat allocation improves fairness and resource utilization."
      ],
      "solution": "DeskGuard digitizes the entire library seating process through live seat availability, smart reservations, automated check-in and checkout, and real-time monitoring. Students can quickly find seats based on their preferences, while librarians and administrators gain powerful tools to manage occupancy, identify abandoned seats, and optimize library operations.",
      "sections": [
        {
          "title": "Product Goals",
          "body": [
            "Simplify library seat discovery and reservation.",
            "Improve utilization of available study spaces.",
            "Reduce abandoned and unused seat reservations.",
            "Provide real-time occupancy information.",
            "Enable efficient library management through analytics and monitoring.",
            "Create a fair and transparent reservation system."
          ]
        },
        {
          "title": "Design Approach",
          "body": [
            "Designed an interactive floor map for intuitive seat selection.",
            "Focused on a clean interface that minimizes steps required to reserve a seat.",
            "Created separate dashboards for students, librarians, and administrators.",
            "Used clear visual indicators for seat availability and occupancy.",
            "Optimized the interface for both desktop and mobile devices."
          ]
        },
        {
          "title": "Key Features",
          "body": [
            "Interactive library floor map with live seat availability.",
            "Preference-based seat recommendations using filters such as charging ports, AC zones, window seats, and quiet areas.",
            "Seat reservation with automatic hold, check-in, and checkout workflow.",
            "Automatic release of unused reservations after timeout.",
            "Live study session timer with away mode support.",
            "Responsible Study Score and trust badge system.",
            "Buddy Study feature for reserving adjacent seats for groups.",
            "Librarian dashboard for monitoring occupancy and managing reservations.",
            "Admin dashboard with analytics, student management, and library configuration."
          ]
        },
        {
          "title": "Core Innovation",
          "body": [
            "Replaces static seat allocation with an intelligent reservation system.",
            "Combines real-time occupancy tracking with preference-based seat recommendations.",
            "Introduces automated check-in, timeout handling, and trust scoring to ensure fair seat usage.",
            "Provides operational insights through analytics rather than simple seat monitoring."
          ]
        },
        {
          "title": "Challenges & Decisions",
          "body": [
            "Designed an interactive SVG floor map that updates seat status in real time.",
            "Implemented automatic reservation expiry to prevent seat hoarding.",
            "Built separate workflows for students, librarians, and administrators.",
            "Created a trust score system to encourage responsible seat usage.",
            "Optimized the platform to handle live occupancy updates efficiently."
          ]
        },
        {
          "title": "Impact",
          "body": [
            "Reduces time spent searching for available study spaces.",
            "Improves fairness in library seat allocation.",
            "Minimizes abandoned seat reservations.",
            "Increases utilization of available library resources.",
            "Enables data-driven decision making for library administrators."
          ]
        },
        {
          "title": "Future Scope",
          "body": [
            "QR code-based seat check-in.",
            "Indoor navigation to reserved seats.",
            "Mobile push notifications.",
            "AI-powered occupancy prediction.",
            "Multi-library and multi-campus support.",
            "Calendar integration for study planning.",
            "Smart recommendations based on previous study patterns."
          ]
        }
      ],
      "techStack": [
        {
          "label": "Frontend",
          "items": [
            "React 18",
            "Vite",
            "Tailwind CSS 3",
            "Framer Motion"
          ]
        },
        {
          "label": "Backend",
          "items": [
            "Node.js",
            "Express 4",
            "MongoDB",
            "JWT"
          ]
        }
      ],
      "team": [
        "Srijita Biswas"
      ]
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
      "subtitle": "Decision-first food ordering platform with a natural-language AI Crave Assistant, built on a real MERN stack with 1,100+ dish records.",
      "tags": [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "JWT",
        "Tailwind CSS"
      ],
      "color": "#FFF0E6",
      "overview": "Savor is an AI-powered, decision-first food ordering platform designed to reduce the time users spend deciding what to eat. Instead of overwhelming users with endless restaurant listings and promotional content, it helps them discover the most suitable dishes based on their cravings, budget, dietary preferences, and lifestyle. By combining curated recommendations, conversational AI, and a rich food database, Savor transforms food ordering into a faster, more personalized, and confident decision-making experience.",
      "problem": "Most food delivery platforms prioritize engagement over decision-making. Users are presented with hundreds of options, making it difficult to choose the right meal quickly. Poor personalization, cluttered interfaces, and excessive scrolling often lead to decision fatigue, longer ordering times, and reduced user satisfaction.",
      "research": [
        "Studied popular food delivery platforms to understand common ordering behaviors.",
        "Identified decision fatigue as one of the biggest challenges during food selection.",
        "Found that users often know what they feel like eating but struggle to find the right dish quickly.",
        "Observed that promotion-heavy interfaces distract users from making decisions.",
        "Discovered that users value personalized suggestions more than endless restaurant listings.",
        "Recognized the need for better transparency through nutrition, ingredients, allergens, and delivery information.",
        "Concluded that simplifying choices improves both user confidence and ordering speed."
      ],
      "solution": "Savor replaces endless browsing with an AI-assisted recommendation experience that understands user intent before displaying results. Users can describe what they're craving in natural language, set their budget, and receive curated dish recommendations with personalized reasoning. The platform combines intelligent filtering, food insights, and a clean interface to help users make confident decisions in less time.",
      "sections": [
        {
          "title": "Product Goals",
          "body": [
            "Reduce decision fatigue during food ordering.",
            "Help users discover suitable meals faster.",
            "Personalize recommendations based on cravings, preferences, and budget.",
            "Provide transparent food information before purchase.",
            "Create a cleaner and distraction-free ordering experience.",
            "Build an AI assistant that understands natural language food requests."
          ]
        },
        {
          "title": "Design Approach",
          "body": [
            "Designed a minimal interface focused on reducing cognitive overload.",
            "Prioritized content hierarchy to surface only the most relevant recommendations.",
            "Used budget-first discovery to narrow choices before browsing.",
            "Kept navigation simple to reduce unnecessary interactions.",
            "Designed responsive layouts for a seamless experience across devices.",
            "Focused on premium visuals without clutter or excessive promotional banners."
          ]
        },
        {
          "title": "Key Features",
          "body": [
            "AI-powered Crave Assistant for natural language food recommendations.",
            "Budget-first filtering with sliders and quick price presets.",
            "Curated \"Best Match\" recommendations instead of endless listings.",
            "Detailed dish pages with nutrition, allergens, ingredients, and taste profiles.",
            "Lifestyle-based recommendations for students, gym-goers, office workers, and more.",
            "AI-generated explanations describing why each dish matches the user's request.",
            "Browser geolocation for quick address selection.",
            "Favorites, cart, checkout, and authentication system.",
            "Database of 1,100+ dishes across multiple global cuisines."
          ]
        },
        {
          "title": "Core Innovation",
          "body": [
            "Shifts food ordering from browsing hundreds of options to making guided decisions.",
            "Uses conversational AI to understand cravings instead of relying only on keyword searches.",
            "Combines user preferences, budget, dietary restrictions, lifestyle, and cuisine into a single recommendation engine.",
            "Explains why each recommendation was selected, increasing user trust and confidence.",
            "Enhances food discovery through rich dish intelligence rather than basic menu information."
          ]
        },
        {
          "title": "Challenges & Decisions",
          "body": [
            "Built a custom recommendation engine without relying on expensive external AI APIs.",
            "Structured a large database of over 1,100 dishes with detailed metadata for accurate filtering.",
            "Balanced recommendation quality while keeping search results concise.",
            "Designed an explainable AI experience by showing users why each recommendation was selected.",
            "Focused on reducing cognitive overload through curated content instead of infinite scrolling."
          ]
        },
        {
          "title": "Technical Highlights",
          "body": [
            "Full-stack MERN architecture.",
            "JWT-based authentication and user management.",
            "AI-powered natural language recommendation engine.",
            "MongoDB aggregation for intelligent dish ranking.",
            "Rich structured food database with 1,100+ dishes.",
            "Browser Geolocation API integration.",
            "Responsive UI built with React and Tailwind CSS.",
            "RESTful backend architecture using Express.js."
          ]
        },
        {
          "title": "Impact",
          "body": [
            "Reduces the time required to decide what to order.",
            "Improves user confidence through personalized recommendations.",
            "Minimizes unnecessary browsing and scrolling.",
            "Creates a more engaging and informative food ordering experience.",
            "Encourages informed food choices through detailed dish information."
          ]
        },
        {
          "title": "Future Scope",
          "body": [
            "Personalized recommendations based on order history.",
            "Live order tracking with real-time updates.",
            "Integrated payment gateway.",
            "Restaurant partner dashboard.",
            "Craving history and preference analytics.",
            "Loyalty and rewards program.",
            "Voice-based food search.",
            "AI-powered meal planning and nutrition recommendations."
          ]
        }
      ],
      "techStack": [
        {
          "label": "Frontend",
          "items": [
            "React 18",
            "Vite",
            "Tailwind CSS",
            "Context API"
          ]
        },
        {
          "label": "Backend",
          "items": [
            "Node.js",
            "Express",
            "MongoDB",
            "JWT",
            "bcrypt"
          ]
        },
        {
          "label": "AI / Recommendation Engine",
          "items": [
            "Custom NLP intent-detection",
            "MongoDB aggregation scoring"
          ]
        },
        {
          "label": "Deployment",
          "items": [
            "Render",
            "MongoDB Atlas"
          ]
        }
      ],
      "team": [
        "Srijita Biswas"
      ]
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
      "subtitle": "AI-powered cybersecurity SOC dashboard with real-time threat detection and an attack simulation engine.",
      "tags": [
        "React",
        "Vite",
        "TypeScript",
        "Tailwind CSS",
        "Node.js"
      ],
      "color": "#1A1414",
      "overview": "ZeroShield AI is an AI-powered cybersecurity platform that simulates a modern Security Operations Center (SOC) for real-time threat monitoring, attack simulation, and incident response. It enables security teams to visualize system health, detect anomalies, analyze threats, and respond to simulated cyberattacks through a centralized dashboard. The platform combines AI-driven insights with interactive monitoring tools to make cybersecurity management more proactive and accessible.",
      "problem": "Organizations often rely on multiple disconnected security tools, making it difficult to monitor threats and respond quickly. Traditional dashboards provide logs and alerts but offer limited visualization of attack scenarios or automated response guidance. This results in delayed decision-making, reduced situational awareness, and inefficient security operations.",
      "research": [
        "Studied common workflows followed by Security Operations Centers (SOCs).",
        "Identified the challenge of monitoring multiple security tools simultaneously.",
        "Observed that visual dashboards improve threat awareness and response speed.",
        "Recognized the importance of anomaly detection alongside traditional log monitoring.",
        "Found that attack simulations help users better understand cybersecurity incidents.",
        "Concluded that centralized monitoring improves operational efficiency and decision-making."
      ],
      "solution": "ZeroShield AI brings threat detection, attack simulation, response management, and security monitoring into a unified platform. It continuously analyzes system activity, detects suspicious behavior, visualizes security metrics, and recommends appropriate mitigation actions. By simulating real-world attack scenarios, the platform also provides a safe environment for understanding cybersecurity workflows.",
      "sections": [
        {
          "title": "Product Goals",
          "body": [
            "Centralize cybersecurity monitoring within a single dashboard.",
            "Detect suspicious activities through AI-driven analysis.",
            "Improve incident response with actionable recommendations.",
            "Simulate cyberattacks for learning and testing.",
            "Provide clear visualizations of system health and risk.",
            "Simplify cybersecurity management through an intuitive interface."
          ]
        },
        {
          "title": "Design Approach",
          "body": [
            "Designed a futuristic dashboard inspired by modern SOC environments.",
            "Focused on presenting critical security information with minimal clutter.",
            "Used visual charts and status indicators to improve situational awareness.",
            "Organized features into dedicated modules for monitoring, detection, response, and intelligence.",
            "Built a responsive interface for seamless monitoring across devices."
          ]
        },
        {
          "title": "Key Features",
          "body": [
            "AI-powered anomaly and threat detection.",
            "Real-time security dashboard with risk monitoring.",
            "Attack simulation engine for cybersecurity scenarios.",
            "Automated response recommendations for detected threats.",
            "Threat intelligence feed with vulnerability updates.",
            "Interactive logs and activity monitoring.",
            "Notification system for security alerts.",
            "Risk score visualization and endpoint monitoring.",
            "Role-based authentication and secure access."
          ]
        },
        {
          "title": "Core Innovation",
          "body": [
            "Combines threat monitoring, attack simulation, and response management into a single platform.",
            "Uses AI-driven anomaly detection to identify suspicious activities beyond traditional rule-based monitoring.",
            "Provides interactive security visualizations that simplify complex cybersecurity workflows.",
            "Enables users to explore attack scenarios without affecting real production systems."
          ]
        },
        {
          "title": "Challenges & Decisions",
          "body": [
            "Designed realistic cybersecurity workflows while maintaining a simple user experience.",
            "Organized multiple security modules into a unified dashboard.",
            "Created simulated AI detection models for interactive demonstrations.",
            "Focused on explainable security insights rather than raw system logs.",
            "Balanced technical complexity with usability for learning purposes"
          ]
        },
        {
          "title": "Impact",
          "body": [
            "Improves visibility into cybersecurity operations.",
            "Helps users understand modern threat detection workflows.",
            "Enables faster security monitoring and incident awareness.",
            "Demonstrates AI-assisted security analysis through an interactive platform.",
            "Provides an engaging learning environment for cybersecurity concepts."
          ]
        },
        {
          "title": "Future Scope",
          "body": [
            "Live threat intelligence integration.",
            "WebSocket-based real-time monitoring.",
            "Role-Based Access Control (RBAC).",
            "Machine learning-based threat prediction.",
            "Cloud deployment and multi-tenant support.",
            "Advanced security analytics and reporting.",
            "SIEM and external security tool integrations."
          ]
        }
      ],
      "techStack": [
        {
          "label": "Frontend",
          "items": [
            "React",
            "Vite",
            "TypeScript",
            "Tailwind CSS",
            "Radix UI"
          ]
        },
        {
          "label": "Backend",
          "items": [
            "Node.js",
            "Express"
          ]
        },
        {
          "label": "Visualisation",
          "items": [
            "Recharts"
          ]
        }
      ],
      "team": [
        "Shreya Chowdhury",
        "Prakriti Sarkar",
        "Srijita Biswas"
      ]
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
      "subtitle": "NLP-based supervised ML system that classifies news articles as fake or real.",
      "tags": [
        "Python",
        "TF-IDF",
        "Scikit-learn"
      ],
      "color": "#1A1810",
      "overview": "Fake News Detection is a machine learning-based web application that identifies whether a news article is real or fake using Natural Language Processing (NLP). The system analyzes textual content, extracts meaningful features, and classifies news articles with high accuracy, helping users verify information before consuming or sharing it.",
      "problem": "The rapid spread of misinformation through digital media has made it increasingly difficult to verify the authenticity of online news. Manual fact-checking is time-consuming, while misleading content can influence public opinion before being identified. An automated system is needed to quickly classify news articles and support responsible information consumption.",
      "research": [
        "Studied the growing impact of misinformation on digital platforms.",
        "Analyzed publicly available fake and real news datasets.",
        "Identified text patterns that distinguish fake news from genuine reporting.",
        "Explored different NLP preprocessing techniques to improve model performance.",
        "Evaluated multiple classification algorithms for prediction accuracy.",
        "Found TF-IDF vectorization to be effective for textual feature extraction."
      ],
      "solution": "The application uses NLP techniques and supervised machine learning to analyze news articles and predict whether they are fake or real. After preprocessing the text and converting it into numerical vectors using TF-IDF, the trained classification model generates instant predictions, making news verification faster and more accessible.",
      "sections": [
        {
          "title": "Key Features",
          "body": [
            "Fake and real news classification.",
            "NLP-based text preprocessing.",
            "TF-IDF feature extraction.",
            "Machine learning prediction engine.",
            "Instant prediction results.",
            "Clean and responsive user interface.",
            "Performance evaluation using accuracy, precision, recall, and confusion matrix."
          ]
        },
        {
          "title": "Challenges & Decisions",
          "body": [
            "Optimized text preprocessing to improve prediction quality.",
            "Selected TF-IDF for efficient feature extraction.",
            "Compared multiple classification algorithms before finalizing the model.",
            "Balanced model accuracy with prediction speed."
          ]
        },
        {
          "title": "Impact",
          "body": [
            "Demonstrates AI-based misinformation detection.",
            "Encourages responsible news consumption.",
            "Reduces dependence on manual verification.",
            "Showcases practical implementation of NLP techniques."
          ]
        },
        {
          "title": "Future Scope",
          "body": [
            "Integration of transformer models such as BERT.",
            "Multi-language fake news detection.",
            "Browser extension for real-time verification.",
            "Source credibility analysis.",
            "Web application deployment with live prediction."
          ]
        }
      ],
      "techStack": [
        {
          "label": "Languages & Libraries",
          "items": [
            "Python",
            "Scikit-learn",
            "Pandas",
            "NumPy"
          ]
        },
        {
          "label": "AI",
          "items": [
            "NLP",
            "TF-IDF",
            "Vectorization"
          ]
        },
        {
          "label": "ML",
          "items": [
            "ML Classification"
          ]
        },
        {
          "label": "Visualization",
          "items": [
            "Matplotlib"
          ]
        }
      ],
      "team": [
        "Srijita Biswas",
        "Prakriti Sarkar",
        "Rumana Kar",
        "Neha Jha"
      ]
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
      "subtitle": "End-to-end product design for a dual-sided villa rental platform.",
      "tags": [
        "Figma",
        "UX Research",
        "Prototyping"
      ],
      "color": "#EFEBFA",
      "overview": "The XPMC Xpro Program was a six-week product management and UX design experience focused on solving real-world business problems through research-driven product development. As part of the program, our team designed LuxeStay Villas, a premium villa booking platform, following an industry-standard product lifecycle from research and planning to prototyping, testing, and stakeholder presentations.",
      "problem": "Hospitality booking platforms often prioritize listings over user experience, making it difficult for travelers to compare properties, understand amenities, and make confident booking decisions. Property owners also face challenges in showcasing their villas effectively while maintaining a seamless booking experience. The project focused on identifying these usability gaps and designing a user-centered solution that balanced both customer and business needs.",
      "research": [
        "Conducted user research to understand booking behaviors and decision-making patterns.",
        "Identified trust, transparency, and information clarity as major factors influencing bookings.",
        "Studied existing hospitality platforms to analyze strengths and usability gaps.",
        "Mapped user journeys to identify friction points throughout the booking process.",
        "Prioritized features based on both business objectives and user needs.",
        "Used stakeholder feedback to refine design decisions during every sprint."
      ],
      "solution": "Using a research-first approach, we designed an end-to-end booking experience that simplified villa discovery, improved trust through better information architecture, and streamlined the booking journey. Every design decision was validated through research, usability testing, and continuous stakeholder feedback to ensure the final product addressed real user needs.",
      "sections": [
        {
          "title": "Product Goals",
          "body": [
            "Simplify the villa booking experience.",
            "Improve user confidence during property selection.",
            "Create intuitive navigation across the booking journey.",
            "Balance customer needs with business objectives.",
            "Design a scalable and implementation-ready product.",
            "Deliver a polished prototype supported by research."
          ]
        },
        {
          "title": "Design Approach",
          "body": [
            "Followed a research-first and user-centered design methodology.",
            "Created user flows before designing interface screens.",
            "Built interactive prototypes to validate ideas early.",
            "Iterated designs based on usability testing and stakeholder feedback.",
            "Maintained consistency across all screens using a structured design system."
          ]
        },
        {
          "title": "Key Features",
          "body": [
            "Complete end-to-end villa booking workflow.",
            "User journey mapping and information architecture.",
            "Interactive high-fidelity Figma prototype.",
            "Guest and property owner user flows.",
            "Feature prioritization based on research findings.",
            "Usability testing and iterative design improvements.",
            "Product documentation prepared for development handoff.",
            "Stakeholder presentations and design walkthroughs."
          ]
        },
        {
          "title": "Core Innovation",
          "body": [
            "Focused on solving user problems through research rather than assumptions.",
            "Combined product strategy, UX design, and stakeholder collaboration into a structured workflow.",
            "Applied iterative validation throughout the design process to improve usability.",
            "Demonstrated how research-driven decisions lead to stronger product outcomes."
          ]
        },
        {
          "title": "Challenges & Decisions",
          "body": [
            "Balanced business goals with user expectations during feature prioritization.",
            "Refined user flows through multiple rounds of usability testing.",
            "Improved navigation to reduce friction during booking.",
            "Collaborated across team members while maintaining design consistency.",
            "Presented product decisions clearly to stakeholders throughout the project."
          ]
        },
        {
          "title": "Impact",
          "body": [
            "Delivered a research-backed product prototype ready for development.",
            "Improved the overall booking experience through user-centered design.",
            "Demonstrated structured product thinking and design execution.",
            "Strengthened collaboration between design, product, and stakeholders.",
            "Simulated an industry-standard product development process."
          ]
        }
      ],
      "techStack": [
        {
          "label": "Design",
          "items": [
            "Figma",
            "Prototyping",
            "User Research"
          ]
        }
      ],
      "team": [
        "Srijita Biswas"
      ]
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
      "subtitle": "ML-powered lifestyle persona discovery app using KMeans clustering.",
      "tags": [
        "Python",
        "Scikit-learn",
        "Streamlit"
      ],
      "color": "#101830",
      "overview": "Wellness Personas of SNU is an interactive machine learning application that identifies a user's wellness persona based on their lifestyle habits and preferences. Using KMeans clustering, the platform groups users into unique personality-based wellness categories and presents personalized insights through an engaging and visually interactive interface.",
      "problem": "Students often struggle to understand their lifestyle patterns and wellness habits in a meaningful way. Traditional surveys provide generic feedback without personalization, making it difficult for users to relate to the results or gain actionable insights about their daily routines.",
      "research": [
        "Studied common lifestyle and wellness patterns among university students.",
        "Identified recurring behavioral similarities suitable for clustering.",
        "Used unsupervised learning to group users with similar habits.",
        "Focused on creating relatable personas instead of numerical predictions.",
        "Designed visual feedback to improve user engagement.",
        "Combined psychology-inspired personas with data-driven clustering."
      ],
      "solution": "The application combines machine learning with an interactive questionnaire to classify users into one of ten wellness personas. Based on responses related to food habits, hobbies, and lifestyle preferences, the system generates personalized personas, motivational insights, and visual representations that encourage self-awareness and balanced living.",
      "sections": [
        {
          "title": "Product Goals",
          "body": [
            "Help students understand their wellness habits.",
            "Promote self-awareness through personalized personas.",
            "Demonstrate practical applications of unsupervised machine learning.",
            "Deliver an engaging and interactive user experience.",
            "Encourage healthier lifestyle choices through positive feedback."
          ]
        },
        {
          "title": "Key Features",
          "body": [
            "Lifestyle-based wellness assessment.",
            "KMeans clustering for persona prediction.",
            "Ten unique wellness personas.",
            "Interactive lifestyle questionnaire.",
            "Dynamic radar chart visualization.",
            "Personalized motivational quotes.",
            "Emoji-based persona reveal animations.",
            "Responsive Streamlit application."
          ]
        },
        {
          "title": "Core Innovation",
          "body": [
            "Combines machine learning with human-centered design to create meaningful wellness personas.",
            "Transforms lifestyle data into relatable personality profiles instead of traditional analytical reports.",
            "Makes unsupervised learning interactive, engaging, and accessible to non-technical users."
          ]
        },
        {
          "title": "Challenges & Decisions",
          "body": [
            "Designed meaningful wellness personas from clustered behavioral data.",
            "Balanced model accuracy with an engaging user experience.",
            "Simplified machine learning outputs for better accessibility.",
            "Focused on making personality insights both informative and enjoyable."
          ]
        },
        {
          "title": "Impact",
          "body": [
            "Encourages students to reflect on their lifestyle habits.",
            "Makes wellness assessment more engaging and personalized.",
            "Demonstrates a practical application of unsupervised learning.",
            "Bridges data science with human-centered user experience."
          ]
        },
        {
          "title": "Future Scope",
          "body": [
            "Personalized wellness recommendations.",
            "Habit tracking and progress monitoring.",
            "Integration with fitness and wearable devices.",
            "AI-powered lifestyle coaching.",
            "Expanded persona models with larger datasets.",
            "Mobile application support."
          ]
        }
      ],
      "techStack": [
        {
          "label": "Python Libraries",
          "items": [
            "KMeans Clustering",
            "Scikit-learn",
            "Pandas",
            "NumPy",
            "Joblib"
          ]
        },
        {
          "label": "Frontend",
          "items": [
            "Streamlit",
            "HTML",
            "CSS"
          ]
        },
        {
          "label": "Visualization",
          "items": [
            "Matplotlib"
          ]
        }
      ],
      "team": [
        "Srijita Biswas",
        "Prakriti Sarkar",
        "Sresthita Nath"
      ]
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
      "subtitle": "Smart group expense tracker with automatic splitting and settlement tracking.",
      "tags": [
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB"
      ],
      "color": "#0F1A14",
      "overview": "SplitX is a smart expense management platform designed to simplify shared spending among friends, roommates, travel groups, and project teams. It enables users to track shared expenses, calculate balances automatically, and manage settlements through a clean and intuitive interface. By eliminating manual calculations, SplitX makes group expense management faster, more transparent, and hassle-free.",
      "problem": "Managing shared expenses manually is often confusing and time-consuming. Group members struggle to keep track of who paid, how much each person owes, and whether balances have been settled. Existing solutions can feel overly complex for small groups, making expense tracking inconvenient and prone to calculation errors.",
      "research": [
        "Studied how students, roommates, and travel groups currently manage shared expenses.",
        "Found that many users rely on spreadsheets or messaging apps for expense tracking.",
        "Identified manual calculations as the primary source of confusion and disputes.",
        "Observed that users prefer quick expense entry with automatic balance calculations.",
        "Recognized the importance of transparency so every member can verify transactions.",
        "Concluded that simplicity and automation are more valuable than feature-heavy financial tools."
      ],
      "solution": "SplitX provides a centralized platform where users can create groups, record shared expenses, automatically split costs among members, and monitor outstanding balances in real time. The platform simplifies settlements while giving every member complete transparency into group finances.",
      "sections": [
        {
          "title": "Product Goals",
          "body": [
            "Simplify group expense management.",
            "Eliminate manual settlement calculations.",
            "Improve transparency among group members.",
            "Reduce payment disputes through accurate balance tracking.",
            "Create a lightweight and user-friendly expense management experience."
          ]
        },
        {
          "title": "Design Approach",
          "body": [
            "Designed a clean and minimal interface focused on quick expense entry.",
            "Reduced unnecessary steps during group creation and expense recording.",
            "Used simple visual summaries to help users understand balances instantly.",
            "Prioritized responsive layouts for mobile and desktop usage.",
            "Focused on clarity to make financial information easy to understand."
          ]
        },
        {
          "title": "Key Features",
          "body": [
            "Create and manage multiple expense groups.",
            "Add and categorize shared expenses.",
            "Automatic expense splitting among group members.",
            "Real-time balance and settlement calculations.",
            "Individual payment history and expense tracking.",
            "User trust score and badge system.",
            "Transparent transaction records for all members.",
            "Responsive interface for seamless access across devices."
          ]
        },
        {
          "title": "Core Innovation",
          "body": [
            "Automates expense distribution and settlement calculations to eliminate manual effort.",
            "Provides complete transparency by allowing every group member to view balances and transactions.",
            "Combines simplicity with intelligent calculations, making shared expense management accessible for everyday users."
          ]
        },
        {
          "title": "Challenges & Decisions",
          "body": [
            "Designed an intuitive workflow that minimizes the number of steps required to record expenses.",
            "Built automatic balance calculation to remove manual mathematical errors.",
            "Structured the database to efficiently manage multiple groups and transactions.",
            "Focused on transparency to reduce confusion during settlements."
          ]
        },
        {
          "title": "Impact",
          "body": [
            "Simplifies shared expense management for groups.",
            "Reduces disputes caused by incorrect calculations.",
            "Improves transparency across all transactions.",
            "Saves time by automating settlements.",
            "Makes group financial management more organized and reliable."
          ]
        },
        {
          "title": "Future Scope",
          "body": [
            "UPI and payment gateway integration.",
            "Recurring expense management.",
            "Expense analytics and spending insights.",
            "Receipt scanning using OCR.",
            "Multi-currency support.",
            "Bill reminders and payment notifications.",
            "Exportable expense reports."
          ]
        }
      ],
      "techStack": [
        {
          "label": "Frontend",
          "items": [
            "HTML",
            "Tailwind CSS",
            "JavaScript"
          ]
        },
        {
          "label": "Backend",
          "items": [
            "Node.js",
            "Express.js",
            "MongoDB",
            "Mongoose"
          ]
        }
      ],
      "team": [
        "Srijita Biswas"
      ]
    },
  },
  {
    title: "Meridian",
    slug: "meridian",
    thumbnail: "",
    category: "Frontend Developemnt",
    tagline: "A premium AI-powered data automation platform landing page built for a frontend hackathon.",
    accent: "#7C3AED",
    icon: "🚀",
    startDate: new Date("2026-06-26"),
    datePrecision: "day",
    type: "Hackathon",
    displayLabel: "26 Jun 2026 (4-Hour Hackathon)",
    cardTags: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    filter: "Dev",
    links: [],
    caseStudy: {
      "subtitle": "A premium AI-powered data automation platform landing page built for a frontend hackathon.",
      "tags": [],
      "color": "#1A1030",
      "overview": "Meridian is a premium SaaS landing page designed for an AI-powered data automation platform as part of a frontend hackathon. Built entirely from scratch, the project showcases modern frontend development practices through responsive layouts, reusable component architecture, smooth native animations, and performance-focused implementation. The primary goal was to create a production-quality landing page while adhering to strict competition constraints that prohibited the use of external UI and animation libraries.",
      "problem": "Modern SaaS landing pages often rely heavily on third-party UI frameworks and animation libraries, increasing bundle size and reducing performance. The challenge was to build a visually engaging, fully responsive, and accessible landing page using only native CSS animations and core frontend technologies while maintaining premium design quality and meeting hackathon constraints.",
      "solution": "Meridian delivers a polished SaaS experience using React, Vite, and Tailwind CSS without relying on external animation libraries. The platform features a responsive layout, dynamic pricing engine, adaptive Bento Grid, accessibility-first design, and SEO optimization. Every interaction, transition, and animation is implemented using native CSS techniques to maximize performance and maintain a lightweight architecture.",
      "sections": [
        {
          "title": "Product Goals",
          "body": [
            "Build a premium SaaS landing page from scratch.",
            "Deliver a fully responsive experience across all devices.",
            "Create smooth interactions using only native CSS animations.",
            "Optimize performance without external UI or animation libraries.",
            "Follow accessibility and SEO best practices.",
            "Demonstrate production-ready frontend development skills."
          ]
        },
        {
          "title": "Design Approach",
          "body": [
            "Designed a clean, modern interface inspired by premium SaaS products.",
            "Used glassmorphism, gradients, and subtle depth to create a premium visual identity.",
            "Built reusable UI components for consistency and scalability.",
            "Focused on responsive-first layouts for desktop, tablet, and mobile devices.",
            "Used motion sparingly to enhance usability without affecting performance."
          ]
        },
        {
          "title": "Key Features",
          "body": [
            "Premium SaaS landing page with modern UI.",
            "Fully responsive layout across all screen sizes.",
            "Glassmorphism-inspired design with gradient backgrounds.",
            "Interactive cards with smooth hover animations.",
            "Dynamic pricing engine with monthly and annual billing.",
            "Multi-currency pricing support (USD, EUR, INR).",
            "Automatic annual discount calculation.",
            "Responsive Bento Grid that transforms into an accordion on mobile.",
            "Persistent active card state across viewport changes.",
            "Native CSS animations without external libraries.",
            "Accessibility-first implementation with keyboard navigation and focus states.",
            "SEO-ready structure with semantic HTML and metadata."
          ]
        },
        {
          "title": "Core Innovation",
          "body": [
            "Built entirely without external animation or UI component libraries while maintaining a premium user experience.",
            "Uses a centralized pricing configuration to generate dynamic pricing without hardcoded values.",
            "Adapts the Bento Grid into an accordion layout on smaller screens while preserving user interaction state.",
            "Demonstrates that high-quality animations and interactions can be achieved using only native CSS."
          ]
        },
        {
          "title": "Impact",
          "body": [
            "Demonstrates advanced frontend development skills within strict technical constraints.",
            "Showcases responsive design, accessibility, and performance optimization.",
            "Highlights the ability to build production-quality interfaces without external UI frameworks.",
            "Serves as a scalable foundation for a complete SaaS product."
          ]
        }
      ],
      "techStack": [
        {
          "label": "Frontend",
          "items": [
            "React",
            "Vite",
            "Tailwind CSS",
            "JavaScript (ES6+)"
          ]
        },
        {
          "label": "Deployment",
          "items": [
            "Render"
          ]
        }
      ],
      "team": []
    },
  },
];

await Project.deleteMany({});
await Project.insertMany(projects);
console.log(`✅ Seeded ${projects.length} projects with their original dates.`);

/* ── 3. Seed Hackathons ──
   "Girls Hackathon" and "Smart India Hackathon" are intentionally NOT
   seeded — they'll be added later via the admin dashboard. Each of these
   five links to its matching project via projectSlug, powering the
   "View Project" button on the public hackathon card. */
const hackathons = [
  {
    name: "Frontend Battle 3.0",
    date: "26th June 2026",
    badge: "4 hour Hackathon",
    bullets: [
      "Participated in a frontend hackathon where I built a premium SaaS landing page using React and Tailwind CSS while focusing on performance accessibility SEO and smooth native CSS animations."
    ],
    projectSlug: "meridian",
    order: 1,
  },
  {
    name: "Bharat Academix CodeQuest",
    date: "20th June 2026 - 22nd June 2026",
    badge: "Hackathon",
    bullets: [
      "Participated in a hackathon where I built MediFlow - an AI-powered hospital queue optimization platform focused on improving patient experience and operational efficiency."
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
      "Built an AI-powered solution addressing the challenge brief end-to-end."
    ],
    projectSlug: "zeroshield",
    order: 3,
  },
  {
    name: "AI Startup Buildathon 2026 – Beauty Salon Marketplace Challenge",
    date: "Jun 2026",
    badge: "48-Hour Buildathon",
    bullets: [
      "Built Glow-AI, an AI-powered beauty and salon marketplace, from scratch in 48 hours.",
      "Led UI/UX design and frontend development for the AI face-scan and salon-discovery experience."
    ],
    projectSlug: "glowai",
    order: 4,
  },
  {
    name: "Status Code 2.0",
    date: "Aug 2025",
    badge: "36 Hour Hackathon",
    bullets: [
      "Participated in a collaborative hackathon involving problem-solving, development, and team-based project building."
    ],
    projectSlug: "splitx",
    order: 5,
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