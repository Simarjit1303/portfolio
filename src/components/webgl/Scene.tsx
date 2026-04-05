"use client";

import { Canvas } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import Model from "./Model";
import { Suspense, useState, useEffect } from "react";

export default function Scene() {
  return (
    <div className="fixed inset-0" style={{ zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}  // Capped: avoids 4x pixel overdraw on retina
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,   // Disable unused stencil buffer
          depth: true,
        }}
      >
        {/* Lights */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#00D9FF" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#FF5C00" />

        <Suspense fallback={null}>
          {/* Removed heavy Environment preset — manual lights are sufficient */}

          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Model />
          </Float>

          <ContactShadows position={[0, -2.5, 0]} opacity={0.35} scale={8} blur={2} far={3} />

          <EffectComposer>
            {/* Reduced Bloom intensity — main perf win, still looks cinematic */}
            <Bloom luminanceThreshold={0.6} intensity={1.0} levels={4} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>

      </Canvas>

      <FallbackLoader />
    </div>
  );
}

function FallbackLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (!loading) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#0d1117] transition-opacity duration-1000"
      style={{ zIndex: 50 }}
    >
      <div className="flex flex-col items-center gap-4">
         <span className="w-10 h-10 rounded-full border-4 border-[#00D9FF]/20 border-t-[#00D9FF] animate-spin" />
         <p className="text-white/60 font-mono text-xs tracking-widest uppercase">Initializing WebGL Engine...</p>
      </div>
    </div>
  );
}
