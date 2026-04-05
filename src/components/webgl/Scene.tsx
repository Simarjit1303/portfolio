"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import Model from "./Model";
import { Suspense, useState, useEffect } from "react";

export default function Scene() {
  return (
    <div className="fixed inset-0" style={{ zIndex: 0, pointerEvents: "none" }}>
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]} 
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
        eventSource={typeof window !== 'undefined' ? document.body : undefined}
      >
        
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#00D9FF" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#FF5C00" />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          
          {/* Subtle floating physics container around the model */}
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Model />
          </Float>

          {/* Aesthetic Contact Shadows rendered physically accurate beneath the model */}
          <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
          
          <EffectComposer>
            <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
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

  // Fallback simulator before custom GLTF assets are loaded via <Suspense>
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
