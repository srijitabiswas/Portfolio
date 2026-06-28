import CaseLayout from "./CaseLayout";

export default function CaseMediFlow() {
  return (
    <CaseLayout
      num="01"
      title="MediFlow"
      subtitle="AI-powered hospital queue & appointment system that predicts wait times in real time and tells patients exactly when to leave — not just a number in a line."
      category="Full-Stack · AI Healthcare"
      tags={["React", "Vite", "Tailwind CSS", "Node.js", "Express.js", "Socket.io", "MongoDB"]}
      color="#E8F5F0"
      accent="#22C55E"
      overview="MediFlow is a smart healthcare platform designed to reduce patient waiting time and improve hospital efficiency through real-time queue tracking, intelligent wait-time estimation, and AI-powered recommendations. Instead of simply showing a queue number, MediFlow helps patients make informed decisions by telling them when to leave for the hospital, whether delays have occurred, and how their estimated waiting time changes in real time."
      problem="Traditional hospital token systems only display a queue position — they don't tell patients when to actually leave home, whether the doctor is delayed, or how an emergency case might shift their wait. This leads to patients arriving too early and sitting in crowded waiting rooms, or arriving late and missing their slot entirely."
      solution="MediFlow combines real-time queue monitoring, an AI-based wait-time prediction engine, delay transparency, and smart recommendations into one continuously-updating system. A built-in Smart Decision Assistant tells each patient exactly what to do next — leave now, wait a few more minutes, or be aware of a delay — using live Socket.io events pushed from the backend."
      sections={[
        {
          title: "Key Features",
          body: [
            "Patient Portal — appointment booking, live queue position, AI-estimated wait time, and smart arrival recommendations",
            "Smart Decision Assistant — actionable suggestions like 'leave for the hospital now' or 'doctor is delayed', updated automatically",
            "Doctor Dashboard — view today's appointments, start/complete consultations, report delays, and insert emergency patients into the queue",
            "Admin Dashboard — monitor queue performance, appointment statistics, active doctors, and average waiting times",
            "Built-in chatbot — answers common questions about booking, queue tracking, wait time, and doctor delays",
            "Real-time updates across every dashboard via Socket.io, so a delay reported by a doctor instantly reflects in every patient's wait-time estimate"
          ]
        },
        {
          title: "Core Innovation",
          body: "Unlike traditional token systems that only display queue positions, MediFlow combines real-time queue monitoring, AI-based wait-time prediction, delay transparency, smart recommendations, and live updates to provide a significantly better patient experience — especially for elderly or first-time hospital visitors who don't know how to interpret a raw queue number."
        },
        {
          title: "User Flow",
          body: [
            "Patient registers and books an appointment",
            "Receives a live queue position the moment it's assigned",
            "AI wait-time engine predicts an estimated time based on current load and doctor pace",
            "Smart Decision Assistant tells the patient exactly when to leave",
            "Live queue updates keep the estimate accurate as doctors run ahead or behind",
            "Patient proceeds to consultation once notified"
          ]
        },
        {
          title: "Role-Based Architecture",
          body: "MediFlow is built around three distinct dashboards — Patient, Doctor, and Admin — each connected through the same real-time backend. A doctor reporting a delay or inserting an emergency patient propagates instantly to every affected patient's estimate via Socket.io, without anyone needing to refresh the page."
        },
        {
          title: "Future Scope",
          body: [
            "Machine learning–based wait prediction trained on historical hospital data",
            "SMS and WhatsApp notifications for queue updates",
            "Multi-hospital support",
            "Online payments and appointment rescheduling",
            "Push notifications and an interactive analytics dashboard"
          ]
        }
      ]}
      techStack={[
        { label: "Frontend", items: ["React", "Vite", "Tailwind CSS", "React Router", "Context API"] },
        { label: "Backend", items: ["Node.js", "Express.js", "Socket.io", "MongoDB", "Mongoose"] },
        { label: "Additional", items: ["REST APIs", "Browser Geolocation API", "Custom AI wait-time prediction engine"] },
        { label: "Deployment", items: ["Render"] }
      ]}
      links={[
        { label: "Live Demo", href: "https://mediflow-5zon.onrender.com/", icon: "🌐" },
        { label: "Demo Video", href: "https://youtu.be/QoBl4wYs3wc?si=qaCWAS1mEtW1yxXn", icon: "▶" },
        { label: "View Code", href: "https://github.com/srijitabiswas/MediFlow", icon: "⌥" }
      ]}
      team={["Srijita Biswas"]}
    />
  );
}