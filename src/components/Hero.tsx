import { motion, MotionValue } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import { PORTFOLIO_DATA } from "../data/portfolioConfig";
import magPhoto from "../img/mag.webp";

interface HeroProps {
  xLeft: MotionValue<number>;
  xRight: MotionValue<number>;
  onContactClick: () => void;
}

export default function Hero({ xLeft, xRight, onContactClick }: HeroProps) {
  const [imageError, setImageError] = useState(false);
  const { personal } = PORTFOLIO_DATA;

  return (
    <section
      id="home"
      aria-label="Hero Section"
      className="fixed inset-0 flex items-center justify-center overflow-hidden select-none"
    >
      {/* Background Grid */}
      <div className="grid-bg fixed inset-0 z-0 opacity-50 pointer-events-none" />

      {/* Main Hero Container */}
      <div className="absolute inset-0 pt-24 sm:pt-28 md:pt-16 flex flex-col items-center justify-center pointer-events-none space-y-4 md:space-y-8">
        {/* Line 1: MERGA + Portrait */}
        <motion.div
          style={{ x: xLeft }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-center gap-6 md:gap-12"
        >
          <h1 className="text-[16vw] font-display font-normal leading-[0.7] tracking-tighter text-black/20 whitespace-nowrap order-last md:order-first">
            {personal.firstName}
          </h1>

          {/* Circular Portrait with Floating Badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative pointer-events-auto w-[60vw] sm:w-[45vw] md:w-[22vw] max-w-[320px] md:max-w-[280px] aspect-square flex items-center justify-center order-first md:order-last"
          >
            <div className="relative w-full h-full rounded-full border-4 border-black overflow-hidden shadow-2xl bg-neutral-900 group">
              {!imageError ? (
                <img
                  src={magPhoto}
                  alt={`${personal.name} – Software Engineer`}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-neutral-900 text-white flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center font-display text-2xl tracking-wider text-white">
                    MM
                  </div>
                  <span className="mt-2 text-[9px] font-black uppercase tracking-[0.25em] text-white/70">
                    Software Engineer
                  </span>
                </div>
              )}
            </div>

            {/* Floating Black Label: SOFTWARE ENGINEER */}
            <div className="absolute -right-2 sm:-right-4 md:-right-8 bottom-4 sm:bottom-6 md:bottom-8 z-30 bg-black text-white px-3 sm:px-4 py-1.5 shadow-xl rounded-full flex items-center justify-center">
              <span className="text-[9px] sm:text-[10px] font-black tracking-[0.25em] uppercase whitespace-nowrap">
                {personal.targetRole}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Line 2: MEKONNEN */}
        <motion.h1
          style={{ x: xRight }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[16vw] font-display font-normal leading-[0.7] tracking-tighter text-black/20 whitespace-nowrap"
        >
          {personal.lastName}
        </motion.h1>

        {/* Catchy CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="pointer-events-auto pt-4"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onContactClick();
            }}
            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-black text-white rounded-full overflow-hidden transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em]">
              Let's Build Something Great
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </a>
        </motion.div>
      </div>

      {/* Bottom UI Badges */}
      <div className="absolute bottom-8 left-8 z-30 pointer-events-auto">
        <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">
          Based in Ethiopia
        </span>
      </div>

      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-4 pointer-events-auto">
        <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={14} className="opacity-40" />
        </motion.div>
      </div>
    </section>
  );
}
