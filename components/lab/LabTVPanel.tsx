"use client";

import { useLabStore } from "@/store/labStore";
import type { TVPanel } from "@/store/labStore";
import { LabPanel } from "./LabPanel";

// ─── Community entries ────────────────────────────────────────────────────────

type CommunityEntry = {
  id: Exclude<TVPanel, "overview">;
  title: string;
  category: string;
  notes: string[];
};

const ENTRIES: CommunityEntry[] = [
  {
    id: "rdc",
    title: "Roblox Developer Conference",
    category: "Speaking · Workshop",
    notes: [
      "Workshop on platform design systems for experience creators",
      "Panel on accessibility and inclusive design in games",
      "Hallway conversations that directly shaped NPC Bots and Feedback Mode",
      "Annual inflection point for understanding what creators actually need",
    ],
  },
  {
    id: "scad",
    title: "SCAD",
    category: "Education · Mentorship",
    notes: [
      "Guest critique and portfolio review for UX and game design students",
      "Studio sessions on designing for platform constraints vs. canvas freedom",
      "Focus on bridging academic design thinking with production realities",
      "Ongoing relationship — students regularly reach out after graduation",
    ],
  },
  {
    id: "iu",
    title: "Indiana University",
    category: "Education · Research",
    notes: [
      "Collaboration with the Informatics department on player experience research",
      "Talks on human-centered design in interactive systems",
      "Contributed to curriculum shaping around games and UX overlap",
      "Home institution — relationships go back to before Roblox",
    ],
  },
  {
    id: "talks",
    title: "Talks & Workshops",
    category: "Public Speaking",
    notes: [
      "Design systems in games — scaling consistency without killing creativity",
      "AI interaction design — where judgment lives when machines assist",
      "Developer tool UX — making powerful things approachable",
      "Prefer workshop format over lecture: attendees leave with work done",
    ],
  },
  {
    id: "mentorship",
    title: "Mentorship",
    category: "1:1 · Career",
    notes: [
      "Long-form mentorship with early-career designers and career changers",
      "Focus: portfolio framing, systems thinking, reading the room in reviews",
      "Have seen mentees land at Meta, Riot, Netflix, and indie studios",
      "Strongest signal of growth: when they start teaching others",
    ],
  },
];

// ─── Views ────────────────────────────────────────────────────────────────────

function Overview() {
  return (
    <LabPanel title="Community">
      <ul className="flex flex-col gap-2">
        {ENTRIES.map((e) => (
          <li key={e.id} className="flex items-baseline justify-between gap-3">
            <span className="text-xs text-fg opacity-75">{e.title}</span>
            <span className="shrink-0 font-mono text-[9px] text-fg-muted opacity-40">
              {e.category.split(" · ")[0]}
            </span>
          </li>
        ))}
      </ul>
    </LabPanel>
  );
}

function EntryView({ entry }: { entry: CommunityEntry }) {
  return (
    <LabPanel title={entry.title}>
      <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-fg-muted opacity-40">
        {entry.category}
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

export function LabTVPanel() {
  const tvPanel = useLabStore((s) => s.tvPanel);

  if (tvPanel === "overview") return <Overview />;

  const entry = ENTRIES.find((e) => e.id === tvPanel);
  if (!entry) return null;

  return <EntryView entry={entry} />;
}
