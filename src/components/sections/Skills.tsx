"use client";

import { motion, Variants } from "framer-motion";
import { skillCategories, certifications, currentlyLearning, languages } from "@/data/portfolio";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const pillVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] } },
};

const pillStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.12 } },
};

export default function Skills() {

  return (
    <section id="skills" className="relative z-20 min-h-[100dvh] flex flex-col justify-center py-8 sm:py-12 md:py-16 px-8 md:px-24 overflow-hidden"
      style={{ background: "rgba(18,18,18,0.88)" }}
    >
      {/* Top / bottom fades */}
      <div className="absolute inset-x-0 top-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #121212 0%, transparent 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, #121212 0%, transparent 100%)" }} />

      {/* Decorative background number — bottom-left to break repetition */}
      <div className="absolute bottom-4 left-4 text-[220px] font-black text-white/[0.018] leading-none select-none pointer-events-none">
        05
      </div>

      <div className="max-w-7xl mx-auto relative">

        <motion.div
          className="flex items-center justify-between border-t border-white/10 pt-5 mb-8 md:mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-[11px] font-mono tracking-[0.2em] text-white/60 uppercase">Skills & Certifications</span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-white/60 uppercase">{skillCategories.length} Categories</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Tech Stack */}
          <div className="lg:col-span-2 relative">
            {/* Vertical accent line — grid-breaking detail */}
            <div className="absolute left-0 top-0 bottom-0 w-px hidden lg:block"
              style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(0,217,255,0.25) 30%, rgba(0,217,255,0.25) 70%, transparent 100%)" }} />
            <div className="lg:pl-6">
            <motion.h4
              className="text-xs font-mono tracking-[0.2em] uppercase mb-8"
              style={{ background: "linear-gradient(90deg, #ffffff, #00D9FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Technical Stack
            </motion.h4>
            <motion.div
              className="space-y-7"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              {skillCategories.map((cat, i) => (
                <motion.div key={i} variants={fadeUp} className="group">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div
                      className="h-px w-0 group-hover:w-5 transition-all duration-300 rounded-full shrink-0"
                      style={{ backgroundColor: cat.accent }}
                    />
                    <h5 className="text-[10px] font-mono uppercase tracking-[0.18em]"
                      style={{ color: cat.accent, opacity: 0.7 }}>
                      {cat.name}
                    </h5>
                  </div>
                  <motion.div className="flex flex-wrap gap-2" variants={pillStagger}>
                    {cat.skills.split(", ").map((skill, j) => (
                      <motion.span
                        key={j}
                        variants={pillVariant}
                        className="text-xs text-white/65 bg-white/[0.04] border border-white/[0.07] rounded-full px-3.5 py-1.5 transition-all duration-300 font-mono hover:text-white"
                        onMouseEnter={e => (e.currentTarget.style.borderColor = `${cat.accent}40`)}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
            </div>
          </div>

          {/* Right column */}
          <motion.div
            className="space-y-12"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >

            {/* Certifications */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-white/[0.07] p-6"
              style={{ backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", background: "rgba(10,10,16,0.65)" }}
            >
              <h4 className="text-xs font-mono tracking-[0.2em] uppercase mb-5"
                style={{ background: "linear-gradient(90deg, #ffffff, #00D9FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Certifications
              </h4>
              <ul className="space-y-3">
                {certifications.map((cert, i) => (
                  <li key={i} className="flex items-start gap-3 leading-relaxed">
                    <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-[#00D9FF]/60" />
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/55 text-xs font-mono hover:text-[#00D9FF] transition-colors duration-200 leading-relaxed"
                      >
                        {cert.name} ↗
                      </a>
                      {cert.pending && (
                        <span className="text-[9px] font-mono tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border border-[#FFB800]/30 text-[#FFB800]/70 bg-[#FFB800]/[0.05] shrink-0">
                          In Progress
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Currently Learning */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-[#00D9FF]/10 p-6"
              style={{ backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", background: "rgba(10,10,16,0.65)" }}
            >
              <h4 className="text-xs font-mono tracking-[0.2em] uppercase mb-5"
                style={{ background: "linear-gradient(90deg, #ffffff, #00D9FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Currently Learning
              </h4>
              <ul className="space-y-3">
                {currentlyLearning.map((item, i) => (
                  <li key={i} className="text-white/55 text-xs flex items-start gap-3 leading-relaxed font-mono hover:text-white/80 transition-colors duration-200">
                    <span className="text-[#00D9FF]/60 mt-0.5 shrink-0 text-[10px]">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Languages */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-white/[0.07] p-6"
              style={{ backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", background: "rgba(10,10,16,0.65)" }}
            >
              <h4 className="text-xs font-mono tracking-[0.2em] text-white/55 uppercase mb-5">Languages</h4>
              <div className="space-y-0">
                {languages.map(({ lang, badge, sub }) => (
                  <div key={lang} className="flex items-center justify-between py-3.5 border-b border-white/[0.05] last:border-0">
                    <span className="text-white/75 font-mono text-xs">{lang}</span>
                    <div className="flex items-center gap-2">
                      {badge && (
                        <span className="text-[9px] font-mono tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border border-[#00D9FF]/30 text-[#00D9FF]/70 bg-[#00D9FF]/[0.05]">
                          {badge}
                        </span>
                      )}
                      <span className="text-white/40 text-[10px] font-mono tracking-[0.12em] uppercase">{sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
