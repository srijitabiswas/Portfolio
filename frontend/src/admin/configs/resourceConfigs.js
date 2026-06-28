export const hackathonConfig = {
  title: "Hackathons",
  singular: "Hackathon",
  endpoint: "/hackathons",
  hasPublish: true,
  columns: [
    { key: "name", label: "Name" },
    { key: "date", label: "Date" },
    { key: "projectSlug", label: "Linked Project" },
  ],
  fields: [
    { key: "name", label: "Hackathon Name", type: "text", required: true },
    { key: "date", label: "Date", type: "text", required: true, hint: 'Free text, e.g. "Mar 2026 – Apr 2026" or "Aug 2025"' },
    { key: "badge", label: "Badge (optional)", type: "text", hint: 'e.g. "🏆 Top 150 of 1.4K+ participants"' },
    { key: "bullets", label: "Description Points", type: "array", hint: "Comma-separated — each becomes a bullet point" },
    {
      key: "projectSlug", label: "Linked Project Slug (optional)", type: "text",
      hint: 'Match a project\'s slug exactly (e.g. "glowai") to show a "View Project" button on this card. Leave blank for none.',
    },
    { key: "order", label: "Display Order", type: "number", hint: "Lower numbers show first." },
  ],
};

export const certificationConfig = {
  title: "Certifications",
  singular: "Certification",
  endpoint: "/certifications",
  hasPublish: true,
  columns: [
    { key: "title", label: "Title" },
    { key: "organization", label: "Organization" },
    { key: "issueDate", label: "Issued", type: "date" },
  ],
  fields: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "organization", label: "Issuing Organization", type: "text", required: true },
    { key: "issueDate", label: "Issue Date", type: "date", required: true },
    { key: "credentialUrl", label: "Credential URL", type: "text" },
    { key: "image", label: "Certificate Image or PDF", type: "file" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "order", label: "Display Order", type: "number", hint: "Lower numbers show first." },
  ],
};

export const experienceConfig = {
  title: "Work Experience",
  singular: "Experience",
  endpoint: "/experience",
  hasPublish: true,
  columns: [
    { key: "company", label: "Company" },
    { key: "role", label: "Role" },
    { key: "startDate", label: "Start", type: "date" },
    { key: "endDate", label: "End", type: "date" },
  ],
  fields: [
    { key: "company", label: "Company Name", type: "text", required: true },
    { key: "role", label: "Role", type: "text", required: true },
    { key: "employmentType", label: "Employment Type", type: "text", hint: "e.g. Full-time, Internship, Freelance" },
    { key: "startDate", label: "Start Date", type: "date", required: true },
    { key: "endDate", label: "End Date", type: "date", hint: "Leave blank for \"Present\"" },
    { key: "location", label: "Location", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "achievements", label: "Key Achievements", type: "array", hint: "Comma-separated" },
    { key: "technologies", label: "Technologies Used", type: "array", hint: "Comma-separated" },
    { key: "companyWebsite", label: "Company Website", type: "text" },
    { key: "companyLogo", label: "Company Logo", type: "file" },
    { key: "order", label: "Display Order", type: "number" },
  ],
};

export const skillConfig = {
  title: "Skills",
  singular: "Skill",
  endpoint: "/skills",
  hasPublish: true,
  columns: [
    { key: "name", label: "Skill" },
    { key: "category", label: "Category" },
  ],
  fields: [
    { key: "name", label: "Skill Name", type: "text", required: true },
    {
      key: "category", label: "Category", type: "select", required: true,
      options: ["Languages", "Web Development", "Databases", "AI & Machine Learning", "Tools & Design"],
    },
    { key: "order", label: "Display Order", type: "number" },
  ],
};

export const exploringConfig = {
  title: "Currently Exploring",
  singular: "Topic",
  endpoint: "/exploring",
  hasPublish: false,
  columns: [{ key: "topic", label: "Topic" }],
  fields: [
    { key: "topic", label: "Topic", type: "text", required: true },
    { key: "order", label: "Display Order", type: "number" },
  ],
};

export const socialLinkConfig = {
  title: "Social Links",
  singular: "Link",
  endpoint: "/social-links",
  hasPublish: false,
  columns: [
    { key: "platform", label: "Platform" },
    { key: "url", label: "URL" },
  ],
  fields: [
    {
      key: "platform", label: "Platform", type: "select", required: true,
      options: ["GitHub", "LinkedIn", "Email", "Portfolio", "YouTube", "X", "Custom"],
    },
    { key: "label", label: "Custom Label", type: "text", hint: "Only used when Platform = Custom" },
    { key: "url", label: "URL", type: "text", required: true },
    { key: "order", label: "Display Order", type: "number" },
  ],
};
