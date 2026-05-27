import Link from "next/link";
import type { Metadata } from "next";
import { LabStoreDebug } from "@/components/lab/LabStoreDebug";

export const metadata: Metadata = {
  title: "Lab — Kevin Logan",
  description:
    "An interactive portfolio room experience. Late at night. The monitor is still on.",
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

      <p className="font-mono text-sm text-fg-muted opacity-60">
        What do you want to do?
      </p>

      <LabStoreDebug />

      <div className="mt-10">
        <Link
          href="/"
          className="font-mono text-sm text-fg-muted transition-colors hover:text-fg"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
