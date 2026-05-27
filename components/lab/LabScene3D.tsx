"use client";

import { Canvas } from "@react-three/fiber";
import { CameraRig } from "./CameraRig";
import { LabHotspots } from "./LabHotspots";
import { LabRoom } from "./LabRoom";
import { LabVisitedLights } from "./LabVisitedLights";

// ─── Lighting notes ───────────────────────────────────────────────────────────
// ambient    — very dim cool moonlight fills the whole room
// monitor    — blue-white point at the screen face; casts on desk + chair
// warm lamp  — amber fill above desk-left; suggests an off-screen desk lamp
// tv glow    — dim blue-purple near TV; bleeds onto couch / back wall
// Camera and preset system wired in Phase 09.

export default function LabScene3D() {
  return (
    <Canvas
      camera={{ position: [-2.2, 1.35, 1.2], fov: 60 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      {/* Atmospheric depth fog — matches --bg token (#080c12) */}
      <fog attach="fog" args={["#060a10", 5.5, 13]} />

      {/* Ambient — cool, very dim */}
      <ambientLight intensity={0.12} color="#c8d4f0" />

      {/* Monitor glow — the main light source, casts on desk + chair */}
      <pointLight
        position={[-2.2, 1.28, -0.95]}
        intensity={5}
        color="#88aaff"
        decay={2}
      />

      {/* Warm fill — off-screen desk lamp, warms the left side */}
      <pointLight
        position={[-1.2, 2.4, 0.5]}
        intensity={3.5}
        color="#c8a06a"
        decay={2}
      />

      {/* TV ambient glow — dim, bleeds toward couch */}
      <pointLight
        position={[3.2, 1.85, -3.2]}
        intensity={1.8}
        color="#304878"
        decay={2}
      />

      <CameraRig />
      <LabVisitedLights />
      <LabHotspots />
      <LabRoom />
    </Canvas>
  );
}
