"use client";

import { useLabStore } from "@/store/labStore";
import type { NotebookPanel } from "@/store/labStore";
import { LabPanel } from "./LabPanel";

// ─── Notebook entries ─────────────────────────────────────────────────────────
// Process notes per project — full cards in Phase 15–16.

type Entry = {
  id: Exclude<NotebookPanel, "overview" | "feedback-mode">;
  title: string;
  area: string;
  notes: string[];
};

const ENTRIES: Entry[] = [
  {
    id: "replay",
    title: "Replay System",
    area: "Developer Tools",
    notes: [
      "Timeline scrubber for post-session game event review",
      "Event markers color-coded by severity and type",
      "API-first: developers query events, UI adapts to data shape",
      "Key tension — data density vs. readability at scale",
    ],
  },
  {
    id: "localization",
    title: "Localization Platform",
    area: "Platform · Systems",
    notes: [
      "End-to-end string extraction, translation, and preview pipeline",
      "Designed for experience makers, not professional translators",
      "Auto-translate as starting point; manual review as final gate",
      "Handoff format: structured JSON with surrounding context",
    ],
  },
  {
    id: "tts-captioning",
    title: "TTS / Captioning",
    area: "Accessibility · API",
    notes: [
      "API-first direction — caption rendering decoupled from content",
      "Latency tolerance study across dialog, UI, and ambient audio",
      "Style customization depth balanced against implementation cost",
      "Informed by WCAG 1.2 and gaming accessibility guidelines",
    ],
  },
  {
    id: "npc-bots",
    title: "NPC Bots Management",
    area: "AI · Developer Tools",
    notes: [
      "Behavior tree visual editor for configuring NPC personalities",
      "Complexity floor: useful out of the box, no scripting required",
      "Complexity ceiling: full scripting for advanced creators",
      "Inline test environment — preview behavior before deployment",
    ],
  },
];

// ─── Views ────────────────────────────────────────────────────────────────────

function Overview() {
  return (
    <LabPanel title="Design Notebook">
      <ul className="flex flex-col gap-2">
        {ENTRIES.map((e) => (
          <li key={e.id} className="flex items-baseline justify-between gap-3">
            <span className="text-xs text-fg opacity-75">{e.title}</span>
            <span className="shrink-0 font-mono text-[9px] text-fg-muted opacity-40">
              {e.area}
            </span>
          </li>
        ))}
      </ul>
    </LabPanel>
  );
}

function EntryView({ entry }: { entry: Entry }) {
  return (
    <LabPanel title={entry.title}>
      <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-fg-muted opacity-40">
        {entry.area}
      </p>
      <ul className="flex flex-col gap-1.5">
        {entry.notes.map((note, i) => (
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

export function LabNotebookPanel() {
  const notebookPanel = useLabStore((s) => s.notebookPanel);

  if (notebookPanel === "overview") return <Overview />;

  const entry = ENTRIES.find((e) => e.id === notebookPanel);
  if (!entry) return null;

  return <EntryView entry={entry} />;
}
