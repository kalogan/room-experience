"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useLabStore } from "@/store/labStore";
import type { LabLocation } from "@/store/labStore";

type CameraPreset = {
  position: [number, number, number];
  target: [number, number, number];
};

const PRESETS: Record<LabLocation, CameraPreset> = {
  "desk-seated":   { position: [-2.2, 1.35,  1.2],  target: [-2.2, 1.1,  -0.8]  },
  "room-standing": { position: [ 0,   1.8,   4],     target: [ 0,   0.8,  -1.5]  },
  "laptop":        { position: [-2.2, 1.55,  0.2],   target: [-2.2, 1.28, -1.19] },
  "notebook":      { position: [-2.6, 1.5,   0.3],   target: [-2.2, 0.82, -0.5]  },
  "bed":           { position: [ 1.5, 1.4,   0.8],   target: [ 3,   0.4,  -1.6]  },
  "tv":            { position: [ 1.5, 1.6,   1.2],   target: [ 3.5, 1.85, -3.97] },
  "calendar":      { position: [ 0.8, 1.8,   1.0],   target: [ 0.8, 1.95, -3.97] },
  "shelf":         { position: [-1.5, 1.8,   0.5],   target: [-3.2, 2.05, -3.9]  },
};

const LERP_SPEED = 2.5;

export function CameraRig() {
  const { camera } = useThree();

  const targetPos   = useRef(new Vector3(...PRESETS["desk-seated"].position));
  const targetLook  = useRef(new Vector3(...PRESETS["desk-seated"].target));
  const currentLook = useRef(new Vector3(...PRESETS["desk-seated"].target));

  useFrame((_, delta) => {
    const { location } = useLabStore.getState();
    const preset = PRESETS[location];

    targetPos.current.set(...preset.position);
    targetLook.current.set(...preset.target);

    const t = Math.min(1, LERP_SPEED * delta);
    camera.position.lerp(targetPos.current, t);
    currentLook.current.lerp(targetLook.current, t);
    camera.lookAt(currentLook.current);
  });

  return null;
}
