"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import Model from "./Model";

export default function Scene() {
  return (
    <div className="fixed inset-0" style={{ zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true,
        }}
      >
        {/* Efficient hand-lit setup — no heavy HDR/environment map */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]}  intensity={2.2} color="#00D9FF" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#FF5C00" />
        <pointLight position={[0, 4, 3]} intensity={1.0} color="#ffffff" />

        {/* No Float wrapper — Model handles mouse-tracking rotation directly */}
        {/* No EffectComposer / Bloom / ContactShadows — major INP & LCP win */}
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>

      <FallbackLoader />
    </div>
  );
}

function FallbackLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Fade out after 2.5s max — real load is signalled by Suspense resolving
    const t = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#0d1117]"
      style={{
        zIndex: 50,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.6s ease",
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="w-10 h-10 rounded-full border-4 border-[#00D9FF]/20 border-t-[#00D9FF] animate-spin" />
        <p className="text-white/60 font-mono text-xs tracking-widest uppercase">
          Loading Experience...
        </p>
      </div>
    </div>
  );
}
