"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

// Slowly rotating wireframe box — placeholder until Phase 08 builds the real room.
function PlaceholderMesh() {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.25;
    ref.current.rotation.y += delta * 0.4;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial
        color="#c8a96e"
        wireframe
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

// Default export required for next/dynamic.
export default function LabScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 1, 4], fov: 55 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[3, 4, 3]} intensity={8} color="#c8a96e" decay={2} />
      <PlaceholderMesh />
    </Canvas>
  );
}
