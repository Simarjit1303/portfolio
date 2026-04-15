"use client";

import { motion } from "framer-motion";
import { cardVariant, experienceStagger as stagger } from "@/lib/animations";
import { experiences } from "@/data/portfolio";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative z-20 min-h-screen flex flex-col justify-start overflow-hidden px-8 md:px-24"
      style={{ paddingTop: "7rem", paddingBottom: "7rem" }}
    >
      {/* Decorative background number */}
      <div className="absolute top-8 right-8 text-[180px] font-black text-white/[0.025] leading-none select-none pointer-events-none">
        03
      </div>

      {/* Fade from previous solid section */}
      <div className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #121212 0%, transparent 100%)" }} />
      {/* Fade to next solid section */}
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, #121212 0%, transparent 100%)" }} />

      <div className="max-w-7xl mx-auto relative w-full">

        <motion.div
          className="flex items-center justify-between border-t border-white/10 pt-5 mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-[11px] font-mono tracking-[0.2em] text-white/60 uppercase">■ Experience</span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-white/60 uppercase">{experiences.length} Roles</span>
        </motion.div>

        <motion.div
          className="ml-auto w-full md:w-[58%] space-y-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              className="group rounded-2xl border border-white/[0.08] p-7 hover:border-white/[0.18] transition-all duration-500"
              style={{
                borderLeftColor: `${exp.accent}44`,
                borderLeftWidth: 2,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                background: "rgba(10, 10, 16, 0.72)",
              }}
            >
              <div className="flex flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-4xl font-black text-white/[0.07] font-mono leading-none shrink-0">{exp.num}</p>
                  <div className="text-right space-y-0.5">
                    <p className="text-white/60 font-mono text-xs tracking-wider">{exp.duration}</p>
                    <p className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: exp.accent }}>
                      {exp.company} — {exp.location}
                    </p>
                  </div>
                </div>

                <h4
                  className="text-xl md:text-2xl font-black uppercase tracking-tight leading-tight"
                  style={{
                    background: `linear-gradient(90deg, #ffffff 0%, ${exp.accent} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {exp.role}
                </h4>

                <ul className="space-y-2.5">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="text-white/60 text-sm leading-relaxed flex items-start gap-3 hover:text-white/80 transition-colors duration-200">
                      <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: exp.accent, opacity: 0.6 }} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
