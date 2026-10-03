/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import TimelineSection from "./components/TimelineSection";
import ProjectsSection from "./components/ProjectsSection";
import ProjectCaseStudyModal from "./components/ProjectCaseStudyModal";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ResumeModal from "./components/ResumeModal";
import { ProjectItem } from "./data/portfolioConfig";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedProjectForCaseStudy, setSelectedProjectForCaseStudy] = useState<ProjectItem | null>(null);

  // Parallax transform for Hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const xRight = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Section Observer for active nav highlight (Home, About, Experience, Work, Contact)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px",
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sectionIds = ["home", "about", "timeline", "projects", "contact"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigateHomeSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[200vh] w-full font-sans selection:bg-black selection:text-white"
    >
      {/* Floating Glassy Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigateHomeSection={handleNavigateHomeSection}
        onResumeClick={() => setIsResumeModalOpen(true)}
      />

      {/* Main Portfolio Sections */}
      <main>
        {/* Scroll Target for Home Anchor */}
        <div id="home" className="h-screen w-full" />

        {/* Section 1: Hero (Fixed with Parallax) */}
        <Hero
          xLeft={xLeft}
          xRight={xRight}
          onContactClick={() => handleNavigateHomeSection("contact")}
        />

        {/* Parallax Spacer to let user scroll into content */}
        <div className="h-screen pointer-events-none" />

        {/* Section 2: The Engineer (About) */}
        <AboutSection />

        {/* Section 3: Experience & Education Timeline */}
        <TimelineSection />

        {/* Section 4: Selected Works (Projects) with Live Link, GitHub, and Case Study buttons */}
        <ProjectsSection onSelectCaseStudy={(p) => setSelectedProjectForCaseStudy(p)} />

        {/* Section 6: Get In Touch (Contact) */}
        <ContactSection />

        {/* Footer */}
        <Footer onNavigate={handleNavigateHomeSection} />
      </main>

      {/* In-Depth Case Study Modal */}
      <ProjectCaseStudyModal
        project={selectedProjectForCaseStudy}
        onClose={() => setSelectedProjectForCaseStudy(null)}
      />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}
