import SiteNav from "./SiteNav";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <SiteNav />
      {/* pt-14 offsets the fixed 56px nav header */}
      <main className="flex flex-1 flex-col pt-14">{children}</main>
    </div>
  );
}
