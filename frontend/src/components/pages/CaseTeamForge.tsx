import CaseLayout from "./CaseLayout";

export default function CaseTeamForge() {
  return (
    <CaseLayout
      num="04"
      title="TeamForge"
      subtitle="Student innovation OS guiding idea → team → execution. Generates project blueprints from plain-language ideas and scores team compatibility via a TeamDNA system."
      category="Full-Stack · Collaboration Platform"
      tags={["React", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"]}
      color="#F1ECFB"
      accent="#8B5CF6"
      overview="TeamForge helps students turn ideas into real projects by guiding them through the complete journey: IDEA → TEAM → CHEMISTRY → BUILD → EXECUTION. Unlike traditional skill-matching platforms, it focuses on finding the right collaborators, verifying team compatibility, enabling communication, and helping teams execute successfully until project completion."
      problem="Students often have great project ideas but struggle to know what roles their idea actually requires, find teammates with complementary skills, verify whether a team will actually work well together, and stay organized once the team is formed. Most platforms stop at 'matching' and leave execution to chance."
      solution="TeamForge runs the full lifecycle in one place. IdeaForge converts a plain-language idea into required roles, must-have vs nice-to-have skills, and a viability score. AI Match and Discover Talent surface the right collaborators. A TeamDNA compatibility quiz scores chemistry and flags conflict risk before a team commits. SprintBoard then carries the team through execution with task tracking and an AI Sprint Coach."
      sections={[
        {
          title: "User Journey",
          body: [
            "Sign up with name, email, and password — no resume required",
            "Onboarding — skills, interests, availability, and optional bio/GitHub/LinkedIn",
            "Dashboard — stats, recommended collaborators, trending ideas, active teams, notifications",
            "IdeaForge — describe an idea in plain language; get required roles, skills, team size, and a viability score",
            "Find Collaborators — AI Match (ranked recommendations) or Discover Talent (manual filtered search)",
            "TeamDNA — a personality quiz assigns an archetype (Architect, Builder, Polisher, Visionary, Connector) and calculates compatibility + conflict risk",
            "Team Builder — add members, view team balance score, convert into a permanent team",
            "SprintBoard — task tracking, deadlines, sprint rooms, and an AI Sprint Coach",
            "SkillCircle — peer-to-peer skill exchange (e.g. React for ML knowledge)"
          ]
        },
        {
          title: "Smart Matching System",
          body: "TeamForge uses explainable scoring algorithms — not black-box AI — across every matching surface: idea role generation, collaborator recommendations, team chemistry analysis, skill-exchange matching, and team balance evaluation. Every recommendation comes with a visible reason, so students can trust and act on it."
        },
        {
          title: "TeamDNA Compatibility",
          body: "After completing a short quiz, each student is mapped to an archetype. The platform then calculates a compatibility score between any two students, surfaces missing team roles, and generates a team chemistry report before anyone formally joins — turning 'hope this works out' into a measurable decision."
        },
        {
          title: "Future Scope",
          body: [
            "Real-time direct messaging and group chats",
            "Permanent collaboration groups for future hackathons",
            "File sharing and media support",
            "Live notifications and video meeting integration",
            "Enhanced AI recommendations and mentorship support"
          ]
        }
      ]}
      techStack={[
        { label: "Frontend", items: ["React", "Vite", "Tailwind CSS"] },
        { label: "Backend", items: ["Node.js", "Express.js", "MongoDB", "Mongoose"] },
        { label: "Authentication", items: ["JWT", "bcryptjs"] },
        { label: "Deployment", items: ["Vercel", "Render"] }
      ]}
      links={[
        { label: "Live Demo", href: "https://team-forge-1-gws7.onrender.com/", icon: "🌐" },
        { label: "View Code", href: "https://github.com/srijitabiswas/Team-Forge", icon: "⌥" }
      ]}
      team={["Srijita Biswas"]}
    />
  );
}