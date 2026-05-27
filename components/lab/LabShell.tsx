// z-index layers used in LabShell:
//   z-0   — 3D canvas (background)
//   z-[5] — vignette (above canvas, below UI)
//   z-10  — main UI overlay (scene copy, command menu)
//   z-20  — utility controls (3D toggle, sound toggle in Phase 22)

interface LabShellProps {
  children: React.ReactNode;
  // Absolute background layer — receives the lazy-loaded 3D canvas.
  scene3D?: React.ReactNode;
  // Absolute bottom-right overlay — receives utility toggles.
  controls?: React.ReactNode;
}

export function LabShell({ children, scene3D, controls }: LabShellProps) {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-bg">
      {/* 3D canvas background */}
      {scene3D && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0"
        >
          {scene3D}
        </div>
      )}

      {/* Vignette — darkens edges regardless of 2D/3D mode */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 35%, rgba(8,12,18,0.7) 100%)",
        }}
      />

      {/* Utility controls (3D toggle, sound toggle, etc.) */}
      {controls && (
        <div className="absolute bottom-5 right-5 z-20 flex items-center gap-3">
          {controls}
        </div>
      )}

      {/* Main UI overlay — pointer-events-none lets clicks pass through to canvas;
          interactive children restore pointer-events-auto individually */}
      <div className="pointer-events-none relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12">
        {children}
      </div>
    </div>
  );
}
