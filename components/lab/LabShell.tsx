// Atmospheric full-viewport wrapper for the lab experience.
// Phase 07: the 3D canvas mounts here as an absolute background layer;
// the UI overlay sits on top via z-10.
export function LabShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-bg">
      {/* Vignette — darkens edges for atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 35%, rgba(8,12,18,0.7) 100%)",
        }}
      />

      {/* UI overlay — sits above the future 3D canvas */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12">
        {children}
      </div>
    </div>
  );
}
