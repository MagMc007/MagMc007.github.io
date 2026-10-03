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
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "timeline", label: "Experience" },
    { id: "projects", label: "Work" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <nav
        aria-label="Primary Navigation"
        className="px-4 sm:px-7 md:px-9 py-2 sm:py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.35)] flex items-center gap-3 sm:gap-6 md:gap-8 transition-all duration-300 hover:bg-black/85"
      >
        {/* Navigation Links */}
        <div className="flex items-center gap-3 sm:gap-5 md:gap-7">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigateHomeSection(item.id)}
                className={`text-xs sm:text-[13px] md:text-sm font-bold tracking-[0.16em] transition-all duration-300 relative px-1 py-1.5 flex items-center justify-center leading-none focus-visible:outline-white whitespace-nowrap cursor-pointer ${
                  isActive ? "text-white" : "text-white/45 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Centered Separator Divider */}
        <div className="h-5 sm:h-6 w-[1px] bg-white/20 shrink-0 self-center" aria-hidden="true" />

        {/* Visually Distinct and Centered Resume Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={onResumeClick}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white text-black text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.16em] shadow-md hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-white leading-none"
            title="View or download Resume"
          >
            <FileText size={15} className="shrink-0" />
            <span className="leading-none">Resume</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
