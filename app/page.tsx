import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kevin Logan — Product Designer",
};

const focusAreas = [
  "Platform Systems",
  "Developer Tools",
  "AI / ML / NLP Interaction",
  "Human-in-the-Loop Design",
  "Prototype-Driven Strategy",
  "Design Leadership",
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="mb-8 font-mono text-xs uppercase tracking-widest text-fg-muted">
        Staff Product Designer
      </p>

      <h1 className="mb-6 text-5xl font-bold tracking-tight text-fg">
        Kevin Logan
      </h1>

      <p className="mb-12 max-w-xl text-xl leading-relaxed text-fg-muted">
        From matchmaking systems to localization platforms, I design the
        infrastructure that powers modern digital ecosystems.
      </p>

      <ul className="mb-14 flex flex-wrap justify-center gap-2" role="list">
        {focusAreas.map((area) => (
          <li
            key={area}
            className="rounded-full border border-border px-3 py-1.5 font-mono text-xs text-fg-muted"
          >
            {area}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/lab"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-fg transition-opacity hover:opacity-85"
        >
          Enter Lab →
        </Link>
        <Link
          href="/work"
          className="rounded-full border border-border px-6 py-3 text-sm text-fg transition-colors hover:border-fg-muted"
        >
          View Work
        </Link>
      </div>

      <p className="mt-16 font-mono text-xs text-fg-muted opacity-40">
        /lab is an optional interactive room experience
      </p>
    </div>
  );
}
