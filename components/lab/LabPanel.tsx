"use client";

interface LabPanelProps {
  title: string;
  description?: string;
  note?: string;
  children?: React.ReactNode;
  onBack?: () => void;
}

export function LabPanel({ title, description, note, children, onBack }: LabPanelProps) {
  return (
    <div className="mt-5 w-full rounded-lg border border-border bg-surface/60 px-4 py-4 backdrop-blur-sm">
      {onBack && (
        <button
          onClick={onBack}
          className="mb-2 block font-mono text-[10px] text-fg-muted opacity-40 transition-opacity hover:opacity-70"
        >
          ← overview
        </button>
      )}

      <p className="mb-1 text-xs font-semibold tracking-wide text-fg opacity-50">
        {title}
      </p>

      {description && (
        <p className="text-xs leading-relaxed text-fg-muted opacity-50">
          {description}
        </p>
      )}

      {children && <div className="mt-3">{children}</div>}

      {note && (
        <p className="mt-3 font-mono text-[10px] text-fg-muted opacity-30">
          {note}
        </p>
      )}
    </div>
  );
}
