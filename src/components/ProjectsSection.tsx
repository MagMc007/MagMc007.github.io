import { motion } from "motion/react";
import { ExternalLink, Github, BookOpen, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { ProjectItem } from "../data/portfolioConfig";
import projectsData from "../data/projects.json";

const projectImages = import.meta.glob<string>("../img/*.{png,jpg,jpeg,svg,webp}", {
  eager: true,
  import: "default",
});

function resolveProjectImage(src: string): string {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  const filename = src.split("/").pop();
  if (filename) {
    const entry = Object.entries(projectImages).find(([key]) => key.endsWith(`/${filename}`));
    if (entry) {
      return entry[1];
    }
  }
  return src.startsWith("/") ? src : `/${src}`;
}

interface ProjectsSectionProps {
  onSelectCaseStudy: (project: ProjectItem) => void;
}

export default function ProjectsSection({ onSelectCaseStudy }: ProjectsSectionProps) {
  const { header, actions, projects } = projectsData;
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="projects"
      aria-label={header.badge}
      className="relative z-20 min-h-screen bg-black text-white p-6 sm:p-10 md:p-24 flex flex-col justify-center border-t border-white/10"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-6xl sm:text-7xl md:text-9xl pt-10 md:pt-0 font-display tracking-tighter leading-none">
            {header.titleLine1} <br />
            <span className="text-white/20">{header.titleLine2}</span>
          </h2>
          <div className="flex items-center gap-4 mt-8 opacity-40">
            <div className="h-[1px] w-12 bg-white" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase">
              {header.badge}
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
                      src={resolveProjectImage(project.image)}
                      alt={project.title}
                      onError={() => handleImageError(project.id)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
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
                </div>

                {/* Project Details */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center gap-4">
                    <h3 className="text-2xl md:text-4xl font-display tracking-tight">
                      {project.title}
                    </h3>

                    {/* Action Links: Always visible in place of project number */}
                    <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                      {/* 1. Live Link (rendered only if liveUrl is provided and not empty) */}
                      {Boolean(project.liveUrl && project.liveUrl.trim()) && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 sm:p-3 rounded-full bg-white text-black hover:scale-110 active:scale-95 transition-transform shadow-lg focus-visible:outline-white"
                          title={actions.liveDemo}
                          aria-label={`${actions.liveDemo} for ${project.title}`}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}

                      {/* 2. GitHub */}
                      {Boolean(project.githubUrl && project.githubUrl.trim()) && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 sm:p-3 rounded-full bg-white text-black hover:scale-110 active:scale-95 transition-transform shadow-lg focus-visible:outline-white"
                          title={actions.viewGithub}
                          aria-label={`${actions.viewGithub} for ${project.title}`}
                        >
                          <Github size={16} />
                        </a>
                      )}

                      {/* 3. Case Study */}
                      <button
                        onClick={() => onSelectCaseStudy(project as unknown as ProjectItem)}
                        className="p-2.5 sm:p-3 rounded-full bg-white text-black hover:scale-110 active:scale-95 transition-transform shadow-lg focus-visible:outline-white cursor-pointer"
                        title={actions.readCaseStudy}
                        aria-label={`${actions.readCaseStudy} for ${project.title}`}
                      >
                        <BookOpen size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Simple sentence description div */}
                  {project.tagline && (
                    <div className="text-sm sm:text-base text-white/80 font-normal leading-relaxed">
                      {project.tagline}
                    </div>
                  )}

                  <p className="text-white/60 font-light leading-relaxed max-w-md">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-start gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 border border-white/10 rounded-full text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
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
