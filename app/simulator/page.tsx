import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulator — Kevin Logan",
  description: "Matchmaking tradeoff and AI localization simulators.",
};

export default function SimulatorPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-muted">
        /simulator
      </p>

      <h1 className="mb-4 text-3xl font-bold tracking-tight text-fg">
        Simulator
      </h1>

      <p className="mb-10 max-w-sm text-fg-muted">
        Interactive tradeoff simulators for matchmaking systems and AI localization.
        Building in Phase 24+.
      </p>

      <div className="mb-10 flex flex-col items-center gap-4 font-mono text-sm text-fg-muted opacity-50">
        <span>Matchmaking Tradeoff Simulator</span>
        <span className="text-xs opacity-60">
          queue time · skill delta · match quality
        </span>
        <div className="h-px w-8 bg-border" />
        <span>AI / Localization Simulator</span>
        <span className="text-xs opacity-60">
          confidence threshold · human review rate · throughput
        </span>
      </div>

      <Link
        href="/"
        className="font-mono text-sm text-fg-muted transition-colors hover:text-fg"
      >
        ← Back to home
      </Link>
    </div>
  );
}
