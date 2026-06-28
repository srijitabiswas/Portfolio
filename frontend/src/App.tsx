import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Preloader from "./components/Preloader";
import CaseStudy from "./components/pages/CaseStudy";

import { AuthProvider } from "./admin/AuthContext";
import ProtectedRoute from "./admin/ProtectedRoute";
import AdminLayout from "./admin/layout/AdminLayout";
import AdminLogin from "./admin/pages/Login";
import AdminDashboard from "./admin/pages/Dashboard";
import ProjectList from "./admin/pages/projects/ProjectList";
import AdminHackathons from "./admin/pages/Hackathons";
import AdminCertifications from "./admin/pages/Certifications";
import AdminExperience from "./admin/pages/Experience";
import AdminSkills from "./admin/pages/Skills";
import AdminExploring from "./admin/pages/Exploring";
import AdminSocialLinks from "./admin/pages/SocialLinks";
import AdminResume from "./admin/pages/ResumeManager";

const Home = () => (
  <main>
    <Landing />
    <About />
    <Projects />
    <Skills />
    <Contact />
  </main>
);

const App = () => {
  const [ready, setReady] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isCaseStudyRoute = location.pathname.startsWith("/case");

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AuthProvider>
      <Cursor />
      <Preloader done={ready} />
      <div className={`site-body ${ready ? "site-body--visible" : ""}`}>
        {!isAdminRoute && !isCaseStudyRoute && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case/:slug" element={<CaseStudy />} />

          {/* ── Admin (authenticated) ── */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
          >
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<ProjectList />} />
            <Route path="hackathons" element={<AdminHackathons />} />
            <Route path="certifications" element={<AdminCertifications />} />
            <Route path="experience" element={<AdminExperience />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="exploring" element={<AdminExploring />} />
            <Route path="social-links" element={<AdminSocialLinks />} />
            <Route path="resume" element={<AdminResume />} />
          </Route>
        </Routes>
      </div>

      <style>{`
        .site-body {
          opacity:1;
        }
        .site-body--visible {
          opacity: 1;
        }
      `}</style>
    </AuthProvider>
  );
};

export default App;