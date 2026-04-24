"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group } from "three";

export default function Model({ onLoad }: { onLoad?: () => void }) {
  const groupRef = useRef<Group>(null);
  const { scene, animations } = useGLTF("/robot.glb");
  const { actions } = useAnimations(animations, groupRef);

  // Mouse target stored in a ref — no React re-renders on every mouse move
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Signal to Scene.tsx that the GLB has loaded and component has mounted
    onLoad?.();

    // Start idle skeletal animation
    if (actions["Idle"]) {
      actions["Idle"].reset().fadeIn(0.5).play();
    } else {
      console.warn("Model: 'Idle' animation not found in robot.glb — check GLB export");
    }

    // Wave event trigger
    const handleWave = () => {
      if (actions["Wave"] && actions["Idle"]) {
        actions["Idle"].fadeOut(0.5);
        actions["Wave"].reset().fadeIn(0.5).play();
        setTimeout(() => {
          actions["Wave"]?.fadeOut(0.5);
          actions["Idle"]?.reset().fadeIn(0.5).play();
        }, 3000);
      }
    };

    // Track raw cursor position in a ref (no state updates, no re-renders)
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;   // -1 → 1
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1); // -1 → 1
    };

    window.addEventListener("robotWave", handleWave);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("robotWave", handleWave);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [actions]);

  // GPU render loop — smooth cursor-tracking rotation with spring-like damping
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Target rotation based on cursor position
    const targetY = mouse.current.x * 0.45;  // horizontal: follow left/right
    const targetX = mouse.current.y * 0.15;  // vertical: subtle tilt up/down

    // Exponential lerp — feels springy and responsive
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * Math.min(1, delta * 4);
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * Math.min(1, delta * 4);

    // Idle float — gentle sine wave on Y axis
    groupRef.current.position.y = -3.8 + Math.sin(state.clock.elapsedTime * 0.7) * 0.06;
  });

  return (
    <group ref={groupRef} scale={1.5} position={[0, -3.8, 0]}>
      <primitive object={scene} />
    </group>
  );
}

// Kick off GLB fetch immediately when this JS module loads
useGLTF.preload("/robot.glb");
