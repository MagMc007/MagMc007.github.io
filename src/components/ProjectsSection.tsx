import { motion } from "motion/react";
import { ExternalLink, Github, BookOpen, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { PORTFOLIO_DATA, ProjectItem } from "../data/portfolioConfig";

interface ProjectsSectionProps {
  onSelectCaseStudy: (project: ProjectItem) => void;
}

export default function ProjectsSection({ onSelectCaseStudy }: ProjectsSectionProps) {
  const { projects } = PORTFOLIO_DATA;
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="projects"
      aria-label="Selected Works"
      className="relative z-20 min-h-screen bg-black text-white p-6 sm:p-12 md:p-24 flex flex-col justify-center border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-6xl sm:text-7xl md:text-9xl pt-10 md:pt-0 font-display tracking-tighter leading-none">
            SELECTED <br />
            <span className="text-white/20">WORKS</span>
          </h2>
          <div className="flex items-center gap-4 mt-8 opacity-40">
            <div className="h-[1px] w-12 bg-white" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase">
              Projects
            </span>
          </div>
        </motion.div>

        {/* 2-Column Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {projects.map((project, index) => {
            const isImageBroken = failedImages[project.id];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group space-y-6"
              >
                {/* Project Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-white/5 rounded-2xl border border-white/10 shadow-xl">
                  {!isImageBroken ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      onError={() => handleImageError(project.id)}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-neutral-900 to-black text-white">
                      <div className="flex justify-between items-center text-white/30 text-xs font-mono">
                        <span>SYS // {project.number}</span>
                        <span>SOFTWARE</span>
                      </div>
                      <div>
                        <h4 className="font-display text-2xl tracking-tight text-white/90">
                          {project.title.split("–")[0]}
                        </h4>
                        <p className="text-xs font-light text-white/50 line-clamp-2 mt-1">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Hover Overlay with All 3 Action Icons: Live Link, GitHub, and Case Study */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3.5 z-20 backdrop-blur-[2px]">
                    {/* 1. Live Link */}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-full bg-white text-black hover:scale-110 active:scale-95 transition-transform shadow-lg focus-visible:outline-white"
                      title="Live Demo"
                      aria-label={`Live demo for ${project.title}`}
                    >
                      <ExternalLink size={18} />
                    </a>

                    {/* 2. GitHub */}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-full bg-white text-black hover:scale-110 active:scale-95 transition-transform shadow-lg focus-visible:outline-white"
                      title="View GitHub"
                      aria-label={`GitHub repo for ${project.title}`}
                    >
                      <Github size={18} />
                    </a>

                    {/* 3. Case Study */}
                    <button
                      onClick={() => onSelectCaseStudy(project)}
                      className="p-3.5 rounded-full bg-white text-black hover:scale-110 active:scale-95 transition-transform shadow-lg focus-visible:outline-white"
                      title="Read Case Study"
                      aria-label={`Read case study for ${project.title}`}
                    >
                      <BookOpen size={18} />
                    </button>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <h3 className="text-2xl md:text-4xl font-display tracking-tight">
                      {project.title}
                    </h3>
                    <span className="text-4xl font-display text-white/10 font-mono">
                      {project.number}
                    </span>
                  </div>

                  <p className="text-white/60 font-light leading-relaxed max-w-md">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-white/10 rounded-full text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Direct Case Study Link */}
                  <div className="pt-1">
                    <button
                      onClick={() => onSelectCaseStudy(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors border-b border-white/30 pb-0.5"
                    >
                      <span>Read Case Study</span>
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
