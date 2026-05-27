"use client";

import { useLabStore } from "@/store/labStore";
import type { NotebookPanel } from "@/store/labStore";
import { LabPanel } from "./LabPanel";

// ─── Process entries ──────────────────────────────────────────────────────────

type Status = "shipped" | "in progress" | "research";

type Entry = {
  id: Exclude<NotebookPanel, "overview" | "concepts">;
  title: string;
  area: string;
  status: Status;
  notes: string[];
};

const STATUS_CLASS: Record<Status, string> = {
  "shipped":     "text-success",
  "in progress": "text-warning",
  "research":    "text-secondary",
};

const ENTRIES: Entry[] = [
  {
    id: "replay",
    title: "Replay System",
    area: "Developer Tools",
    status: "shipped",
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
    status: "shipped",
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
    status: "shipped",
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
    status: "shipped",
    notes: [
      "Behavior tree visual editor for configuring NPC personalities",
      "Complexity floor: useful out of the box, no scripting required",
      "Complexity ceiling: full scripting for advanced creators",
      "Inline test environment — preview behavior before deployment",
    ],
  },
  {
    id: "feedback-mode",
    title: "Feedback Mode",
    area: "AI · Platform",
    status: "shipped",
    notes: [
      "Structured in-experience feedback collection for Roblox creators",
      "Prompts surface at natural friction points, not fixed intervals",
      "AI-assisted categorization reduces manual creator review burden",
      "Designed around creator workflow — not IT ticketing patterns",
    ],
  },
];

// ─── Concept explorer ─────────────────────────────────────────────────────────

type Concept = {
  id: string;
  title: string;
  principle: string;
  projects: string[];
};

const CONCEPTS: Concept[] = [
  {
    id: "api-first",
    title: "API-First Design",
    principle: "Design for developers before designing for end users.",
    projects: ["TTS / Captioning", "Replay System"],
  },
  {
    id: "complexity-floors",
    title: "Complexity Floors + Ceilings",
    principle: "Every tool needs a 'just works' floor and a power-user ceiling.",
    projects: ["NPC Bots", "Replay System", "Localization"],
  },
  {
    id: "ai-as-reducer",
    title: "AI as Cognitive Reducer",
    principle: "Use AI to reduce burden — not replace judgment.",
    projects: ["NPC Bots", "Feedback Mode"],
  },
  {
    id: "accessibility-infra",
    title: "Accessibility as Infrastructure",
    principle: "Accessibility belongs in the platform layer, not the feature layer.",
    projects: ["TTS / Captioning", "Localization"],
  },
  {
    id: "creator-first",
    title: "Creator-First Systems",
    principle: "Building for creators unlocks better experiences for players.",
    projects: ["Localization", "Feedback Mode", "NPC Bots"],
  },
];

// ─── Views ────────────────────────────────────────────────────────────────────

function StatusPill({ status }: { status: Status }) {
  return (
    <span className={`font-mono text-[9px] uppercase tracking-wider ${STATUS_CLASS[status]} opacity-70`}>
      {status}
    </span>
  );
}

function Overview() {
  return (
    <LabPanel title="Design Notebook">
      <ul className="flex flex-col gap-2">
        {ENTRIES.map((e) => (
          <li key={e.id} className="flex items-baseline justify-between gap-3">
            <span className="text-xs text-fg opacity-75">{e.title}</span>
            <StatusPill status={e.status} />
          </li>
        ))}
      </ul>
    </LabPanel>
  );
}

function EntryView({ entry, onBack }: { entry: Entry; onBack: () => void }) {
  return (
    <LabPanel title={entry.title} onBack={onBack}>
      <div className="mb-2 flex items-center gap-2">
        <span className="font-mono text-[9px] uppercase tracking-wider text-fg-muted opacity-40">
          {entry.area}
        </span>
        <span className="text-fg-muted opacity-30">·</span>
        <StatusPill status={entry.status} />
      </div>
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

function ConceptsView({ onBack }: { onBack: () => void }) {
  return (
    <LabPanel title="Concept Explorer" onBack={onBack}>
      <ul className="flex flex-col gap-3">
        {CONCEPTS.map((c) => (
          <li key={c.id}>
            <p className="mb-0.5 text-[11px] font-semibold text-fg opacity-80">
              {c.title}
            </p>
            <p className="mb-1 text-[10px] leading-snug text-fg-muted opacity-60">
              {c.principle}
            </p>
            <div className="flex flex-wrap gap-1">
              {c.projects.map((p) => (
                <span
                  key={p}
                  className="rounded border border-border px-1.5 py-0.5 font-mono text-[8px] text-fg-muted opacity-50"
                >
                  {p}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </LabPanel>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export function LabNotebookPanel() {
  const notebookPanel    = useLabStore((s) => s.notebookPanel);
  const setNotebookPanel = useLabStore((s) => s.setNotebookPanel);
  const toOverview = () => setNotebookPanel("overview");

  if (notebookPanel === "overview") return <Overview />;
  if (notebookPanel === "concepts") return <ConceptsView onBack={toOverview} />;

  const entry = ENTRIES.find((e) => e.id === notebookPanel);
  if (!entry) return null;

  return <EntryView entry={entry} onBack={toOverview} />;
}
