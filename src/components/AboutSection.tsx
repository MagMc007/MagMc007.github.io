import { motion } from "motion/react";
import { PORTFOLIO_DATA } from "../data/portfolioConfig";

export default function AboutSection() {
  const { personal, techStack } = PORTFOLIO_DATA;

  const categories: Array<"Languages" | "Frontend" | "Backend" | "Infra" | "Tools"> = [
    "Languages",
    "Frontend",
    "Backend",
    "Infra",
    "Tools"
  ];

  return (
    <section
      id="about"
      aria-label="About Merga"
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
              THE <br />
              <span className="text-outline">ENGINEER</span>
            </h2>
            <div className="flex items-center gap-4 opacity-40">
              <div className="h-[1px] w-12 bg-black" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase">
                About Merga
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
              Software Engineering student & <span className="italic">A2SVian</span> based in Ethiopia.
            </h3>

            {/* Expertise & Philosophy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-30">
                  Expertise
                </span>
                <p className="text-lg font-light leading-relaxed text-black/70">
                  Specializing in <span className="font-bold text-black">Full-Stack Systems</span> and <span className="font-bold text-black">Competitive Programming</span>. I thrive on the challenge of optimizing algorithms while building scalable, end-to-end architectures.
                </p>
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-30">
                  Philosophy
                </span>
                <p className="text-lg font-light leading-relaxed text-black/70">
                  {personal.philosophy}
                </p>
              </div>
            </div>

            {/* Bio Callout */}
            <div className="pt-8 border-t border-black/5">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-black/80">
                {personal.calloutQuote}
              </p>
            </div>

            {/* Tech Stack Grouped by Category */}
            <div className="space-y-6 pt-8 border-t border-black/5">
              <div>
                <h4 className="text-2xl sm:text-3xl font-display tracking-tight uppercase">
                  Tech Stack & Tools
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => {
                  const items = techStack.filter((t) => t.category === cat);
                  if (items.length === 0) return null;

                  return (
                    <div
                      key={cat}
                      className="p-5 rounded-2xl bg-neutral-50 border border-black/5 space-y-4 hover:border-black/20 transition-colors"
                    >
                      <div className="border-b border-black/5 pb-2">
                        <span className="text-[11px] font-black tracking-[0.2em] uppercase text-black/70">
                          {cat}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3 items-center">
                        {items.map((tech) => (
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
