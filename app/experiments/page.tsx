import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiments — Kevin Logan",
  description: "Playable prototypes and system experiments.",
};

const experiments = [
  { name: "Multiplayer Air Hockey", tag: "matchmaking · real-time · cosmetics" },
  { name: "NPC Simulation System", tag: "AI · behavior · rules" },
  { name: "Godot Prototype", tag: "game engine · interaction" },
  { name: "WebGL Interaction Prototype", tag: "web · 3D · browser" },
  { name: "Star Wake", tag: "prototype · systems" },
  { name: "Ninja Platformer", tag: "physics · game" },
  { name: "Space Rover Prototype", tag: "simulation · prototype" },
];

export default function ExperimentsPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-muted">
        /experiments
      </p>

      <h1 className="mb-4 text-3xl font-bold tracking-tight text-fg">
        Experiments
      </h1>

      <p className="mb-10 max-w-sm text-fg-muted">
        Playable systems, game prototypes, and interaction experiments.
        Full experiment cards building in Phase 17+.
      </p>

      <ul className="mb-10 flex flex-col items-center gap-3" role="list">
        {experiments.map(({ name, tag }) => (
          <li key={name} className="flex flex-col items-center gap-0.5">
            <span className="text-sm text-fg opacity-70 font-mono">{name}</span>
            <span className="text-xs text-fg-muted opacity-40">{tag}</span>
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
