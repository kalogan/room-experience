"use client";

import { useLabStore } from "@/store/labStore";
import { LabPanel } from "./LabPanel";

// ─── Work content ─────────────────────────────────────────────────────────────
// Full case-study detail pages wire in Phase 12+.

const WORK_ITEMS = [
  { id: "localization", title: "Localization Platform",    tags: "Platform · Systems"    },
  { id: "replay",       title: "Replay System",            tags: "Tooling"               },
  { id: "tts",          title: "TTS / Captioning",        tags: "Accessibility · API"   },
  { id: "feedback",     title: "Feedback Mode",           tags: "AI"                    },
  { id: "npc",          title: "NPC Bots Management",     tags: "AI"                    },
  { id: "infra",        title: "Platform Infrastructure", tags: "NDA"                   },
  { id: "cb",           title: "Sectional Configurator",  tags: "3D · Commerce"         },
];

function WorkList() {
  return (
    <ul className="flex flex-col gap-[7px]">
      {WORK_ITEMS.map((item) => (
        <li key={item.id} className="flex items-baseline justify-between gap-3">
          <span className="text-xs text-fg opacity-75">{item.title}</span>
          <span className="shrink-0 font-mono text-[9px] text-fg-muted opacity-40">
            {item.tags}
          </span>
        </li>
      ))}
    </ul>
  );
}

// ─── Sub-state views ──────────────────────────────────────────────────────────

function TerminalStub() {
  return (
    <p className="font-mono text-[10px] text-fg-muted opacity-40">
      Terminal — building in Phase 13.
    </p>
  );
}

function SimulatorStub() {
  return (
    <p className="font-mono text-[10px] text-fg-muted opacity-40">
      Simulator — building in a later phase.
    </p>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export function LabDeskPanel() {
  const deskPanel = useLabStore((s) => s.deskPanel);

  // "home" — no panel; scene copy conveys the overview.
  if (deskPanel === "home") return null;

  if (deskPanel === "terminal") {
    return (
      <LabPanel title="Terminal">
        <TerminalStub />
      </LabPanel>
    );
  }

  if (deskPanel === "simulator") {
    return (
      <LabPanel title="Simulator">
        <SimulatorStub />
      </LabPanel>
    );
  }

  // "work" — full project list
  return (
    <LabPanel title="Work & Case Studies">
      <WorkList />
    </LabPanel>
  );
}
