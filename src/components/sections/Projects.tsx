"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio";

const CATEGORIES = ["All", "ML & AI", "Data Analysis", "Computer Vision"] as const;
type Category = (typeof CATEGORIES)[number];

const categoryMap: Record<string, Category> = {
  "GenAI Application":    "ML & AI",
  "NLP Classification":   "ML & AI",
  "ML Pipeline":          "ML & AI",
  "Predictive Modelling": "ML & AI",
  "Statistical Modelling":"Data Analysis",
  "Data Analysis":        "Data Analysis",
  "Data Visualization":   "Data Analysis",
  "Computer Vision":      "Computer Vision",
};

function ProjectCard({ p, index }: { p: (typeof projects)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, delay: index * 0.04, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl border p-6 flex flex-col"
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${p.color}06 0%, rgba(10,10,16,0.97) 100%)`
          : "rgba(10,10,16,0.82)",
        borderColor: hovered ? `${p.color}40` : "rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "background 0.3s, border-color 0.3s, transform 0.3s",
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-[2px] w-10 rounded-full mb-5"
        style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
      />

      {/* Num + year */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: `${p.color}99` }}>
          {p.num}
        </span>
        <span className="font-mono text-[10px] text-white/30 tracking-[0.15em]">{p.year}</span>
      </div>

      {/* Title */}
      <h3
        className="text-lg font-black uppercase tracking-tight leading-tight mb-1 transition-colors duration-300"
        style={{ color: hovered ? "#ffffff" : "rgba(255,255,255,0.85)" }}
      >
        {p.title}
      </h3>

      {/* Type label */}
      <p
        className="font-mono text-[10px] tracking-[0.15em] uppercase mb-4 transition-colors duration-300"
        style={{ color: hovered ? `${p.color}cc` : "rgba(255,255,255,0.28)" }}
      >
        {p.type}
      </p>

      {/* Description — clamped to 3 lines */}
      <p className="text-white/55 text-sm leading-relaxed line-clamp-3 mb-5 flex-1">
        {p.desc}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {p.techs.map((t) => (
          <span
            key={t}
            className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
            style={{
              color: `${p.color}bb`,
              borderColor: `${p.color}28`,
              background: `${p.color}08`,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* GitHub link */}
      <a
        href={p.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-widest uppercase transition-colors duration-200 self-start"
        style={{ color: hovered ? p.color : "rgba(255,255,255,0.25)" }}
      >
        View on GitHub ↗
      </a>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => categoryMap[p.type] === activeFilter);

  const countFor = (cat: Category) =>
    cat === "All"
      ? projects.length
      : projects.filter((p) => categoryMap[p.type] === cat).length;

  return (
    <section
      id="projects"
      className="relative z-20 min-h-[100dvh] flex flex-col justify-center py-8 sm:py-12 md:py-16 px-8 md:px-24 overflow-hidden"
      style={{ background: "rgba(18,18,18,0.88)" }}
    >
      {/* Top / bottom fades */}
      <div
        className="absolute inset-x-0 top-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #121212 0%, transparent 100%)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, #121212 0%, transparent 100%)" }}
      />

      {/* Decorative background number */}
      <div className="absolute top-8 right-8 text-[180px] font-black text-white/[0.025] leading-none select-none pointer-events-none">
        02
      </div>

      <div className="max-w-7xl mx-auto relative w-full">

        {/* Section header */}
        <motion.div
          className="flex items-center justify-between border-t border-white/10 pt-5 mb-8 md:mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-[11px] font-mono tracking-[0.2em] text-white/60 uppercase">■ Selected Works</span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-white/60 uppercase">{projects.length} Projects</span>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="text-[11px] font-mono tracking-[0.15em] uppercase px-4 py-2 rounded-full border transition-all duration-300"
              style={{
                borderColor: activeFilter === cat ? "#00D9FF50" : "rgba(255,255,255,0.10)",
                color: activeFilter === cat ? "#00D9FF" : "rgba(255,255,255,0.40)",
                background: activeFilter === cat ? "rgba(0,217,255,0.07)" : "rgba(255,255,255,0.02)",
              }}
            >
              {cat}
              <span
                className="ml-1.5 text-[9px]"
                style={{ opacity: activeFilter === cat ? 0.7 : 0.4 }}
              >
                {countFor(cat)}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.num} p={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
