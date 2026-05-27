import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab — Kevin Logan",
  description: "An interactive portfolio room experience. Late at night. The monitor is still on.",
};

export default function LabPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-muted">
        /lab
      </p>

      <h1 className="mb-6 text-3xl font-bold tracking-tight text-fg">
        The Lab
      </h1>

      <p className="mb-4 max-w-sm text-lg text-fg-muted">
        It&apos;s late. The monitor is still on.
      </p>

      <p className="mb-3 font-mono text-sm text-fg-muted opacity-60">
        What do you want to do?
      </p>

      <div className="my-8 h-px w-16 bg-border" />

      <p className="mb-10 font-mono text-xs text-fg-muted opacity-40">
        Interactive room experience — building now (Phase 05+)
      </p>

      <Link
        href="/"
        className="font-mono text-sm text-fg-muted transition-colors hover:text-fg"
      >
        ← Back to home
      </Link>
    </div>
  );
}
