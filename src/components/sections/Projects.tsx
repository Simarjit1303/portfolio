"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio";

export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // On mobile (no hover), default to first project so panel is never empty
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) {
      setHovered(0);
    }
  }, []);

  const handleEnter = (i: number) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setHovered(i);
  };

  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => setHovered(null), 120);
  };

  const cancelLeave = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  };

  const active = hovered !== null ? projects[hovered] : null;

  return (
    <section
      id="projects"
      className="relative z-20 min-h-[100dvh] flex flex-col justify-center py-8 sm:py-12 md:py-16 px-8 md:px-24 overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Top / bottom fade for smooth transitions */}
      <div className="absolute inset-x-0 top-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #121212 0%, transparent 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, #121212 0%, transparent 100%)" }} />

      {/* Full-section background reacts to hovered row */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.num}
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
              background: `radial-gradient(ellipse 80% 60% at 60% 50%, ${active.color}0e 0%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Decorative background number */}
      <div className="absolute top-8 right-8 text-[180px] font-black text-white/[0.025] leading-none select-none pointer-events-none">
        02
      </div>

      <div className="max-w-7xl mx-auto relative">

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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 items-start">

          {/* Left — project list */}
          <div className="lg:col-span-3 border-t border-white/[0.08] rounded-2xl overflow-hidden"
            style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: "rgba(10,10,16,0.82)" }}
          >
            {projects.map((p, i) => (
              <motion.div
                key={p.num}
                role="button"
                tabIndex={0}
                aria-label={`View ${p.title} details`}
                className="group flex items-center justify-between py-6 border-b border-white/[0.08] transition-all duration-300 relative overflow-hidden cursor-pointer"
                onMouseEnter={() => handleEnter(i)}
                onClick={() => setHovered(hovered === i ? null : i)}
                onKeyDown={(e) => e.key === "Enter" && setHovered(hovered === i ? null : i)}
                onMouseLeave={handleLeave}
                animate={{
                  backgroundColor: hovered === i ? `${p.color}08` : "rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.2 }}
              >
                {/* Left accent bar on hover */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-[2px]"
                  animate={{ opacity: hovered === i ? 1 : 0, scaleY: hovered === i ? 1 : 0 }}
                  style={{ backgroundColor: p.color, originY: 0.5 }}
                  transition={{ duration: 0.2 }}
                />

                <div className="flex items-center gap-6 pl-4">
                  <span
                    aria-hidden="true"
                    className="text-[11px] font-mono tracking-[0.2em] transition-colors duration-300"
                    style={{ color: hovered === i ? p.color : "rgba(255,255,255,0.2)" }}
                  >
                    {p.num}
                  </span>
                  <div>
                    <p
                      className="text-lg md:text-xl font-black uppercase tracking-tight leading-tight transition-colors duration-300"
                      style={{ color: hovered === i ? "#ffffff" : "rgba(255,255,255,0.75)" }}
                    >
                      {p.title}
                    </p>
                    <p
                      className="text-[11px] font-mono tracking-[0.15em] uppercase mt-0.5 transition-colors duration-300"
                      style={{ color: hovered === i ? `${p.color}cc` : "rgba(255,255,255,0.25)" }}
                    >
                      {p.type}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pr-2">
                  <span className="text-[11px] font-mono text-white/42 hidden md:block">{p.year}</span>
                  {/* GitHub link — direct access without needing preview panel */}
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${p.title} on GitHub`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm font-mono transition-colors duration-200"
                    style={{ color: hovered === i ? p.color : "rgba(255,255,255,0.2)" }}
                  >
                    ↗
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — project preview panel */}
          <div className="lg:col-span-2 lg:pl-16 pt-8 lg:pt-0 lg:sticky lg:top-32"
            onMouseEnter={cancelLeave}
            onMouseLeave={handleLeave}
          >
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.num}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div
                    className="rounded-2xl border p-7"
                    style={{
                      borderColor: `${active.color}40`,
                      background: `linear-gradient(135deg, rgba(10,10,16,0.97) 0%, rgba(14,14,22,0.97) 100%)`,
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      boxShadow: `0 0 40px ${active.color}10`,
                    }}
                  >
                    {/* Top stripe */}
                    <div
                      className="h-[2px] w-16 rounded-full mb-6"
                      style={{ background: `linear-gradient(90deg, ${active.color}, transparent)` }}
                    />
                    <p
                      className="text-[10px] font-mono tracking-[0.2em] uppercase mb-3"
                      style={{ color: `${active.color}99` }}
                    >
                      {active.num} — {active.type}
                    </p>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-4 leading-tight">
                      {active.title}
                    </h4>
                    <p className="text-white/55 text-sm leading-relaxed mb-6">
                      {active.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {active.techs.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2.5 py-1 rounded-full border"
                          style={{ color: `${active.color}cc`, borderColor: `${active.color}30`, background: `${active.color}08` }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase transition-colors duration-200"
                      style={{ color: active.color }}
                    >
                      View on GitHub ↗
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-white/[0.08] p-7 flex flex-col items-start justify-center min-h-[220px]"
                  style={{ background: "rgba(10,10,16,0.97)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
                >
                  <p aria-hidden="true" className="text-white/42 font-mono text-[11px] tracking-[0.2em] uppercase">
                    Select a project
                  </p>
                  <p aria-hidden="true" className="text-white/28 font-mono text-[10px] tracking-[0.15em] uppercase mt-1">
                    tap to explore
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
