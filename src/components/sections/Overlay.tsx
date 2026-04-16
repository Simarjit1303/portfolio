"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ScrambleText from "@/components/ui/ScrambleText";
import BerlinClock from "@/components/ui/BerlinClock";
import MagneticWrapper from "@/components/ui/MagneticWrapper";


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
        {/* Film-grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
            opacity: 0.035,
            mixBlendMode: "overlay",
          }}
        />

        {/* Section 1 — Hero */}
        <div
          ref={s1}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
          style={{ willChange: "transform, opacity" }}
        >
          <motion.div style={{ x: px1, y: py1 }}>
            <motion.h1
              className="text-6xl md:text-8xl font-black tracking-tight text-white mb-3 uppercase leading-none"
              style={{ fontFamily: "var(--font-display)", textShadow: "0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            >
              <ScrambleText text="SIMARJIT SINGH" />
            </motion.h1>
            <motion.p
              className="text-[11px] md:text-xs text-white/65 font-mono tracking-[0.22em] uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.45 }}
            >
              ML Engineer · GenAI · Berlin
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.7 }}
            >
              <BerlinClock />
            </motion.div>
          </motion.div>

          {/* Floating scroll indicator — right-aligned, delayed entry */}
          <motion.div
            className="absolute bottom-10 right-8 pointer-events-auto flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.0 }}
          >
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="flex flex-col items-center gap-2 text-white/30 hover:text-white/55 transition-colors duration-300 group"
              aria-label="Scroll to About section"
            >
              <span className="font-mono text-[9px] tracking-[0.28em] uppercase">Scroll</span>
              <div
                className="w-5 h-8 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300 flex items-start justify-center pt-1.5 overflow-hidden"
              >
                <motion.div
                  animate={{ y: [0, 14], opacity: [1, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeIn", repeatDelay: 0.4 }}
                  className="w-1 h-1.5 rounded-full bg-white/50 group-hover:bg-[#00D9FF]/70 transition-colors duration-300"
                />
              </div>
            </button>
          </motion.div>
        </div>


      </div>
    </div>
    </>
  );
}
