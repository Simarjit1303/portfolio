import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="relative bg-[#121212]">
      <div className="relative">
        <ScrollyCanvas />
        <Overlay />
      </div>
      <Projects />
      <Experience />
      <Education />
      <Skills />
    </main>
  );
}
