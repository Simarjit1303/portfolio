"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ScrambleText from "@/components/ui/ScrambleText";
import BerlinClock from "@/components/ui/BerlinClock";
import { AnimatedText } from "@/components/ui/AnimatedText";

// ---- pure math helpers (no deps) ------------------------------------
function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}
function mapRange(v: number, a: number, b: number, c: number, d: number) {
  if (v <= a) return c;
  if (v >= b) return d;
  return c + ((v - a) / (b - a)) * (d - c);
}

export default function Overlay() {
  // --- refs to each panel (scroll-driven via direct DOM, no Framer) ---
  const s1 = useRef<HTMLDivElement>(null);
  const s2 = useRef<HTMLDivElement>(null);
  const s3 = useRef<HTMLDivElement>(null);

  // --- mouse parallax (Framer Motion is fine here, no scroll involved) -
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.5 });
  const my = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.5 });
  const px1 = useTransform(mx, [-1, 1], [-14, 14]);
  const py1 = useTransform(my, [-1, 1], [-9, 9]);
  const px2 = useTransform(mx, [-1, 1], [-9, 9]);
  const py2 = useTransform(my, [-1, 1], [-6, 6]);
  const px3 = useTransform(mx, [-1, 1], [-11, 11]);
  const py3 = useTransform(my, [-1, 1], [-8, 8]);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, [rawX, rawY]);

  // --- Direct DOM scroll animation (guaranteed to work in production) --
  useEffect(() => {
    const tick = () => {
      const vh = window.innerHeight;
      const p = clamp(window.scrollY / (vh * 4), 0, 1);

      // Section 1 — fades out 0.12 → 0.22
      if (s1.current) {
        const op = clamp(p < 0.12 ? 1 : mapRange(p, 0.12, 0.22, 1, 0), 0, 1);
        const ty = mapRange(clamp(p, 0, 0.22), 0, 0.22, 0, -80);
        s1.current.style.opacity = String(op);
        s1.current.style.transform = `translateY(${ty}px)`;
      }
      // Section 2 — fades in 0.28→0.36, out 0.47→0.55
      if (s2.current) {
        const op = clamp(
          p < 0.28 ? 0
          : p < 0.36 ? mapRange(p, 0.28, 0.36, 0, 1)
          : p < 0.47 ? 1
          : mapRange(p, 0.47, 0.55, 1, 0),
          0, 1
        );
        const ty = p < 0.28 ? 80 : mapRange(clamp(p, 0.28, 0.55), 0.28, 0.55, 80, -80);
        s2.current.style.opacity = String(op);
        s2.current.style.transform = `translateY(${ty}px)`;
      }
      // Section 3 — fades in 0.62→0.70, out 0.82→0.90
      if (s3.current) {
        const op = clamp(
          p < 0.62 ? 0
          : p < 0.70 ? mapRange(p, 0.62, 0.70, 0, 1)
          : p < 0.82 ? 1
          : mapRange(p, 0.82, 0.90, 1, 0),
          0, 1
        );
        const ty = p < 0.62 ? 80 : mapRange(clamp(p, 0.62, 0.90), 0.62, 0.90, 80, -80);
        s3.current.style.opacity = String(op);
        s3.current.style.transform = `translateY(${ty}px)`;
      }
    };

    tick(); // run once immediately on mount
    window.addEventListener("scroll", tick, { passive: true });
    return () => window.removeEventListener("scroll", tick);
  }, []);

  return (
    <div
      className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none"
      style={{ zIndex: 30 }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Section 1 — Hero */}
        <div
          ref={s1}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
          style={{ willChange: "transform, opacity" }}
        >
          <motion.div style={{ x: px1, y: py1 }}>
            <h1
              className="text-6xl md:text-8xl font-black tracking-tight text-white mb-3 uppercase leading-none"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)" }}
            >
              <ScrambleText text="SIMARJIT SINGH" />
            </h1>
            <p className="text-[11px] md:text-xs text-white/65 font-mono tracking-[0.22em] uppercase">
              Data Scientist · Berlin
            </p>
            <BerlinClock />
          </motion.div>
        </div>

        {/* Section 2 — Building */}
        <div
          ref={s2}
          className="absolute inset-0 flex flex-col items-start justify-center text-left px-8 md:px-32"
          style={{ opacity: 0, willChange: "transform, opacity" }}
        >
          <motion.div style={{ x: px2, y: py2 }}>
            <p className="text-[10px] font-mono tracking-[0.22em] text-white/55 uppercase mb-5">
              ■ Building
            </p>
            <h2
              className="text-4xl md:text-6xl font-black tracking-tight text-white mb-5 max-w-xl uppercase leading-[1.05]"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)" }}
            >
              <AnimatedText text="Building AI That Actually Ships." delay={0.2} />
            </h2>
            <p className="text-[11px] md:text-xs text-white/65 font-mono tracking-[0.15em] max-w-md leading-relaxed uppercase">
              Seeking Working Student &amp; Internship roles in Data Science &amp; AI.
            </p>
          </motion.div>
        </div>

        {/* Section 3 — Specialising */}
        <div
          ref={s3}
          className="absolute inset-0 flex flex-col items-start justify-center text-left px-8 md:px-32"
          style={{ opacity: 0, willChange: "transform, opacity" }}
        >
          <motion.div style={{ x: px3, y: py3 }}>
            <p className="text-[10px] font-mono tracking-[0.22em] text-white/55 uppercase mb-5">
              ■ Specialising
            </p>
            <h2
              className="text-4xl md:text-6xl font-black tracking-tight text-white mb-5 max-w-xl uppercase leading-[1.05]"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)" }}
            >
              <AnimatedText text="Machine Learning &amp; NLP." delay={0.2} />
            </h2>
            <p className="text-[11px] md:text-xs text-white/65 font-mono tracking-[0.15em] max-w-md leading-relaxed uppercase">
              LLMs, RAG, and custom domains. If it doesn&apos;t ship, it&apos;s not done.
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
