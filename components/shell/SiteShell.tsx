export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      {/* nav slot — added in Phase 03 */}
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
