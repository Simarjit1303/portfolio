"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, revealUp } from "@/lib/animations";
import { facts, stats } from "@/data/portfolio";
import { useCountUp } from "@/hooks/useCountUp";
import MagneticWrapper from "@/components/ui/MagneticWrapper";

function AnimatedStat({ numStr, label, delay = 0 }: { numStr: string; label: string; delay?: number }) {
  // Parse digits separately from non-digits (e.g. "200+" -> [200, "+"], "5+" -> [5, "+"], "2+yrs" -> [2, "+yrs"])
  const match = numStr.match(/^(\d+)(.*)$/);
  const targetEnd = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  const { count, elementRef } = useCountUp({ end: targetEnd, duration: 2500, delay });

  return (
    <motion.div
      ref={elementRef}
      variants={fadeUp}
      className="p-4 rounded-xl border border-white/[0.07] hover:border-[#00D9FF]/20 transition-all duration-300"
      style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", background: "rgba(10,10,16,0.55)" }}
    >
      <p className="text-2xl font-black text-white mb-1"
        style={{ background: "linear-gradient(90deg, #00D9FF, #ffffff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {match ? `${count}${suffix}` : numStr}
      </p>
      <p className="text-white/65 font-mono text-[10px] tracking-[0.15em] uppercase">{label}</p>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative z-20 min-h-[100dvh] flex flex-col justify-center py-8 sm:py-12 md:py-16 px-8 md:px-24 overflow-hidden"
      style={{ background: "rgba(18,18,18,0.88)" }}
    >
      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #121212 0%, transparent 100%)" }} />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, #121212 0%, transparent 100%)" }} />

      {/* Decorative background number */}
      <div className="absolute top-8 right-8 text-[180px] font-black text-white/[0.025] leading-none select-none pointer-events-none">
        01
      </div>

      <div className="max-w-7xl mx-auto relative">

        {/* Section header */}
        <motion.div
          className="flex items-center justify-between border-t border-white/10 pt-5 mb-8 md:mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <span className="text-[11px] font-mono tracking-[0.2em] text-white/60 uppercase">■ About Me</span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-white/60 uppercase">The Person Behind The Work</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

          {/* Left — bio */}
          <motion.div
            className="lg:col-span-3 space-y-4 md:space-y-5"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.h3
              variants={revealUp}
              className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-black uppercase tracking-tight leading-[1.05]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span style={{ background: "linear-gradient(90deg, #ffffff 0%, #00D9FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Data Scientist
              </span>
              <br />
              <span className="text-white/48">&amp; AI Engineer</span>
            </motion.h3>

            <motion.p variants={fadeUp} className="text-white/75 text-base leading-relaxed">
              I&apos;m Simarjit — a 24-year-old Data Scientist and AI/ML Engineer currently pursuing my
              MSc in Data Science, AI &amp; Digital Business at GISMA University in Potsdam, Germany.
            </motion.p>

            <motion.p variants={fadeUp} className="text-white/65 text-base leading-relaxed">
              I build end-to-end ML pipelines, GenAI applications, and data products — from raw data
              ingestion through to deployed, production-ready systems. My work sits at the intersection
              of machine learning, LLMs, and business intelligence.
            </motion.p>

            <motion.p variants={fadeUp} className="text-white/65 text-base leading-relaxed">
              Before Berlin, I spent 2+ years at AISECT as a Data Analyst and Python Instructor — training 50+ students in Python and ML. Full story in Experience below.
            </motion.p>

            {/* Stats row */}
            <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {stats.map(({ num, label }, idx) => (
                <AnimatedStat key={label} numStr={num} label={label} delay={idx * 150} />
              ))}
            </motion.div>

            {/* Tools grid */}
            <motion.div variants={fadeUp} className="pt-1">
              <p className="text-[10px] font-mono tracking-[0.18em] uppercase text-white/35 mb-3">Tools & Stack</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python", "PyTorch", "TensorFlow", "HuggingFace",
                  "scikit-learn", "OpenCV", "FastAPI", "LangChain",
                  "Docker", "AWS EC2", "SQL", "Power BI", "Plotly", "Pandas",
                ].map((tool) => (
                  <span
                    key={tool}
                    className="text-[11px] font-mono px-3 py-1.5 rounded-full border border-white/[0.08] text-white/50 bg-white/[0.03] hover:border-[#00D9FF]/30 hover:text-white/75 transition-all duration-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — quick facts */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="rounded-2xl border p-6 mb-6"
              style={{
                borderColor: "rgba(0,217,255,0.18)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                background: "linear-gradient(135deg, rgba(0,217,255,0.04) 0%, rgba(10,10,16,0.72) 100%)",
                boxShadow: "0 0 32px rgba(0,217,255,0.05)",
              }}
            >
              <h4 className="text-[10px] font-mono tracking-[0.2em] uppercase mb-5"
                style={{ background: "linear-gradient(90deg, #ffffff, #00D9FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Quick Facts
              </h4>
              <div className="space-y-0">
                {facts.map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-3.5 border-b border-white/[0.05] last:border-0">
                    <span className="text-white/60 font-mono text-[11px] tracking-[0.15em] uppercase">{label}</span>
                    <span className="text-white/80 font-mono text-xs text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <MagneticWrapper>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="w-full flex items-center justify-center gap-2 text-[11px] font-mono tracking-widest uppercase px-5 py-4 rounded-xl border border-[#00D9FF]/30 text-[#00D9FF] bg-[#00D9FF]/[0.05] hover:bg-[#00D9FF]/[0.12] hover:border-[#00D9FF]/50 transition-all duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
                Open To Opportunities — Get In Touch
              </a>
            </MagneticWrapper>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
