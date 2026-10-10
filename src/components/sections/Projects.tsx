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
  "LLM Security Research":"ML & AI",
};

function FeaturedProjectCard({ p }: { p: (typeof projects)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      suppressHydrationWarning
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl border p-6 md:p-8 mb-5 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-10"
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${p.color}08 0%, rgba(10,10,16,0.97) 100%)`
          : "rgba(10,10,16,0.92)",
        borderColor: hovered ? `${p.color}40` : "rgba(255,255,255,0.07)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "background 0.3s, border-color 0.3s, transform 0.3s",
      }}
    >
      {/* Thumbnail */}
      <div className="w-full aspect-[8/5] rounded-lg overflow-hidden self-start">
        <Image
          suppressHydrationWarning
          src={`/thumbnails/${p.num}.svg`}
          alt={p.title}
          width={800}
          height={500}
          className="w-full h-full object-cover object-top opacity-80"
        />
      </div>

      <div className="flex flex-col">
        {/* Top accent bar */}
        <div
          suppressHydrationWarning
          className="h-[2px] w-10 rounded-full mb-4"
          style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
        />

        {/* Badge + period */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span
            suppressHydrationWarning
            className="font-mono text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border"
            style={{ color: p.color, borderColor: `${p.color}40`, background: `${p.color}0d` }}
          >
            {p.badge}
          </span>
          <span className="font-mono text-[10px] text-white/30 tracking-[0.15em]">{p.period}</span>
        </div>

        <p className="text-white/55 text-sm leading-relaxed mb-5">{p.desc}</p>

        {/* Highlight figures */}
        {p.highlights && (
          <div className="flex gap-8 mb-5">
            {p.highlights.map((h) => (
              <div key={h.label}>
                <div suppressHydrationWarning className="text-2xl font-black leading-none" style={{ color: p.color }}>
                  {h.value}
                </div>
                <div className="font-mono text-[10px] text-white/40 tracking-[0.15em] uppercase mt-1">{h.label}</div>
              </div>
            ))}
          </div>
        )}

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
          className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-widest uppercase transition-colors duration-200 self-start mt-auto"
          style={{ color: hovered ? p.color : "rgba(255,255,255,0.25)" }}
        >
          View on GitHub ↗
        </a>
      </div>
    </motion.div>
  );
}

function ProjectCard({ p, index }: { p: (typeof projects)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      suppressHydrationWarning
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl border p-6 flex flex-col"
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${p.color}08 0%, rgba(10,10,16,0.97) 100%)`
          : "rgba(10,10,16,0.92)",
        borderColor: hovered ? `${p.color}40` : "rgba(255,255,255,0.07)",
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
          suppressHydrationWarning
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

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

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

        {/* Featured project (full width, above the grid) */}
        <AnimatePresence mode="wait">
          {featured && <FeaturedProjectCard key={featured.num} p={featured} />}
        </AnimatePresence>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="wait">
            {rest.map((p, i) => (
              <ProjectCard key={p.num} p={p} index={i} />
            ))}
          </AnimatePresence>
        </div>

    </SectionWrapper>
  );
}
