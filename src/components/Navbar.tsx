import { useState } from "react";
import { motion } from "motion/react";
import { FileText } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavigateHomeSection: (sectionId: string) => void;
  onResumeClick: () => void;
}

export default function Navbar({
  activeSection,
  onNavigateHomeSection,
  onResumeClick
}: NavbarProps) {
  const navItems = [
    { id: "home", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "timeline", label: "EXPERIENCE" },
    { id: "projects", label: "WORK" },
    { id: "contact", label: "CONTACT" }
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <nav
        aria-label="Primary Navigation"
        className="px-5 sm:px-8 md:px-10 py-3 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex items-center gap-4 sm:gap-8 md:gap-10 transition-all duration-300 hover:bg-black/60"
      >
        {/* Navigation Links including EXPERIENCE */}
        <div className="flex items-center gap-4 sm:gap-7 md:gap-9">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigateHomeSection(item.id)}
                className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative py-1 focus-visible:outline-white whitespace-nowrap ${
                  isActive ? "text-white" : "text-white/40 hover:text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Visually Distinct Resume Button */}
        <div className="flex items-center pl-2 sm:pl-3 border-l border-white/15">
          <button
            onClick={onResumeClick}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] shadow-sm hover:bg-neutral-200 transition-all active:scale-95 focus-visible:outline-white"
            title="View or download Resume"
          >
            <FileText size={11} className="shrink-0" />
            <span>Resume</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
