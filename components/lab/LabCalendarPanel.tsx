"use client";

import { useLabStore } from "@/store/labStore";
import type { CalendarPanel } from "@/store/labStore";
import { LabPanel } from "./LabPanel";

// ─── Timeline data ────────────────────────────────────────────────────────────

type TimelineEntry = { year: string; event: string };

type Section = {
  id: Exclude<CalendarPanel, "overview">;
  title: string;
  entries: TimelineEntry[];
};

const SECTIONS: Section[] = [
  {
    id: "work",
    title: "Work Era",
    entries: [
      { year: "now",  event: "Staff Product Designer — Roblox" },
      { year: "2024", event: "Feedback Mode shipped" },
      { year: "2023", event: "NPC Bots Management shipped" },
      { year: "2022", event: "TTS / Captioning — API-first direction" },
      { year: "2021", event: "Replay System shipped" },
      { year: "2020", event: "Localization Platform shipped" },
      { year: "2019", event: "Joined Roblox" },
      { year: "2018", event: "Crate & Barrel — Sectional Configurator" },
      { year: "–",    event: "Indiana University — UX & systems design" },
    ],
  },
  {
    id: "community",
    title: "Community",
    entries: [
      { year: "2024", event: "RDC — accessibility panel + workshop" },
      { year: "2024", event: "Mentorship cohort — 6 designers" },
      { year: "2023", event: "IU Informatics — player experience research" },
      { year: "2023", event: "SCAD — portfolio reviews + studio sessions" },
      { year: "2022", event: "RDC — design systems workshop" },
      { year: "2022", event: "SCAD — first guest critique" },
      { year: "now",  event: "1:1 mentorship — ongoing" },
    ],
  },
  {
    id: "talks",
    title: "Talks",
    entries: [
      { year: "2024", event: "AI interaction design — where judgment lives" },
      { year: "2024", event: "RDC — inclusive design in games" },
      { year: "2023", event: "Developer tool UX — powerful + approachable" },
      { year: "2023", event: "IU — human-centered design in interactive systems" },
      { year: "2022", event: "Design systems in games — scaling consistency" },
    ],
  },
  {
    id: "experiments",
    title: "Experiments",
    entries: [
      { year: "now",  event: "Godot platformer — in progress" },
      { year: "now",  event: "NPC Simulation — in progress" },
      { year: "2023", event: "Air Hockey — shipped, playable" },
      { year: "2021", event: "WebGL sketchbook — ongoing" },
    ],
  },
];

// ─── Views ────────────────────────────────────────────────────────────────────

function TimelineList({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {entries.map((e, i) => (
        <li key={i} className="grid grid-cols-[2.8rem_1fr] gap-2">
          <span className="font-mono text-[9px] text-fg-muted opacity-40 pt-px">
            {e.year}
          </span>
          <span className="text-[11px] leading-snug text-fg opacity-65">
            {e.event}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Overview() {
  return (
    <LabPanel title="Career Timeline">
      <ul className="flex flex-col gap-2">
        {SECTIONS.map((s) => (
          <li key={s.id} className="flex items-baseline justify-between gap-3">
            <span className="text-xs text-fg opacity-75">{s.title}</span>
            <span className="shrink-0 font-mono text-[9px] text-fg-muted opacity-40">
              {s.entries.length} entries
            </span>
          </li>
        ))}
      </ul>
    </LabPanel>
  );
}

function SectionView({ section, onBack }: { section: Section; onBack: () => void }) {
  return (
    <LabPanel title={section.title} onBack={onBack}>
      <TimelineList entries={section.entries} />
    </LabPanel>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export function LabCalendarPanel() {
  const calendarPanel    = useLabStore((s) => s.calendarPanel);
  const setCalendarPanel = useLabStore((s) => s.setCalendarPanel);
  const toOverview       = () => setCalendarPanel("overview");

  if (calendarPanel === "overview") return <Overview />;

  const section = SECTIONS.find((s) => s.id === calendarPanel);
  if (!section) return null;

  return <SectionView section={section} onBack={toOverview} />;
}
