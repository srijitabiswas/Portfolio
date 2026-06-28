import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CaseLayout from "./CaseLayout";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function CaseStudy() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setData(null);
    setError("");
    (async () => {
      try {
        const res = await fetch(`${API_URL}/projects/${slug}`);
        if (!res.ok) throw new Error("Project not found");
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || "Failed to load project");
      }
    })();
  }, [slug]);

  if (error) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, color: "#fff", background: "#000" }}>
        <p style={{ fontSize: 18, fontWeight: 700 }}>Project not found</p>
        <button
          onClick={() => navigate("/#projects")}
          style={{ padding: "10px 22px", borderRadius: 10, background: "#8b5cf6", color: "#fff", border: "none", fontWeight: 700, cursor: "pointer" }}
        >
          ← Back to Projects
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", background: "#000" }}>
        Loading…
      </div>
    );
  }

  return (
    <CaseLayout
      num={data.num}
      title={data.title}
      subtitle={data.caseStudy?.subtitle || data.tagline}
      category={data.category}
      tags={data.caseStudy?.tags || data.cardTags || []}
      color={data.caseStudy?.color || "#1A1A1A"}
      accent={data.accent}
      overview={data.caseStudy?.overview || ""}
      problem={data.caseStudy?.problem || ""}
      solution={data.caseStudy?.solution || ""}
      sections={data.caseStudy?.sections || []}
      links={data.links}
      team={data.caseStudy?.team}
      techStack={data.caseStudy?.techStack}
    />
  );
}
