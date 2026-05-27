interface LabBreadcrumbProps {
  // Slash-delimited path string: "Lab / Desk / Laptop"
  path: string;
}

export function LabBreadcrumb({ path }: LabBreadcrumbProps) {
  // Derive a readable aria-label from the path for screen readers.
  const ariaLabel = `Current location: ${path.replace(/\s*\/\s*/g, ", ")}`;

  return (
    <p
      aria-label={ariaLabel}
      className="mb-10 w-full max-w-xs font-mono text-[10px] uppercase tracking-widest text-fg-muted opacity-40"
    >
      {path}
    </p>
  );
}
