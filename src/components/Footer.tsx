import { PORTFOLIO_DATA } from "../data/portfolioConfig";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { personal } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      aria-label="Site Footer"
      className="relative z-20 bg-black text-white p-8 sm:p-12 md:p-24 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="space-y-4">
          <h4 className="text-4xl sm:text-5xl md:text-6xl font-display tracking-tighter leading-none">
            {personal.firstName} <br /> {personal.lastName}
          </h4>
          <p className="text-white/40 text-xs font-bold uppercase tracking-[0.25em]">
            {personal.targetRole}
          </p>
        </div>

        <div className="flex flex-row flex-wrap gap-12 sm:gap-20 md:gap-24 text-[10px] font-bold uppercase tracking-widest">
          <div className="space-y-3">
            <span className="opacity-30 block">Quick Links</span>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => onNavigate("home")}
                className="text-left text-white/70 hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => onNavigate("about")}
                className="text-left text-white/70 hover:text-white transition-colors"
              >
                About
              </button>
              <button
                onClick={() => onNavigate("timeline")}
                className="text-left text-white/70 hover:text-white transition-colors"
              >
                Experience
              </button>
              <button
                onClick={() => onNavigate("projects")}
                className="text-left text-white/70 hover:text-white transition-colors"
              >
                Work
              </button>
              <button
                onClick={() => onNavigate("contact")}
                className="text-left text-white/70 hover:text-white transition-colors"
              >
                Contact
              </button>
            </nav>
          </div>

          <div className="space-y-3">
            <span className="opacity-30 block">Location</span>
            <p className="text-white/70 font-light leading-relaxed">
              Adama, <br /> Ethiopia
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 sm:mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-40">
        <span>© {new Date().getFullYear()} {personal.name}. All rights reserved.</span>
        <div className="flex gap-6 items-center">
          <button
            onClick={scrollToTop}
            className="hover:text-white transition-colors focus-visible:outline-white"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
