import { motion } from "motion/react";
import { FileText } from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioConfig";

interface NavbarProps {
  activeSection: string;
  onNavigateHomeSection: (sectionId: string) => void;
  onResumeClick?: () => void;
  resumeUrl?: string;
}

export default function Navbar({
  activeSection,
  onNavigateHomeSection,
  onResumeClick,
  resumeUrl = PORTFOLIO_DATA.personal.resumeUrl
}: NavbarProps) {
  const navItems = [
    { id: "home", label: "Home", shortLabel: "Home" },
    { id: "about", label: "About", shortLabel: "About" },
    { id: "timeline", label: "Experience", shortLabel: "Exp" },
    { id: "projects", label: "Work", shortLabel: "Work" },
    { id: "contact", label: "Contact", shortLabel: "Contact" }
  ];

  return (
    <header className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-[calc(100vw-1rem)] sm:max-w-none flex justify-center">
      <nav
        aria-label="Primary Navigation"
        className="px-2.5 sm:px-6 md:px-8 py-1.5 sm:py-2.5 rounded-full bg-black/65 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] flex items-center gap-2 sm:gap-5 md:gap-7 transition-all duration-300 hover:bg-black/90 max-w-full"
      >
        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-4 md:gap-6 shrink-0">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigateHomeSection(item.id)}
                className={`text-[11px] sm:text-[13px] md:text-sm font-bold tracking-[0.06em] sm:tracking-[0.16em] transition-all duration-300 relative px-1 sm:px-1.5 py-1 sm:py-1.5 flex items-center justify-center leading-none focus-visible:outline-white whitespace-nowrap cursor-pointer ${
                  isActive ? "text-white" : "text-white/45 hover:text-white"
                }`}
              >
                {/* On small mobile screens use shortLabel to avoid overflow */}
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.shortLabel}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute -bottom-0.5 sm:-bottom-1 left-0 right-0 h-[2px] bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Centered Separator Divider */}
        <div className="h-4 sm:h-6 w-[1px] bg-white/20 shrink-0 self-center" aria-hidden="true" />

        {/* Visually Distinct and Centered Resume Button */}
        <div className="flex items-center justify-center shrink-0">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onResumeClick}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-white text-black text-[11px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] sm:tracking-[0.16em] shadow-md hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-white leading-none"
            title="Open Resume in new tab"
          >
            <FileText size={12} className="shrink-0 sm:hidden" />
            <FileText size={15} className="shrink-0 hidden sm:block" />
            <span className="leading-none">Resume</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
