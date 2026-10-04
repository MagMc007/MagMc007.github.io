import { motion } from "motion/react";
import { GraduationCap, Briefcase, Award } from "lucide-react";
import timelineData from "../data/experience.json";
import { PORTFOLIO_DATA } from "../data/portfolioConfig";

export default function TimelineSection() {
  const { header, experience, education, verification } = timelineData;
  const resumeLink = verification?.resumeUrl || PORTFOLIO_DATA.personal.resumeUrl;

  return (
    <section
      id="timeline"
      aria-label="Experience and Education Timeline"
      className="relative z-20 min-h-screen bg-neutral-950 text-white p-6 sm:p-12 md:p-24 flex flex-col justify-center border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-5xl sm:text-7xl md:text-9xl pt-6 md:pt-0 font-display tracking-tighter leading-none">
            {header.titleLine1} <br />
            <span className="text-white/20">{header.titleLine2}</span>
          </h2>
          <div className="flex items-center gap-4 mt-6 opacity-40">
            <div className="h-[1px] w-12 bg-white" />
            <span className="text-[10px] font-black tracking-[0.35em] uppercase">
              {header.badge}
            </span>
          </div>
        </motion.div>

        {/* Two-Column Grid: Experience (Left) & Education (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Column 1: Experience (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <Briefcase size={18} className="text-white/70" />
              <h3 className="text-xl sm:text-2xl font-display uppercase tracking-wider text-white">
                {experience.title}
              </h3>
            </div>

            <div className="relative pl-6 sm:pl-8 space-y-8 border-l border-white/15">
              {experience.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-black border-2 border-white group-hover:bg-white group-hover:scale-125 transition-all" />

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {item.role}
                      </h4>
                      <span className="text-[11px] font-mono text-white/50 bg-white/5 px-2.5 py-0.5 rounded-md">
                        {item.period}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
                      <span className="font-semibold text-white/90">
                        {item.organization}
                      </span>
                      <span className="opacity-40">·</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-white/80">
                        {item.type}
                      </span>
                      {item.location && (
                        <>
                          <span className="opacity-40">·</span>
                          <span className="opacity-60">{item.location}</span>
                        </>
                      )}
                    </div>

                    {/* Bullets with concrete results */}
                    <ul className="pt-2 space-y-1.5 text-xs sm:text-sm font-light text-white/70 list-disc list-outside pl-4 leading-relaxed">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>

                    {/* Tech stack tags */}
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] font-mono font-medium text-white/50 bg-white/5 px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Education (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <GraduationCap size={18} className="text-white/70" />
              <h3 className="text-xl sm:text-2xl font-display uppercase tracking-wider text-white">
                {education.title}
              </h3>
            </div>

            <div className="relative pl-6 sm:pl-8 space-y-8 border-l border-white/15">
              {education.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-black border-2 border-white/80 group-hover:bg-white group-hover:scale-125 transition-all" />

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {item.degree}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <span className="font-semibold text-white/90">
                        {item.school}
                      </span>
                      <span className="opacity-40">·</span>
                      <span className="font-mono text-[10px] text-white/50">
                        {item.period}
                      </span>
                    </div>

                    {/* Highlights */}
                    <div className="pt-2 space-y-2">
                      {item.highlights.map((hl, hlIdx) => (
                        <div
                          key={hlIdx}
                          className="flex items-start gap-2 text-xs font-light text-white/75 leading-relaxed bg-white/5 p-2.5 rounded-xl border border-white/5"
                        >
                          <Award size={14} className="shrink-0 text-white/50 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
