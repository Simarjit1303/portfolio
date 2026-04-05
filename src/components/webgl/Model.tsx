"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group } from "three";

export default function Model() {
  const groupRef = useRef<Group>(null);
  
  // Asynchronously parse the raw WebGL binaries from the public folder!
  const { scene, animations } = useGLTF("/robot.glb");
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    // Start idle animation automatically
    if (actions["Idle"]) {
      actions["Idle"].reset().fadeIn(0.5).play();
    }

    // Listen for custom global event to trigger the structural Wave
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

    window.addEventListener("robotWave", handleWave);
    return () => window.removeEventListener("robotWave", handleWave);
  }, [actions]);

  // Pure WebGL physics calculating rotation toward cursor
  useFrame((state, delta) => {
    if (groupRef.current) {
      // We physically rotate the entire character structure using Spring-like dampening
      const targetX = state.pointer.x * 0.5;
      const targetY = state.pointer.y * 0.3;
      
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * delta * 5;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * delta * 5;
    }
  });

  return (
    <group ref={groupRef} scale={1.5} position={[0, -3.8, 0]}>
      <primitive object={scene} />
    </group>
  );
}

// Pre-hydrate the model so there are no loading visual pops
useGLTF.preload("/robot.glb");
