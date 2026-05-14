"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useSound from "use-sound";
import MagneticWrapper from "@/components/ui/MagneticWrapper";
import { scrollToSection } from "@/lib/viewTransitions";

const SECTIONS = [
  { id: "intro",      label: "Home" },
  { id: "about",      label: "About" },
  { id: "projects",   label: "Projects" },
  { id: "experience", label: "Exp" },
  { id: "education",  label: "Education" },
  { id: "skills",     label: "Skills" },
  { id: "contact",    label: "Contact" },
];

export default function NavPill() {
  const [active, setActive] = useState("intro");

  useEffect(() => {
    // Use getBoundingClientRect + scrollY for document-absolute position.
    // el.offsetTop is relative to the nearest positioned ancestor — unreliable
    // when sections sit inside a position:relative wrapper div.
    const docTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;

    const handleScroll = () => {
      const scrollMid = window.scrollY + window.innerHeight / 2;
      let current = SECTIONS[0].id;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && docTop(el) <= scrollMid) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Fire immediately after first paint so initial active state is correct
    const t = setTimeout(handleScroll, 50);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(t);
    };
  }, []);

  const [playClick] = useSound("/sfx/click.mp3", { volume: 0.5 });

  const handleInteraction = (id: string) => {
    try { playClick(); } catch {}
    if (id === "contact") {
      window.dispatchEvent(new Event("robotWave"));
    }
    scrollToSection(id);
  };

  return (
    <motion.nav
      aria-label="Page navigation"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div
        className="flex items-center gap-1 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 shadow-xl overflow-x-auto max-w-[calc(100vw-2rem)]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {SECTIONS.map(({ id, label }) => (
          <MagneticWrapper key={id}>
            <button
              onClick={() => handleInteraction(id)}
              aria-current={active === id ? "page" : undefined}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                active === id
                  ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                  : "text-white/65 hover:text-white/80"
              }`}
            >
              {active === id && (
                <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
              )}
              {label}
            </button>
          </MagneticWrapper>
        ))}
      </div>
    </motion.nav>
  );
}
