import { Scene, NavPill, Overlay } from "@/components/Dynamics";
import ScrollReset from "@/components/ui/ScrollReset";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative bg-black">
      <ScrollReset />
      {/* Fixed 3D WebGL background — visible across the entire page */}
      <Scene />
      <NavPill />
      {/* Hero scroll section — z-index must be clearly above canvas (0) */}
      <div id="intro" className="relative h-[130vh]" style={{ zIndex: 20 }}>
        <Overlay />
      </div>
      {/* Content sections sit above canvas */}
      <div style={{ position: "relative", zIndex: 20 }}>
        <About />
        <Projects />
        <Experience />
        <Education />
        <Skills />
        <Contact />
        <footer className="relative z-20 py-6 px-8 border-t border-white/[0.06]"
          style={{ background: "#0d1117" }}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-white/20">
              © 2026 Simarjit Singh
            </span>
            <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-white/15">
              Berlin, Germany
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
