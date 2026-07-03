import CaseLayout from "./CaseLayout";
 
export default function CaseZeroShield() {
  return (
    <CaseLayout
      num="06"
      title="ZeroShield AI"
      subtitle="AI-powered cybersecurity SOC dashboard with real-time threat detection, attack simulation engine, and automated response handling."
      category="Full-Stack · Cybersecurity"
      tags={["React", "TypeScript", "Node.js", "Tailwind CSS", "Radix UI", "Recharts"]}
      color="#FFECEC"
      accent="#C43030"
      overview="ZeroShield AI is a full-stack cybersecurity platform that simulates a real-world Security Operations Centre (SOC). It provides a unified dashboard for real-time threat monitoring, AI-based anomaly detection, attack simulation, and automated incident response — making complex security operations understandable and actionable."
      problem="Traditional cybersecurity systems are fragmented, complex to interpret, and require deep expertise to operate. Security analysts juggle multiple tools, dashboards, and alert streams — leading to alert fatigue, slow response times, and missed threats. There's a critical need for a unified platform that simplifies threat visibility and response."
      research="Our research focused on the challenges of designing a user-friendly cybersecurity platform. We identified key pain points related to threat visibility, response times, and the need for a more intuitive way to manage and interpret security data."
      solution="Designed and built a centralised SOC dashboard that integrates monitoring, detection, simulation, and response into a single interface. The platform uses an AI logic layer for anomaly detection, a simulation engine for attack modelling, and automated response actions — all presented through a clear, hierarchy-driven UI that supports fast decision-making."
      sections={[
        {
          title: "Key Features",
          body: [
            "Real-time risk score dashboard — a dynamic 0-100 threat index updated as new events are detected",
            "AI-based anomaly detection — confidence metrics and anomaly type classification displayed per incident",
            "Attack simulation engine — simulate DDoS spikes, API injection, lateral movement, and brute force attacks",
            "Automated response actions — one-click 'Block IP', 'Isolate Service', and 'Alert Team' responses",
            "Threat intelligence feed — severity-classified (Critical, High, Medium, Low) incoming threat data stream",
            "Real-time activity log — chronological event timeline with source, type, and action taken",
            "Notification system — in-app alerts with sound cues for critical threats"
          ]
        },
        {
          title: "Dashboard Design",
          body: "The interface is designed to resemble a modern enterprise SOC dashboard, with a dark-mode aesthetic that reduces eye strain during long monitoring sessions. Key metrics (risk score, active threats, system activity) are positioned in the primary visual zone. Secondary data (logs, intelligence feed) occupies the lower area. Every element has a clear visual hierarchy — critical information is impossible to miss."
        },
        {
          title: "System Architecture",
          body: [
            "React (Vite) + TypeScript frontend for type-safe component development and fast refresh during development",
            "Tailwind CSS + Radix UI for accessible, consistent UI primitives and utility-first styling",
            "Recharts for all real-time data visualisations — threat timelines, risk history, attack frequency charts",
            "Node.js backend handling API routes, simulation engine logic, and AI detection layer",
            "Modular service architecture — each feature (detection, simulation, response) is a standalone service module"
          ]
        },
        {
          title: "Attack Simulation Engine",
          body: "The simulation engine is the technical centrepiece of ZeroShield. It can generate realistic attack patterns for DDoS (traffic spike simulation), API injection (malformed request sequences), and lateral movement (abnormal internal connection graphs). Each simulation updates the risk score, populates the threat feed, and triggers appropriate automated responses — giving analysts a safe environment to test their response playbooks."
        },
        {
          title: "My Role",
          body: [
            "Designed the full UI/UX — dashboard layout, information hierarchy, colour system, and interaction patterns",
            "Led frontend development using React and TypeScript — built all major dashboard components",
            "Worked on backend integration — connecting frontend to Node.js API endpoints",
            "Contributed to system architecture design and feature planning decisions",
            "Participated in usability reviews and made iterative improvements based on team feedback"
          ]
        },
        {
          title: "Challenges",
          body: [
            "Designing a complex, data-dense system in a simplified, understandable UI — every piece of information had to earn its place on screen.",
            "Managing real-time data representation without performance degradation — used efficient state management and debounced updates.",
            "Balancing functionality with usability — a SOC tool must be powerful AND fast to use in high-pressure situations."
          ]
        },
        {
          title: "Future Improvements",
          body: [
            "Real ML model integration — replace the rule-based detection logic with a trained anomaly detection model",
            "Role-based access control (RBAC) — different dashboard views for Analyst, Manager, and Admin roles",
            "WebSocket-based real-time updates — replace polling with push-based event streaming",
            "Cloud deployment on AWS/GCP with containerisation via Docker",
            "Integration with real security data feeds (SIEM, IDS/IPS systems)"
          ]
        }
      ]}
      techStack={[
        { label: "Frontend", items: ["React", "Vite", "TypeScript", "Tailwind CSS", "Radix UI"] },
        { label: "Backend", items: ["Node.js", "Express"] },
        { label: "Visualisation", items: ["Recharts"] },
        { label: "Architecture", items: ["Modular Services", "REST API", "Simulation Engine"] }
      ]}
      links={[
        { label: "Demo Video", href: "https://youtu.be/KWsmJgv7vKU?si=6MPcR84HllX1122L", icon: "▶" },
        { label: "View Code", href: "https://github.com/srijitabiswas/ZeroShield-AI", icon: "⌥" }
      ]}
      team={["Shreya Chowdhury", "Prakriti Sarkar", "Srijita Biswas"]}
    />
  );
}