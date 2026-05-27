"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLabStore } from "@/store/labStore";
import type { LabLocation } from "@/store/labStore";

// Subtle point lights that fade in once the corresponding location has
// been visited. Reads visitedLocations non-reactively inside useFrame so
// the component never re-renders — only the light intensity changes.

type VisitedLightDef = {
  locations: LabLocation[];
  position: [number, number, number];
  color: string;
  maxIntensity: number;
};

const DEFS: VisitedLightDef[] = [
  {
    // Nightstand / bed — warm amber, like a lamp left on
    locations: ["bed"],
    position: [4.2, 1.2, -0.7],
    color: "#7a4018",
    maxIntensity: 1.2,
  },
  {
    // Shelf — cool focused blue, like a reading light
    locations: ["shelf"],
    position: [-4.0, 2.5, -3.5],
    color: "#243060",
    maxIntensity: 0.9,
  },
  {
    // Calendar — warm neutral, like ambient room diffusion
    locations: ["calendar"],
    position: [0.8, 2.6, -3.6],
    color: "#604830",
    maxIntensity: 0.7,
  },
  {
    // Couch / TV area — supplements the existing TV glow
    locations: ["tv"],
    position: [1.8, 1.6, 0.9],
    color: "#182840",
    maxIntensity: 0.8,
  },
];

const SPEED = 1.2;

function VisitedLight({ def }: { def: VisitedLightDef }) {
  const ref = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const { visitedLocations } = useLabStore.getState();
    const active = def.locations.some((loc) => visitedLocations.includes(loc));
    const target = active ? def.maxIntensity : 0;
    ref.current.intensity +=
      (target - ref.current.intensity) * Math.min(1, SPEED * delta);
  });

  return (
    <pointLight
      ref={ref}
      position={def.position}
      color={def.color}
      intensity={0}
      decay={2}
    />
  );
}

export function LabVisitedLights() {
  return (
    <>
      {DEFS.map((def, i) => (
        <VisitedLight key={i} def={def} />
      ))}
    </>
  );
}
