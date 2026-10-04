import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github, CheckCircle2, AlertTriangle, Layers, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import { ProjectItem } from "../data/portfolioConfig";

interface ProjectCaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectCaseStudyModal({ project, onClose }: ProjectCaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl bg-neutral-950 border border-white/20 rounded-3xl p-6 sm:p-10 text-white shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between border-b border-white/10 pb-6 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                <span>CASE STUDY // {project.number}</span>
                <span>·</span>
                <span>{caseStudy.timeline}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display tracking-tight text-white">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm font-light text-white/70 max-w-xl pt-1">
                {caseStudy.overview}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors focus-visible:outline-white shrink-0 ml-4"
              aria-label="Close Case Study"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Info & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 mb-8 text-xs">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full bg-white/10 text-white/90 font-mono text-[10px]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {Boolean(project.liveUrl && project.liveUrl.trim()) && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-black uppercase text-[10px] tracking-wider hover:bg-neutral-200 transition-colors"
                >
                  <span>Live Demo</span>
                  <ExternalLink size={12} />
                </a>
              )}
              {Boolean(project.githubUrl && project.githubUrl.trim()) && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-black uppercase text-[10px] tracking-wider hover:bg-white/20 transition-colors"
                >
                  <Github size={12} />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 text-sm">
            {/* The Problem */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white/50">
                01. Problem & Objectives
              </h3>
              <p className="text-white/80 font-light leading-relaxed">
                {caseStudy.problem}
              </p>
            </div>

            {/* Architecture Highlights */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white/50">
                <Layers size={14} />
                <span>02. Architecture & Technical Decisions</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {caseStudy.architecture.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-light text-white/80 leading-relaxed"
                  >
                    <span className="font-mono text-[9px] text-white/40 block mb-1">
                      FEATURE 0{idx + 1}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Challenges & Solutions */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white/50">
                03. Engineering Challenges & Solutions
              </h3>
              <div className="space-y-3">
                {caseStudy.challenges.map((ch, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-rose-400 text-[11px] font-mono font-bold uppercase">
                        <AlertTriangle size={13} />
                        <span>Obstacle</span>
                      </div>
                      <p className="text-xs font-light text-white/80 leading-relaxed">
                        {ch.challenge}
                      </p>
                    </div>
                    <div className="space-y-1 sm:border-l sm:border-white/10 sm:pl-4">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-mono font-bold uppercase">
                        <CheckCircle2 size={13} />
                        <span>Engineered Fix</span>
                      </div>
                      <p className="text-xs font-light text-white/80 leading-relaxed">
                        {ch.solution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results & Metrics */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white/50">
                <TrendingUp size={14} />
                <span>04. Quantifiable Impact & Verification</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {caseStudy.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 text-center"
                  >
                    <span className="text-2xl font-display text-white tracking-tight block">
                      {m.value}
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-white/50 block mt-1">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer close button */}
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-white text-black font-black uppercase text-xs tracking-wider hover:bg-neutral-200 transition-colors"
            >
              Close Case Study
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
