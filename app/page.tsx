export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <p className="text-xs font-mono tracking-widest text-fg-muted uppercase mb-6">
        Kevin Logan — Portfolio
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-fg mb-4 text-center">
        Room Experience
      </h1>
      <p className="text-lg text-fg-muted mb-10 text-center max-w-sm">
        An interactive portfolio room is being built here.
      </p>
      <div className="flex items-center gap-3">
        <span className="inline-flex h-px w-8 bg-border" />
        <span className="text-sm font-mono text-fg-muted">/lab — coming soon</span>
        <span className="inline-flex h-px w-8 bg-border" />
      </div>
    </div>
  );
}
