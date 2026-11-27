"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { brand } from "@/lib/design/tokens";
import { cn } from "@/lib/utils/cn";

/** Academy marketing nav — book routes use BookShell instead. */
const navItems = [
  { href: "/", label: "בית" },
  { href: "/method", label: "השיטה" },
  { href: "/textbook", label: "LOOKBACK" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header relative z-40 border-b border-[var(--zz-line)] bg-[var(--zz-void)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex flex-col items-start leading-none"
          aria-label={brand.fullName}
        >
          <span className="text-lg font-bold tracking-[0.18em] text-[var(--zz-ink)] transition-colors group-hover:text-[var(--zz-cyan)]">
            {brand.name}
          </span>
          <span className="mt-0.5 text-[10px] font-medium tracking-[0.22em] text-[var(--zz-muted)] uppercase">
            Trading Academy
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="ניווט ראשי"
        >
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-sm px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-[var(--zz-cyan)]"
                    : "text-[var(--zz-muted)] hover:text-[var(--zz-ink)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--zz-line)] text-[var(--zz-ink)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "סגור תפריט" : "פתח תפריט"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-[var(--zz-line)] bg-[var(--zz-abyss)] px-4 py-3 md:hidden"
          aria-label="ניווט נייד"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-sm px-3 py-2.5 text-sm text-[var(--zz-ink)] hover:bg-[var(--zz-panel)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
