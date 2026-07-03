import CaseLayout from "./CaseLayout";
 
export default function CaseSavor() {
  return (
    <CaseLayout
      num="02"
      title="Savor"
      subtitle="Decision-first food ordering platform with a natural-language AI Crave Assistant, built on a real MERN stack with 1,100+ structured dish records."
      category="Full-Stack · UX Design · AI"
      tags={["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"]}
      color="#FFF0E6"
      accent="#D4712A"
      overview="Savor is a food ordering experience built around one idea: less is more. Instead of showing every restaurant in the city, Savor guides users to the right meal through budget-first filtering, curated recommendations, and Crave Assistant — a conversational AI that understands natural-language cravings like 'something spicy but light' and returns the top 3 matches with clear reasoning, backed by a real MongoDB database of 1,100+ dishes."
      problem="Most food delivery apps prioritize endless scrolling and promotion-heavy feeds over decision-making. Users open the app hungry but spend more time browsing than ordering — overwhelmed by choice, weak personalization, and cluttered layouts."
      research="Our research focused on the challenges of designing a user-friendly food ordering platform. We identified key pain points related to decision fatigue, cognitive load, and the need for a more personalized and streamlined ordering experience."
      solution="Savor flips the model by leading with budget and craving instead of menus. A custom intent-detection layer parses budget, spice level, diet, allergens, and lifestyle context directly from natural language, then scores and ranks dishes via MongoDB aggregation — zero external AI API cost. The result: a curated shortlist instead of an endless feed, and a 'why you'll like this' reason behind every recommendation."
      sections={[
        {
          title: "Research Insights",
          body: [
            "Too many options cause measurable decision fatigue — users take longer and feel less satisfied with their choices.",
            "Cluttered UI increases cognitive load and slows down the ordering process significantly.",
            "Weak personalization and promotion-heavy interfaces erode trust in recommendations.",
            "Users often abandon the app mid-selection and re-open it multiple times before placing an order."
          ]
        },
        {
          title: "Key Features",
          body: [
            "Crave Assistant — natural-language AI that parses budget, spice, diet, allergens & lifestyle context to return the top 3 dish matches with human-readable reasoning",
            "Budget-first discovery with a dual-handle price slider and quick presets",
            "1,100+ dishes across Indian, Asian, Western, and Middle Eastern cuisines, each with nutrition breakdown, allergen warnings, spice meter, and origin story",
            "Full MERN backend — JWT authentication, MongoDB + Mongoose schema modeling, REST APIs",
            "Geolocation-based address detection with saved Home/Work/Custom addresses",
            "Cart, checkout, favorites, and order flow connected to a real backend — no mock data"
          ]
        },
        {
          title: "Design Process",
          body: "Starting from user research on decision fatigue, I mapped the ordering journey and identified key friction points. Low-fidelity wireframes focused on information hierarchy — what does the user absolutely need to see at each step? The final design uses a warm orange accent palette while staying minimal, then I built the intent-detection NLP layer and MongoDB scoring engine that powers Crave Assistant end-to-end."
        },
        {
          title: "Impact",
          body: "Savor reduces time-to-decision by guiding users through structured, AI-reasoned choices rather than exposing them to unfiltered data. Moving from a static frontend mock to a full MERN stack with a real recommendation engine validated that the decision-first model holds up under real data at scale — 1,100+ dishes, real auth, and a live database."
        },
        {
          title: "Future Scope",
          body: [
            "Payment gateway integration",
            "Order history-based personalization",
            "Live order tracking with status updates",
            "Craving pattern analysis over time",
            "Restaurant partner dashboard"
          ]
        }
      ]}
      techStack={[
        { label: "Frontend", items: ["React 18", "Vite", "Tailwind CSS", "React Router", "Context API"] },
        { label: "Backend", items: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "bcrypt"] },
        { label: "AI / Recommendation Engine", items: ["Custom NLP intent-detection", "MongoDB aggregation scoring"] },
        { label: "Deployment", items: ["Render (frontend + backend)", "MongoDB Atlas"] }
      ]}
      links={[
        { label: "Live Demo", href: "https://savor-a-decision-first-food-ordering-app-p0yi.onrender.com", icon: "🌐" },
        { label: "View Code", href: "https://github.com/srijitabiswas/Savor-A-decision-first-food-ordering-app", icon: "⌥" }
      ]}
    />
  );
}