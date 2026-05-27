import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "History — Kevin Logan",
  description: "Career timeline, milestones, talks, partnerships, and community involvement.",
};

export default function HistoryPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-muted">
        /history
      </p>

      <h1 className="mb-4 text-3xl font-bold tracking-tight text-fg">History</h1>

      <p className="mb-10 max-w-sm text-fg-muted">
        Career timeline, milestones, talks, partnerships, and community involvement.
        Full timeline building in Phase 20+.
      </p>

      <div className="mb-10 flex flex-col items-center gap-2 font-mono text-sm text-fg-muted opacity-50">
        <span>Work eras</span>
        <span>Community involvement</span>
        <span>Talks & partnerships</span>
        <span>Conferences & experiments</span>
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
