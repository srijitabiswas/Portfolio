import CaseLayout from "./CaseLayout";

export default function CaseGlowAI() {
  return (
    <CaseLayout
      num="09"
      title="Glow-AI"
      subtitle="AI beauty & salon marketplace with live facial-analysis scanning, an LLM concierge for personalized recommendations, and a Mumbai-wide salon discovery engine. Built in a 48-hour buildathon."
      category="AI · Computer Vision · Marketplace"
      tags={["React", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MediaPipe", "Groq LLM"]}
      color="#FCEAF3"
      accent="#EC4899"
      overview="Glow-AI is an AI-powered beauty, grooming, and salon marketplace that delivers personalized beauty analysis, style recommendations, and salon discovery in one seamless experience. It combines computer vision, AI analysis, personalized recommendations, and location-based salon discovery — built end-to-end during the AI Startup Buildathon 2026's Beauty Salon Marketplace Challenge."
      problem="Choosing the right hairstyle, skincare routine, or salon is overwhelming without expert guidance — generic advice doesn't account for someone's actual face shape, skin tone, or budget, and salon discovery apps rarely personalize beyond filters and star ratings."
      solution="Glow-AI runs a live webcam beauty scan through MediaPipe face landmarking to detect face shape, skin tone, undertone, and facial symmetry — validating lighting, blur, and smile before capture. That analysis feeds a personalized beauty profile, which a Groq-powered LLM concierge (Llama 3.3 70B) uses to give real-time, streamed beauty advice and to rank nearby salons by genuine fit, not just proximity."
      sections={[
        {
          title: "AI Beauty Scan Pipeline",
          body: [
            "Live webcam face scan with guided capture and smile detection",
            "Real-time validation — face detected, single face, centered, well-lit, not blurry",
            "MediaPipe Face Landmarker extracts facial geometry",
            "Face shape classification, skin tone & undertone detection, symmetry scoring",
            "AI confidence score attached to every analysis result",
            "Upload-photo fallback for users who skip the live scan"
          ]
        },
        {
          title: "Glow AI Concierge",
          body: "A conversational AI assistant powered by Groq's Llama 3.3 70B Versatile model, streamed via Server-Sent Events for real-time responses. It handles personalized beauty advice, salon recommendations, bridal planning, and budget optimization — e.g. 'best haircut for an oval face' or 'affordable salons under ₹2000 near Bandra'."
        },
        {
          title: "Salon Marketplace",
          body: [
            "Discovery by current location or Mumbai area (South Mumbai, Western Suburbs, Central, Eastern Suburbs, Navi Mumbai, Thane)",
            "Filtering by rating, price, services, and distance",
            "Personalized match score per salon based on the user's beauty profile",
            "Bridal Planner — wedding timeline, checklist, and budget-aware service planning"
          ]
        },
        {
          title: "My Role",
          body: "I led UI/UX design and frontend development — designing the guided camera-scan flow, the multi-step beauty profile wizard, and the salon marketplace browsing experience, while my teammates built backend services and additional API integrations."
        },
        {
          title: "Future Scope",
          body: [
            "Virtual hairstyle and makeup try-on",
            "Celebrity look matching",
            "Appointment booking with payment integration",
            "Salon owner dashboard and loyalty program"
          ]
        }
      ]}
      techStack={[
        { label: "Frontend", items: ["React 18", "Vite", "Tailwind CSS", "Framer Motion", "Lucide Icons"] },
        { label: "Backend", items: ["Node.js", "Express.js", "REST APIs", "Helmet", "CORS"] },
        { label: "AI & Computer Vision", items: ["Groq API (Llama 3.3 70B)", "MediaPipe Face Detection & Landmarker", "Skin tone analysis", "Smile detection"] },
        { label: "APIs", items: ["Groq API", "Google Places API", "Google Maps API"] }
      ]}
      links={[
        { label: "Live Demo", href: "https://glow-ai-frontend.onrender.com", icon: "🌐" },
        { label: "Demo Video", href: "https://youtu.be/yUpHiGzo7LA?si=iIN__hrd0UWDE1d5", icon: "▶" },
        { label: "View Code", href: "https://github.com/Shrezzzzz/Glow-AI", icon: "⌥" }
      ]}
      team={["Shreya Chowdhury", "Prakriti Sarkar", "Srijita Biswas"]}
    />
  );
}