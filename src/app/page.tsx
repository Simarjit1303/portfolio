import { Scene, NavPill, Overlay } from "@/components/Dynamics";
import ScrollReset from "@/components/ui/ScrollReset";
import Cursor from "@/components/ui/Cursor";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative bg-[#121212]">
      <Cursor />
      <ScrollReset />
      {/* Fixed 3D WebGL background — visible across the entire page */}
      <Scene />
      <NavPill />
      {/* Hero scroll section — z-index must be clearly above canvas (0) */}
      <div id="intro" className="relative h-[130dvh]" style={{ zIndex: 20 }}>
        <Overlay />
        {/* Bottom fade blends hero into About with no hard seam */}
        <div suppressHydrationWarning className="absolute inset-x-0 bottom-0 h-64 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 0%, #121212 100%)", zIndex: 31 }} />
      </div>
      {/* Content sections sit above canvas */}
      <div style={{ position: "relative", zIndex: 20 }}>
        <About />
        <Projects />
        <Experience />
        <Education />
        <Skills />
        <Contact />
        <footer suppressHydrationWarning className="relative z-20 pt-10 pb-8 px-8 border-t border-white/[0.06]"
          style={{ background: "#0d1117" }}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <p
                className="text-[clamp(1.8rem,4vw,3rem)] font-black uppercase tracking-tight leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "rgba(255,255,255,0.07)",
                }}
              >
                Simarjit Singh
              </p>
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/20 mt-2">
                Data Scientist · GenAI · Berlin
              </p>
            </div>
            <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-white/15">
              © 2026
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
