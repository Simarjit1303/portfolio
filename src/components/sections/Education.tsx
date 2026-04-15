"use client";

import { motion, Variants } from "framer-motion";

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};


export default function Education() {
  const education = [
    {
      degree: "MSc Data Science, AI & Digital Business",
      institution: "GISMA University of Applied Sciences",
      location: "Potsdam, Germany",
      duration: "September 2024 – Present",
      status: "In Progress",
    },
    {
      degree: "Bachelor of Computer Applications",
      institution: "Kalinga University",
      location: "Raipur, India",
      duration: "July 2020 – June 2023",
      status: "Graduated",
    },
  ];

  return (
    <section id="education" className="relative z-20 py-28 px-8 md:px-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #121212 0%, #0d0d12 50%, #121212 100%)" }}
    >
      {/* Decorative background number */}
      <div className="absolute top-8 right-8 text-[180px] font-black text-white/[0.025] leading-none select-none pointer-events-none">
        04
      </div>

      <div className="max-w-7xl mx-auto relative">

        <motion.div
          className="flex items-center justify-between border-t border-white/10 pt-5 mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-[11px] font-mono tracking-[0.2em] text-white/60 uppercase">Education</span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-white/60 uppercase">{education.length} Degrees</span>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {education.map((edu, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              className="group relative p-8 rounded-2xl border overflow-hidden transition-all duration-500 hover:scale-[1.01]"
              style={{
                background: i === 0
                  ? "linear-gradient(135deg, rgba(0,217,255,0.04) 0%, rgba(0,217,255,0.01) 100%)"
                  : "rgba(255,255,255,0.015)",
                borderColor: i === 0 ? "rgba(0,217,255,0.18)" : "rgba(255,255,255,0.07)",
              }}
            >
              {i === 0 && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at top left, rgba(0,217,255,0.06) 0%, transparent 60%)" }} />
              )}
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-white/55 font-mono text-[10px] tracking-[0.18em] uppercase">{edu.duration}</p>
                  <span className={`text-[9px] font-mono tracking-[0.15em] uppercase px-3 py-1 rounded-full border ${
                    edu.status === "In Progress"
                      ? "text-[#00D9FF] border-[#00D9FF]/30 bg-[#00D9FF]/[0.08]"
                      : "text-white/65 border-white/10 bg-white/[0.03]"
                  }`}>
                    {edu.status}
                  </span>
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight mb-3 leading-tight"
                  style={i === 0
                    ? { background: "linear-gradient(90deg, #ffffff, #00D9FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }
                    : { color: "rgba(255,255,255,0.85)" }
                  }>
                  {edu.degree}
                </h4>
                <p className="text-white/60 text-sm mb-1">{edu.institution}</p>
                <p className="text-white/55 font-mono text-[11px] tracking-wider uppercase">{edu.location}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
