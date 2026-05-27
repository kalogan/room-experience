"use client";

import { useEffect } from "react";
import { useLabStore, type LabLocation } from "@/store/labStore";

type Hotspot = {
  id: LabLocation;
  position: [number, number, number];
  size: [number, number, number];
  visibleAt: LabLocation[];
};

// Invisible bounding-box click targets. Positions/sizes are tuned to cover
// the geometry visible from each camera preset.
const HOTSPOTS: Hotspot[] = [
  // ── From room-standing ──────────────────────────────────────────────────────
  {
    id: "desk-seated",
    position: [-2.2, 1.05, -0.8],
    size: [3.0, 2.1, 2.0],
    visibleAt: ["room-standing"],
  },
  {
    id: "bed",
    position: [3.2, 0.5, -1.5],
    size: [2.2, 1.4, 3.5],
    visibleAt: ["room-standing"],
  },
  {
    id: "tv",
    position: [2.5, 0.6, 0.5],
    size: [2.5, 1.5, 1.5],
    visibleAt: ["room-standing"],
  },
  {
    id: "calendar",
    position: [0.8, 1.95, -3.85],
    size: [0.7, 0.85, 0.2],
    visibleAt: ["room-standing"],
  },
  {
    id: "shelf",
    position: [-3.2, 2.0, -3.85],
    size: [2.0, 1.5, 0.2],
    visibleAt: ["room-standing"],
  },

  // ── From desk-seated ────────────────────────────────────────────────────────
  {
    id: "laptop",
    position: [-2.2, 1.28, -1.1],
    size: [1.0, 0.75, 0.4],
    visibleAt: ["desk-seated"],
  },
  {
    id: "notebook",
    position: [-1.45, 0.88, -0.65],
    size: [0.55, 0.22, 0.4],
    visibleAt: ["desk-seated"],
  },
];

const setCursor = (value: string) => () => {
  document.body.style.cursor = value;
};

export function LabHotspots() {
  const location = useLabStore((s) => s.location);
  const setLocation = useLabStore((s) => s.setLocation);

  // Reset cursor if navigation fires while the pointer is over a hotspot.
  useEffect(() => {
    document.body.style.cursor = "auto";
  }, [location]);

  const visible = HOTSPOTS.filter((h) => h.visibleAt.includes(location));

  return (
    <group>
      {visible.map((h) => (
        <mesh
          key={h.id}
          position={h.position}
          onClick={(e) => {
            e.stopPropagation();
            setLocation(h.id);
          }}
          onPointerOver={setCursor("pointer")}
          onPointerOut={setCursor("auto")}
        >
          <boxGeometry args={h.size} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}
