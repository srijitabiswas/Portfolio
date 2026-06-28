import CaseLayout from "./CaseLayout";
 
export default function CaseSplitX() {
  return (
    <CaseLayout
      num="03"
      title="SplitX"
      subtitle="Smart group expense tracker built in 36 hours at a hackathon. RESTful APIs, structured MongoDB schema, and scalable backend architecture."
      category="Full-Stack · Hackathon"
      tags={["React Native", "Node.js", "Express.js", "MongoDB", "Mongoose", "REST API"]}
      color="#E5F9EF"
      accent="#2D8653"
      overview="SplitX is a group expense tracking application built during a 36-hour hackathon. It enables users to create groups, add members, log shared expenses, and track who owes whom — all through a clean REST API and structured database schema designed for scale."
      problem="In group settings like trips, shared housing, or events, expense tracking is chaotic. Manual calculations are error-prone, WhatsApp messages get lost, and there's no single source of truth for who paid what. Existing apps are often bloated and require accounts even for simple splitting."
      solution="Built a RESTful backend system with a carefully structured MongoDB schema that captures the full expense lifecycle — from group creation to individual splits. The system uses ObjectId references for clean data relationships and implements cascade deletion to maintain database integrity automatically."
      sections={[
        {
          title: "System Architecture",
          body: [
            "Node.js + Express handles all API routing with clean separation of concerns between routes, controllers, and models.",
            "MongoDB manages data using Mongoose schema-based modelling with strict validation and type enforcement.",
            "ObjectId references maintain clean relationships between Users, Groups, and Expenses without data duplication.",
            "Centralized error handling middleware catches and formats all errors consistently across endpoints.",
            "Modular route structure — each resource (users, groups, expenses) has its own router file for maintainability."
          ]
        },
        {
          title: "API Design",
          body: [
            "POST /users → Create a new user with name and email validation",
            "POST /groups → Create a group with name and initial member list",
            "GET /groups → Fetch all groups with member details populated",
            "POST /expenses → Add an expense with amount, payer, and split configuration",
            "GET /groups/:id/expenses → Get all expenses for a specific group with split breakdowns",
            "DELETE /groups/:id → Delete group with automatic cascade deletion of all related expenses"
          ]
        },
        {
          title: "Database Design",
          body: "Three core models: User (name, email, timestamps), Group (name, members as User ObjectId references, createdAt), and Expense (groupId reference, amount, paidBy User reference, splitBetween array of User references, description, date). The schema enforces referential integrity and enables efficient queries for any group's complete expense history."
        },
        {
          title: "Highlight: Cascade Deletion",
          body: "Implemented Mongoose middleware (pre 'findOneAndDelete' hook) to automatically remove all associated expenses when a group is deleted. This prevents orphan data accumulation in the database and ensures consistency without requiring the client to make multiple deletion calls."
        },
        {
          title: "My Role",
          body: [
            "Designed the overall product structure, user flow, and API contract before any code was written",
            "Developed all backend APIs using Node.js, Express.js, and Mongoose",
            "Designed the database schema with relationships and constraints optimised for querying patterns",
            "Implemented cascade deletion middleware and centralized error handling"
          ]
        },
        {
          title: "Challenges",
          body: [
            "Designing a scalable schema in 36 hours required immediate decisions without time to iterate — we committed to the data model early and built everything around it.",
            "Ensuring stable API behaviour under the hackathon time pressure required disciplined testing of each endpoint before moving on.",
            "Balancing speed and correctness — every shortcut taken in a hackathon becomes technical debt; we documented everything we'd do differently in production."
          ]
        },
        {
          title: "Future Improvements",
          body: [
            "Balance calculation engine — 'who owes whom' computation across the full group",
            "JWT Authentication for secure, session-based access",
            "Payment integration with UPI and Razorpay for in-app settlement",
            "Push notifications and payment reminders",
            "Frontend mobile app with React Native fully connected to the backend"
          ]
        }
      ]}
      techStack={[
        { label: "Frontend", items: ["React Native"] },
        { label: "Backend", items: ["Node.js", "Express.js"] },
        { label: "Database", items: ["MongoDB", "Mongoose"] },
        { label: "Architecture", items: ["REST API", "MVC Pattern", "Middleware"] }
      ]}
      links={[
        { label: "Live Demo", href: "https://split-x-umber.vercel.app/", icon: "↗" },
        { label: "Demo Video", href: "https://youtu.be/XQ5NcQqnnzA?si=PS32KuPk1aS1AcEi", icon: "▶" },
        { label: "View Code", href: "https://github.com/srijitabiswas/SplitX-", icon: "⌥" }
      ]}
      team={["Srijita Biswas"]}
    />
  );
}