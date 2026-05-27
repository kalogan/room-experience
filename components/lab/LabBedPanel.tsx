"use client";

import { useLabStore } from "@/store/labStore";
import type { BedPanel } from "@/store/labStore";
import { LabPanel } from "./LabPanel";

// ─── Experiment entries ───────────────────────────────────────────────────────

type Status = "playable" | "in progress" | "research";

type Experiment = {
  id: Exclude<BedPanel, "overview">;
  title: string;
  tech: string;
  status: Status;
  notes: string[];
};

const STATUS_CLASS: Record<Status, string> = {
  "playable":    "text-success",
  "in progress": "text-warning",
  "research":    "text-secondary",
};

const EXPERIMENTS: Experiment[] = [
  {
    id: "air-hockey",
    title: "Air Hockey",
    tech: "Browser Game",
    status: "playable",
    notes: [
      "Physics-based puck momentum and paddle collision from scratch",
      "Single-player with a tuned AI opponent using prediction math",
      "Built to understand real-time game loops in the browser",
      "Score tracking, sound cues, difficulty scaling",
    ],
  },
  {
    id: "npc-simulation",
    title: "NPC Simulation",
    tech: "Canvas · Simulation",
    status: "in progress",
    notes: [
      "Standalone behavior simulation outside of the Roblox runtime",
      "Tests pathfinding and personality archetypes independently",
      "Directly informs the NPC Bots platform design decisions",
      "Separation of concerns: engine-agnostic behavior logic",
    ],
  },
  {
    id: "godot",
    title: "Godot",
    tech: "Game Engine",
    status: "in progress",
    notes: [
      "Exploring Godot as an alternative runtime for game jams",
      "Side-scrolling platformer with physics-based movement",
      "GDScript vs. Lua (Roblox) — comparing authoring ergonomics",
      "Primary focus: character controller feel and coyote time",
    ],
  },
  {
    id: "webgl",
    title: "WebGL",
    tech: "Shader · Canvas",
    status: "research",
    notes: [
      "Generative patterns using noise functions and GLSL shaders",
      "Three.js and raw WebGL explored side by side",
      "Atmospheric light and shadow — direct influence on this room",
      "Long-running sketchbook, not a single finished artifact",
    ],
  },
];

// ─── Views ────────────────────────────────────────────────────────────────────

function StatusPill({ status }: { status: Status }) {
  return (
    <span
      className={`font-mono text-[9px] uppercase tracking-wider ${STATUS_CLASS[status]} opacity-70`}
    >
      {status}
    </span>
  );
}

function Overview() {
  return (
    <LabPanel title="Experiments">
      <ul className="flex flex-col gap-2">
        {EXPERIMENTS.map((e) => (
          <li key={e.id} className="flex items-baseline justify-between gap-3">
            <span className="text-xs text-fg opacity-75">{e.title}</span>
            <StatusPill status={e.status} />
          </li>
        ))}
      </ul>
    </LabPanel>
  );
}

function ExperimentView({ exp, onBack }: { exp: Experiment; onBack: () => void }) {
  return (
    <LabPanel title={exp.title} onBack={onBack}>
      <div className="mb-2 flex items-center gap-2">
        <span className="font-mono text-[9px] uppercase tracking-wider text-fg-muted opacity-40">
          {exp.tech}
        </span>
        <span className="text-fg-muted opacity-30">·</span>
        <StatusPill status={exp.status} />
      </div>
      <ul className="flex flex-col gap-1.5">
        {exp.notes.map((note, i) => (
          <li key={i} className="flex gap-2 text-[11px] leading-snug text-fg opacity-65">
            <span className="mt-px shrink-0 text-fg-muted opacity-40">·</span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </LabPanel>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export function LabBedPanel() {
  const bedPanel    = useLabStore((s) => s.bedPanel);
  const setBedPanel = useLabStore((s) => s.setBedPanel);
  const toOverview  = () => setBedPanel("overview");

  if (bedPanel === "overview") return <Overview />;

  const exp = EXPERIMENTS.find((e) => e.id === bedPanel);
  if (!exp) return null;

  return <ExperimentView exp={exp} onBack={toOverview} />;
}
