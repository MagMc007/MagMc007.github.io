import { motion } from "motion/react";
import aboutData from "../data/about.json";

function renderHighlightedText(text: string, highlights: string[] = []) {
  if (!highlights || highlights.length === 0) return text;
  const regex = new RegExp(`(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    highlights.includes(part) ? (
      <span key={i} className="font-bold text-black">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function AboutSection() {
  const { header, headline, expertise, philosophy, calloutQuote, techStack } = aboutData;

  return (
    <section
      id="about"
      aria-label={header.badge}
      className="relative z-20 min-h-screen bg-white p-6 sm:p-12 md:p-24 flex flex-col justify-center border-t border-black/5"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-12 md:gap-16">
        {/* Section Header */}
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl sm:text-7xl md:text-9xl pt-10 md:pt-0 font-display tracking-tighter leading-[0.85] mb-8">
              {header.titleLine1} <br />
              <span className="text-outline">{header.titleLine2}</span>
            </h2>
            <div className="flex items-center gap-4 opacity-40">
              <div className="h-[1px] w-12 bg-black" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase">
                {header.badge}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 md:space-y-12"
          >
            {/* Lead Headline */}
            <h3 className="text-3xl md:text-5xl font-display tracking-tight leading-tight">
              {headline.prefix}
              {headline.highlight && <span className="italic">{headline.highlight}</span>}
              {headline.suffix}
            </h3>

            {/* Expertise & Philosophy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-30">
                  {expertise.label}
                </span>
                <p className="text-lg font-light leading-relaxed text-black/70">
                  {renderHighlightedText(expertise.text, expertise.highlights)}
                </p>
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-30">
                  {philosophy.label}
                </span>
                <p className="text-lg font-light leading-relaxed text-black/70">
                  {philosophy.text}
                </p>
              </div>
            </div>

            {/* Bio Callout */}
            <div className="pt-8 border-t border-black/5">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-black/80">
                {calloutQuote.text}
              </p>
            </div>

            {/* Tech Stack Grouped by Category */}
            <div className="space-y-6 pt-8 border-t border-black/5">
              <div>
                <h4 className="text-2xl sm:text-3xl font-display tracking-tight uppercase">
                  {techStack.title}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {techStack.categories.map((category) => {
                  if (!category.skills || category.skills.length === 0) return null;

                  return (
                    <div
                      key={category.name}
                      className="p-5 rounded-2xl bg-neutral-50 border border-black/5 space-y-4 hover:border-black/20 transition-colors"
                    >
                      <div className="border-b border-black/5 pb-2">
                        <span className="text-[11px] font-black tracking-[0.2em] uppercase text-black/70">
                          {category.name}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3 items-center">
                        {category.skills.map((tech) => (
                          <div
                            key={tech.name}
                            className="group relative flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white border border-black/10 shadow-2xs hover:shadow-sm hover:border-black/30 transition-all cursor-default"
                          >
                            <img
                              src={tech.src}
                              alt={tech.name}
                              className="h-5 w-5 object-contain"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = "none";
                              }}
                            />
                            <span className="text-xs font-semibold text-black/85">
                              {tech.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
