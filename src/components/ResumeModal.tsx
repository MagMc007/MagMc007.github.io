import { motion, AnimatePresence } from "motion/react";
import { X, Download, FileText, ExternalLink, CheckCircle, GraduationCap, Briefcase } from "lucide-react";
import { useEffect } from "react";
import { PORTFOLIO_DATA } from "../data/portfolioConfig";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { personal, education, experience, techStack } = PORTFOLIO_DATA;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl bg-neutral-900 border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-black">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="font-display text-xl uppercase tracking-wider text-white">
                    Curriculum Vitae
                  </h3>
                  <p className="text-[10px] font-mono text-white/50 tracking-wider">
                    {personal.name} · {personal.targetRole}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Resume Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a
                href={personal.resumeUrl}
                download="Merga_Mekonnen_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-5 rounded-xl bg-white text-black font-black uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors shadow-md"
              >
                <Download size={15} />
                <span>Download PDF ({personal.resumeUrl})</span>
              </a>

              <a
                href={`mailto:${PORTFOLIO_DATA.contact.email}?subject=Requesting%20Resume%20for%20${encodeURIComponent(personal.name)}`}
                className="py-3 px-5 rounded-xl bg-white/10 border border-white/20 text-white font-black uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
              >
                <ExternalLink size={14} />
                <span>Request Latest Copy</span>
              </a>
            </div>

            {/* Recruiter Quick Sheet Preview */}
            <div className="space-y-6 text-xs text-white/80 bg-black/50 p-5 rounded-2xl border border-white/10">
              {/* Summary */}
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block mb-1">
                  Professional Summary
                </span>
                <p className="leading-relaxed font-light text-white/90">
                  {personal.bioParagraphs[0]}
                </p>
              </div>

              {/* Core Stack */}
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block mb-2">
                  Technical Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {techStack.map((t) => (
                    <span
                      key={t.name}
                      className="px-2 py-0.5 rounded bg-white/10 text-white/90 font-mono text-[10px]"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block mb-2">
                  Education
                </span>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id} className="border-l-2 border-white/20 pl-3">
                      <div className="font-bold text-white text-xs">{edu.degree}</div>
                      <div className="text-[11px] text-white/60">
                        {edu.school} ({edu.period})
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Experience */}
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block mb-2">
                  Recent Experience
                </span>
                <div className="space-y-2">
                  {experience.slice(0, 2).map((exp) => (
                    <div key={exp.id} className="border-l-2 border-white/20 pl-3">
                      <div className="font-bold text-white text-xs">{exp.role}</div>
                      <div className="text-[11px] text-white/60">
                        {exp.organization} · {exp.period}
                      </div>
                      <p className="text-[11px] font-light text-white/70 mt-0.5">
                        {exp.bullets[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Note for the User */}
            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-[10px] text-white/50 leading-relaxed">
              💡 <span className="font-bold text-white/70">Configuration Tip:</span> Place your compiled PDF at <code className="text-white/80">/public/resume.pdf</code>, or paste your Google Drive / LinkedIn document link inside <code className="text-white/80">src/data/portfolioConfig.ts</code> under <code className="text-white/80">personal.resumeUrl</code>.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
