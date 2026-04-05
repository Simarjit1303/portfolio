"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import ScrambleText from "@/components/ui/ScrambleText";
import BerlinClock from "@/components/ui/BerlinClock";
import { AnimatedText } from "@/components/ui/AnimatedText";

/* Panel style — transparent, no background blur */
const glassPanel: React.CSSProperties = {
  borderRadius: "16px",
  padding: "32px 36px",
};

export default function Overlay() {
  const { scrollY } = useScroll();

  // Mouse parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.5 });
  const mouseY = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.5 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth  - 0.5) * 2; // -1 to 1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      rawX.set(nx);
      rawY.set(ny);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [rawX, rawY]);

  const px1 = useTransform(mouseX, [-1, 1], [-18, 18]);
  const py1 = useTransform(mouseY, [-1, 1], [-12, 12]);
  const px2 = useTransform(mouseX, [-1, 1], [-12, 12]);
  const py2 = useTransform(mouseY, [-1, 1], [-8,   8]);
  const px3 = useTransform(mouseX, [-1, 1], [-15, 15]);
  const py3 = useTransform(mouseY, [-1, 1], [-10, 10]);

  const progress = useTransform(scrollY, (y) => {
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    return Math.min(1, Math.max(0, y / (vh * 4)));
  });

  const smooth = useSpring(progress, { stiffness: 120, damping: 28, mass: 0.3 });

  // Section 1: 0 → 22%
  const opacity1 = useTransform(progress, [0, 0.12, 0.22], [1, 1, 0]);
  const y1       = useTransform(smooth,   [0, 0.22],        [0, -80]);
  const yTotal1  = useTransform([y1, py1], ([yVal, pyVal]: number[]) => yVal + pyVal);

  // Section 2: 28% → 55%
  const opacity2 = useTransform(progress, [0.28, 0.36, 0.47, 0.55], [0, 1, 1, 0]);
  const y2       = useTransform(smooth,   [0.28, 0.55],              [80, -80]);
  const yTotal2  = useTransform([y2, py2], ([yVal, pyVal]: number[]) => yVal + pyVal);

  // Section 3: 62% → 90%
  const opacity3 = useTransform(progress, [0.62, 0.70, 0.82, 0.90], [0, 1, 1, 0]);
  const y3       = useTransform(smooth,   [0.62, 0.90],              [80, -80]);
  const yTotal3  = useTransform([y3, py3], ([yVal, pyVal]: number[]) => yVal + pyVal);

  return (
    <>
    <div className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none" style={{ zIndex: 30 }}>
      <div className="sticky top-0 h-screen w-full">

        {/* ── Section 1 — Hero (centered) ─────────────────────────────── */}
        <motion.div
          style={{ opacity: opacity1, y: yTotal1, x: px1, willChange: "transform, opacity" }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
        >
          <div style={glassPanel}>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white mb-3 uppercase leading-none" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)" }}>
              <ScrambleText text="SIMARJIT SINGH" />
            </h1>
            <p className="text-[11px] md:text-xs text-white/65 font-mono tracking-[0.22em] uppercase">
              Data Scientist · Berlin
            </p>
            <BerlinClock />
          </div>
        </motion.div>

        {/* ── Section 2 — Left aligned ─────────────────────────────────── */}
        <motion.div
          style={{ opacity: opacity2, y: yTotal2, x: px2, willChange: "transform, opacity" }}
          className="absolute inset-0 flex flex-col items-start justify-center text-left px-8 md:px-32"
        >
          <div style={glassPanel}>
            <p className="text-[10px] font-mono tracking-[0.22em] text-white/55 uppercase mb-5">
              ■ Building
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-5 max-w-xl uppercase leading-[1.05]" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)" }}>
              <AnimatedText text="Building AI That Actually Ships." delay={0.2} />
            </h2>
            <p className="text-[11px] md:text-xs text-white/65 font-mono tracking-[0.15em] max-w-md leading-relaxed uppercase">
              Seeking Working Student & Internship roles in Data Science & AI.
            </p>
          </div>
        </motion.div>

        {/* ── Section 3 — Left aligned ───────────────────────────────── */}
        <motion.div
          style={{ opacity: opacity3, y: yTotal3, x: px3, willChange: "transform, opacity" }}
          className="absolute inset-0 flex flex-col items-start justify-center text-left px-8 md:px-32"
        >
          <div style={glassPanel}>
            <p className="text-[10px] font-mono tracking-[0.22em] text-white/55 uppercase mb-5">
              ■ Specialising
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-5 max-w-xl uppercase leading-[1.05]" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)" }}>
              <AnimatedText text="Machine Learning & NLP." delay={0.2} />
            </h2>
            <p className="text-[11px] md:text-xs text-white/65 font-mono tracking-[0.15em] max-w-md leading-relaxed uppercase">
              LLMs, RAG, and custom domains. If it doesn&apos;t ship, it&apos;s not done.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
    </>
  );
}
