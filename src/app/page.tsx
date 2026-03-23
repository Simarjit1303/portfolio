import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="relative bg-[#121212]">
      <div className="relative">
        <ScrollyCanvas />
        <Overlay />
      </div>
      <Projects />
    </main>
  );
}
