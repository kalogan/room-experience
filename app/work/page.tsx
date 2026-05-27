import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Kevin Logan",
  description: "Professional work, platform systems, and case studies.",
};

const projects = [
  "Roblox Localization Platform",
  "Roblox Replay System",
  "TTS / Captioning / API-first Direction",
  "Feedback Mode",
  "NPC Bots Management",
  "Platform Infrastructure (NDA)",
  "Crate & Barrel Sectional Configurator",
];

export default function WorkPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-muted">
        /work
      </p>

      <h1 className="mb-4 text-3xl font-bold tracking-tight text-fg">Work</h1>

      <p className="mb-10 max-w-sm text-fg-muted">
        Platform systems, developer tools, and AI interaction design.
        Case studies building in Phase 12+.
      </p>

      <ul className="mb-10 flex flex-col items-center gap-2 text-sm text-fg-muted" role="list">
        {projects.map((p) => (
          <li key={p} className="font-mono opacity-60">
            {p}
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="font-mono text-sm text-fg-muted transition-colors hover:text-fg"
      >
        ← Back to home
      </Link>
    </div>
  );
}
