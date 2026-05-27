"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/history", label: "History" },
  { href: "/experiments", label: "Experiments" },
  { href: "/simulator", label: "Simulator" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-sm">
      <nav
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6"
        aria-label="Site navigation"
      >
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-fg transition-opacity hover:opacity-75"
        >
          Kevin Logan
        </Link>

        <div className="flex items-center gap-1 sm:gap-4">
          <ul className="hidden items-center gap-1 sm:flex" role="list">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`rounded px-3 py-1.5 text-sm transition-colors ${
                    pathname === href
                      ? "text-fg"
                      : "text-fg-muted hover:text-fg"
                  }`}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/lab"
            className="ml-2 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-fg transition-opacity hover:opacity-85"
          >
            Enter Lab
          </Link>
        </div>
      </nav>
    </header>
  );
}
