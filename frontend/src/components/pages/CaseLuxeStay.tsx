import CaseLayout from "./CaseLayout";
 
export default function CaseLuxeStay() {
  return (
    <CaseLayout
      num="02"
      title="LuxeStay Villas"
      subtitle="End-to-end product design for a dual-sided luxury rental platform — from user research to high-fidelity Figma prototypes."
      category="UX Design · Figma · Prototyping"
      tags={["Figma", "UX Research", "Prototyping", "Design Systems", "User Testing"]}
      color="#EDE8FF"
      accent="#7C6FCD"
      overview="LuxeStay Villas is a dual-sided rental platform designed through a full product design sprint. The platform serves both property owners listing luxury villas and guests looking to book them, with distinct flows for each user type. Developed as part of the XPMC Xpro Program by Employability.life."
      problem="Existing rental platforms create friction on both sides of the marketplace. Owners struggle with unclear listing flows and lack of trust signals. Guests face confusing booking processes, poor information hierarchy, and no way to verify property authenticity — leading to drop-offs and low conversion rates."
      research="Our research focused on the challenges of designing a user-friendly luxury rental platform. We identified key pain points in the current market landscape, including the need for trust-building mechanisms and streamlined booking processes."
      solution="Designed a dual-sided platform that simplifies every interaction. Owners get a clear, guided listing experience with trust badges and verification flows. Guests get structured property pages, transparent pricing, and a frictionless booking journey. Every screen was tested and validated through structured user interviews."
      sections={[
        {
          title: "Product Journey",
          body: [
            "Week 1 — Research: Conducted user interviews with 8 potential guests and 4 property owners. Identified key pain points around trust, pricing transparency, and communication.",
            "Week 2 — Planning: Defined product scope, feature priorities, and user journey maps for both owner and guest personas.",
            "Week 3 — Design: Created low-fidelity wireframes for 12 core screens. Established information architecture and navigation structure.",
            "Week 4 — Prototype: Built interactive Figma prototypes with full user flows for both personas.",
            "Week 5 — Testing: Conducted usability testing with 6 participants. Identified 3 critical flow improvements and refined designs.",
            "Week 6 — Handoff: Delivered annotated design files, component library, and design documentation."
          ]
        },
        {
          title: "Key Features",
          body: [
            "Dual user flows — completely separate experiences for Owners and Guests with role-based navigation",
            "Owner listing flow — step-by-step property setup with photo uploads, amenity selection, and pricing tools",
            "Guest booking experience — clean property pages with availability calendar, transparent fee breakdown",
            "Trust-building UI elements — verification badges, review system, owner response rate display",
            "Structured navigation — clear hierarchy with breadcrumbs and consistent back-navigation",
            "Design system — reusable component library with consistent typography, spacing, and colour tokens"
          ]
        },
        {
          title: "My Role",
          body: "Led UX decision-making and design direction across the 6-week sprint. Designed all user flows, wireframes, and interface layouts. Coordinated team efforts across sprint stages and presented design solutions to the Product Owner. Made final calls on information architecture and interaction patterns."
        },
        {
          title: "Outcome",
          body: "Delivered a complete product experience with validated user flows, high-fidelity Figma prototypes, and structured design documentation. Usability testing showed a 40% reduction in task completion time for the booking flow compared to the benchmark. The solution was recognised for clarity in user journeys and scalable design foundation."
        },
        {
          title: "Key Learnings",
          body: [
            "Clarity in thinking leads to better product decisions — defining the 'why' before the 'how' saved significant rework.",
            "UX is deeply connected to communication — the quality of handoff documentation is as important as the design itself.",
            "Structured workflows and sprint discipline improve both efficiency and the quality of final outputs.",
            "User testing early (not just at the end) is the single highest-ROI activity in a product design process."
          ]
        }
      ]}
      techStack={[
        { label: "Design", items: ["Figma", "FigJam", "Figma Prototyping"] },
        { label: "Research", items: ["User Interviews", "Usability Testing", "Journey Mapping"] }
      ]}
      links={[
        { label: "View Prototype", href: "https://www.figma.com/proto/Er6E5rxicPilErJcIElShy/sprint-2--week-4?node-id=312-1430&t=ZEMmqf3thf26ypUK-1&starting-point-node-id=312%3A1430", icon: "🎨" }
      ]}
    />
  );
}