"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio";
import { SectionWrapper, SectionHeader } from "@/components/ui/primitives";

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
      suppressHydrationWarning
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
        suppressHydrationWarning
        className="h-[2px] w-10 rounded-full mb-4"
        style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
      />

      {/* Thumbnail */}
      <div className="w-full h-44 rounded-lg mb-4 overflow-hidden">
        <Image
          src={`/thumbnails/${p.num}.svg`}
          alt={p.title}
          width={800}
          height={500}
          className="w-full h-full object-cover object-top opacity-80"
        />
      </div>

      {/* Num + year */}
      <div className="flex items-center justify-between mb-3">
        <span suppressHydrationWarning className="font-mono text-[10px] tracking-[0.2em]" style={{ color: `${p.color}99` }}>
          {p.num}
        </span>
        <span className="font-mono text-[10px] text-white/30 tracking-[0.15em]">{p.year}</span>
      </div>

      {/* Description — clamped to 3 lines */}
      <p className="text-white/55 text-sm leading-relaxed line-clamp-3 mb-5 flex-1">
        {p.desc}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {p.techs.map((t) => (
          <span
            suppressHydrationWarning
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
        suppressHydrationWarning
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
    <SectionWrapper id="projects" decorativeNumber="02">

        {/* Section header */}
        <SectionHeader label="Selected Works" right={`${projects.length} Projects`} />

        {/* Filter tabs */}
        <motion.div
          suppressHydrationWarning
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          {CATEGORIES.map((cat) => (
            <button
              suppressHydrationWarning
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

    </SectionWrapper>
  );
}
