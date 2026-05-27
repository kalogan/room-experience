"use client";

import { useLabStore } from "@/store/labStore";
import type { ShelfPanel } from "@/store/labStore";
import { LabPanel } from "./LabPanel";

// ─── Shelf content ────────────────────────────────────────────────────────────

type ShelfItem = { primary: string; secondary: string; note: string };

type ShelfSection = {
  id: Exclude<ShelfPanel, "overview">;
  title: string;
  items: ShelfItem[];
};

const SECTIONS: ShelfSection[] = [
  {
    id: "books",
    title: "Books",
    items: [
      { primary: "A Theory of Fun",              secondary: "Raph Koster",          note: "Why games work at a cognitive level" },
      { primary: "The Design of Everyday Things", secondary: "Don Norman",           note: "Affordances, signifiers, feedback loops" },
      { primary: "Designing Games",               secondary: "Tynan Sylvester",      note: "Systems thinking for game makers" },
      { primary: "Thinking in Systems",           secondary: "Donella Meadows",      note: "The mental model book — read it twice" },
      { primary: "The Art of Game Design",        secondary: "Jesse Schell",         note: "100 lenses — use 10, know the rest exist" },
      { primary: "Shape Up",                      secondary: "Basecamp",             note: "How to scope and ship without ceremonies" },
      { primary: "Expressive Design Systems",     secondary: "Yesenia Perez-Cruz",   note: "Design tokens done right" },
    ],
  },
  {
    id: "records",
    title: "Records",
    items: [
      { primary: "Ambient 1: Music for Airports", secondary: "Brian Eno",          note: "The late-night focus standard" },
      { primary: "Elaenia",                        secondary: "Floating Points",    note: "Rhythm and texture, deeply patient" },
      { primary: "Untrue",                          secondary: "Burial",             note: "Atmospheric, urban, melancholy" },
      { primary: "Tomorrow's Modern Boxes",         secondary: "Thom Yorke",        note: "Cinematic and precise" },
      { primary: "Selected Ambient Works Vol. II",  secondary: "Aphex Twin",        note: "Formless depth, still exploratory" },
      { primary: "Vespertine",                      secondary: "Björk",             note: "Intimacy as a production choice" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    items: [
      { primary: "Figma",     secondary: "Design",      note: "Primary tool — live collaboration changed everything" },
      { primary: "VS Code",   secondary: "Code",        note: "Daily driver, extensions matter more than the editor" },
      { primary: "Linear",    secondary: "Planning",    note: "Tickets that don't feel like tickets" },
      { primary: "Raycast",   secondary: "Launcher",    note: "Keyboard-everything — muscle memory within a week" },
      { primary: "Obsidian",  secondary: "Notes",       note: "Connected notes, local-first, owns nothing" },
      { primary: "Warp",      secondary: "Terminal",    note: "A terminal worth caring about" },
      { primary: "R3F",       secondary: "3D / Web",    note: "What built this room" },
    ],
  },
  {
    id: "inspirations",
    title: "Inspirations",
    items: [
      { primary: "Fumito Ueda",          secondary: "Team Ico / FromSoft adjacent", note: "Restraint as a design tool" },
      { primary: "Naughty Dog",          secondary: "Studio",                       note: "Accessibility and narrative systems together" },
      { primary: "Teenage Engineering",  secondary: "Industrial Design",            note: "Hardware for curious people" },
      { primary: "Evan Wallace",         secondary: "Figma / WebGL",               note: "Technical and creative without apology" },
      { primary: "Loot Interactive",     secondary: "Indie Studio",                note: "Small team, enormous care for game feel" },
      { primary: "Molly Holzschlag",     secondary: "Web Standards",               note: "Early accessibility advocacy, still relevant" },
    ],
  },
];

// ─── Views ────────────────────────────────────────────────────────────────────

function Overview() {
  return (
    <LabPanel title="Shelf & Records">
      <ul className="flex flex-col gap-2">
        {SECTIONS.map((s) => (
          <li key={s.id} className="flex items-baseline justify-between gap-3">
            <span className="text-xs text-fg opacity-75">{s.title}</span>
            <span className="shrink-0 font-mono text-[9px] text-fg-muted opacity-40">
              {s.items.length} items
            </span>
          </li>
        ))}
      </ul>
    </LabPanel>
  );
}

function SectionView({ section }: { section: ShelfSection }) {
  return (
    <LabPanel title={section.title}>
      <ul className="flex flex-col gap-2.5">
        {section.items.map((item, i) => (
          <li key={i}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[11px] font-medium text-fg opacity-80">
                {item.primary}
              </span>
              <span className="shrink-0 font-mono text-[9px] text-fg-muted opacity-40">
                {item.secondary}
              </span>
            </div>
            <p className="text-[10px] leading-snug text-fg-muted opacity-50">
              {item.note}
            </p>
          </li>
        ))}
      </ul>
    </LabPanel>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export function LabShelfPanel() {
  const shelfPanel = useLabStore((s) => s.shelfPanel);

  if (shelfPanel === "overview") return <Overview />;

  const section = SECTIONS.find((s) => s.id === shelfPanel);
  if (!section) return null;

  return <SectionView section={section} />;
}
