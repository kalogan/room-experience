"use client";

import { useLabStore, type LabLocation } from "@/store/labStore";

const locations: LabLocation[] = [
  "desk-seated",
  "room-standing",
  "laptop",
  "notebook",
  "bed",
  "tv",
  "calendar",
  "shelf",
];

export function LabStoreDebug() {
  const {
    location,
    soundEnabled,
    is3DEnabled,
    visitedLocations,
    setLocation,
    toggleSound,
    toggle3D,
    resetLab,
  } = useLabStore();

  return (
    <div className="mt-10 w-full max-w-sm rounded-lg border border-border bg-surface p-5 text-left font-mono text-xs">
      <p className="mb-3 text-fg-muted uppercase tracking-widest text-[10px]">
        Store debug — Phase 04
      </p>

      <div className="mb-4 space-y-1 text-fg-muted">
        <div>
          <span className="text-fg-muted opacity-50">location: </span>
          <span className="text-primary">{location}</span>
        </div>
        <div>
          <span className="text-fg-muted opacity-50">sound: </span>
          <span className={soundEnabled ? "text-success" : "text-fg-muted"}>
            {soundEnabled ? "on" : "off"}
          </span>
        </div>
        <div>
          <span className="text-fg-muted opacity-50">3D: </span>
          <span className={is3DEnabled ? "text-success" : "text-fg-muted"}>
            {is3DEnabled ? "on" : "off"}
          </span>
        </div>
        <div>
          <span className="text-fg-muted opacity-50">visited: </span>
          <span className="text-fg-muted">
            {visitedLocations.length === 0
              ? "none"
              : visitedLocations.join(", ")}
          </span>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {locations.map((loc) => (
          <button
            key={loc}
            onClick={() => setLocation(loc)}
            className={`rounded px-2 py-1 text-[10px] transition-colors ${
              location === loc
                ? "bg-primary text-primary-fg"
                : "bg-muted text-fg-muted hover:text-fg"
            }`}
          >
            {loc}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={toggleSound}
          className="rounded bg-muted px-3 py-1.5 text-[10px] text-fg-muted transition-colors hover:text-fg"
        >
          toggle sound
        </button>
        <button
          onClick={toggle3D}
          className="rounded bg-muted px-3 py-1.5 text-[10px] text-fg-muted transition-colors hover:text-fg"
        >
          toggle 3D
        </button>
        <button
          onClick={resetLab}
          className="rounded bg-muted px-3 py-1.5 text-[10px] text-fg-muted transition-colors hover:text-fg"
        >
          reset
        </button>
      </div>
    </div>
  );
}
