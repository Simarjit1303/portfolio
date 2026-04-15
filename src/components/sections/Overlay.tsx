"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ScrambleText from "@/components/ui/ScrambleText";
import BerlinClock from "@/components/ui/BerlinClock";


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
  // --- ref to hero panel (scroll-driven via direct DOM, no Framer) ---
  const s1 = useRef<HTMLDivElement>(null);

  // --- mouse parallax (Framer Motion is fine here, no scroll involved) -
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.5 });
  const my = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.5 });
  const px1 = useTransform(mx, [-1, 1], [-14, 14]);
  const py1 = useTransform(my, [-1, 1], [-9, 9]);

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
      // Divisor is vh*1.3 (130vh). Hero fades out 0.30→0.70, fully gone by 91vh.
      const p = clamp(window.scrollY / (vh * 1.3), 0, 1);
      // Section 1 — visible until 0.30, fades out 0.30→0.70
      if (s1.current) {
        const op = clamp(p < 0.30 ? 1 : mapRange(p, 0.30, 0.70, 1, 0), 0, 1);
        const ty = mapRange(clamp(p, 0, 0.70), 0, 0.70, 0, -80);
        s1.current.style.opacity = String(op);
        s1.current.style.transform = `translateY(${ty}px)`;
      }
    };

    let rafId = 0;
    const onScroll = () => { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(tick); };
    tick(); // run once immediately on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
    <div
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
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
              style={{ fontFamily: "var(--font-display)", textShadow: "0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)" }}
            >
              <ScrambleText text="SIMARJIT SINGH" />
            </h1>
            <p className="text-[11px] md:text-xs text-white/65 font-mono tracking-[0.22em] uppercase">
              Data Scientist · Berlin
            </p>
            <BerlinClock />
            <div className="mt-8 pointer-events-auto">
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 font-mono text-[11px] tracking-[0.2em] uppercase transition-all duration-300"
              >
                View My Work
                <span className="animate-bounce">↓</span>
              </button>
            </div>
          </motion.div>
        </div>


      </div>
    </div>
    </>
  );
}
