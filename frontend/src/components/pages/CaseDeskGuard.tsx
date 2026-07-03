import CaseLayout from "./CaseLayout";

export default function CaseDeskGuard() {
  return (
    <CaseLayout
      num="03"
      title="DeskGuard"
      subtitle="University library seat-management OS with live SVG floor maps, a trust-score system for responsible study habits, buddy reservations, and abandoned-seat auto-detection."
      category="Full-Stack · Library Systems"
      tags={["React", "Vite", "Tailwind CSS", "Framer Motion", "Node.js", "Express.js", "MongoDB"]}
      color="#EAF1FB"
      accent="#2563EB"
      overview="DeskGuard is the operating system of the university library — a full-stack seat management platform built with React + Vite + Tailwind on the frontend and Node.js + Express + MongoDB on the backend. It replaces first-come-first-served chaos with a fair, transparent reservation system across three roles: Student, Librarian, and Admin."
      problem="University libraries struggle with seat hoarding, no-shows, and zero visibility into real occupancy — students wander floors looking for a free desk, while librarians have no way to spot abandoned sessions or manage emergencies efficiently."
      research="Our research focused on the challenges of managing shared study spaces in university libraries. We identified key pain points related to seat utilization, student behavior, and the need for a transparent, fair reservation system."
      solution="DeskGuard introduces a two-phase reserve-then-check-in flow: a seat is held for 10 minutes after booking, then released automatically if the student doesn't check in. A Responsible Study Score rewards students who honor their reservations and penalizes repeated no-shows, while librarians get a live command center with abandoned-seat detection and a one-tap emergency mode."
      sections={[
        {
          title: "Student Features",
          body: [
            "Smart Library Map — live SVG floor map showing real-time seat status",
            "Find Me a Seat — preference-based recommendations (zone, charging, window, AC)",
            "Reserve → Check In → Study — seats held for 10 minutes, auto-released on no-show",
            "Active Session view — live timer from check-in, away mode, one-tap checkout",
            "Responsible Study Score — trust score system with tier badges",
            "Personal dashboard — study time, streaks, and occupancy forecast",
            "Buddy Study — reserve adjacent seats for groups of 2–6"
          ]
        },
        {
          title: "Librarian Features",
          body: [
            "Live Command Center — real-time floor map with seat-level drill-down",
            "Abandoned Seat Detection — auto-flags sessions running over 3 hours",
            "Emergency Mode — one tap closes a floor and broadcasts an alert to every active student",
            "Session management — search, filter, and force-release any active session",
            "Desk management — per-seat zone editing and maintenance toggling"
          ]
        },
        {
          title: "Admin Features",
          body: [
            "Analytics — weekly sessions, hourly usage patterns, zone usage, trust-score distribution",
            "Student roster — add, search, and bulk-import via Excel/CSV",
            "Visual library layout editor — assign zones and seat features",
            "Settings — library policy, trust rules, librarian accounts, academic session config"
          ]
        },
        {
          title: "Key Engineering Challenges",
          body: "The trickiest part was session-state correctness: a two-phase reserve→check-in flow needed to handle race conditions (two students reserving the same seat simultaneously), namespaced localStorage per user ID to prevent session bleed-through on shared lab machines, and a Windows-specific port conflict during local development that required a custom startup script."
        },
        {
          title: "Future Scope",
          body: [
            "Push notifications for reservation reminders",
            "Mobile app companion",
            "Integration with university ID-card systems for tap-to-check-in",
            "Predictive occupancy modeling using historical booking data"
          ]
        }
      ]}
      techStack={[
        { label: "Frontend", items: ["React 18", "Vite", "Tailwind CSS 3", "Framer Motion", "React Router DOM 6"] },
        { label: "Backend", items: ["Node.js", "Express 4", "MongoDB", "Mongoose 8", "JWT", "bcryptjs"] },
        { label: "Additional", items: ["XLSX import", "Multer file uploads", "Helmet + CORS + Rate limiting"] },
        { label: "Deployment", items: ["Render"] }
      ]}
      links={[
        { label: "Live Demo", href: "https://deskguard-2.onrender.com/", icon: "🌐" },
        { label: "View Code", href: "https://github.com/srijitabiswas/DeskGuard", icon: "⌥" }
      ]}
      team={["Srijita Biswas"]}
    />
  );
}