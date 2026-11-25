"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { Container, Logo } from "@/components/ui/primitives";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/services";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menus on route change (adjust state during render, no effect needed)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setMenuOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [menuOpen]);

  const isActive = (href: string) => href !== "/#industries" && pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[var(--header-h)] border-b bg-stone transition-[border-color,box-shadow] duration-200",
        scrolled ? "border-granite/12 shadow-[0_8px_24px_-18px_rgb(20_24_26/0.35)]" : "border-transparent",
      )}
    >
      <Container className="flex h-full items-center justify-between gap-6">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="services-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className={cn(
                "inline-flex h-10 items-center gap-1 rounded-[4px] px-3 text-[0.94rem] font-medium hover:bg-granite/[0.05]",
                isActive("/services/") && "text-trail",
              )}
            >
              Services
              <ChevronDown aria-hidden className={cn("size-4 transition-transform duration-200", menuOpen && "rotate-180")} />
            </button>
            <div
              id="services-menu"
              className={cn(
                "absolute left-1/2 top-[calc(100%+10px)] w-[640px] -translate-x-1/2 origin-top rounded-[var(--radius-card)] border border-granite/12 bg-paper p-3 shadow-[0_24px_60px_-24px_rgb(20_24_26/0.4)]",
                "transition-[opacity,transform] duration-200 ease-[var(--ease-out)]",
                menuOpen ? "visible scale-100 opacity-100" : "invisible scale-[0.98] opacity-0",
              )}
            >
              <ul className="grid grid-cols-2 gap-1">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}/`}
                      className="group flex gap-3 rounded-[4px] p-3 hover:bg-stone"
                    >
                      <span className="coord mt-0.5 w-9 shrink-0 text-trail">{s.code}</span>
                      <span>
                        <span className="block text-[0.94rem] font-semibold leading-tight">{s.shortTitle}</span>
                        <span className="mt-1 block text-[0.84rem] leading-snug text-muted">{s.summary}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/services/"
                className="mt-2 flex items-center justify-between rounded-[4px] border-t border-granite/10 px-3 pb-1 pt-3 text-sm font-semibold hover:text-trail"
              >
                Compare all six services and find the right test
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
          {nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex h-10 items-center rounded-[4px] px-3 text-[0.94rem] font-medium hover:bg-granite/[0.05]",
                isActive(item.href) && "text-trail",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={site.primaryCta.href}
            className="hidden min-h-11 items-center rounded-[5px] bg-trail px-4 text-[0.92rem] font-semibold text-white transition-colors duration-150 hover:bg-[#b82214] active:scale-[0.97] sm:inline-flex"
          >
            {site.primaryCta.label}
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-[5px] border border-granite/20 lg:hidden"
          >
            {mobileOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto bg-stone lg:hidden",
          "transition-[opacity,transform] duration-200 ease-[var(--ease-out)]",
          mobileOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
        )}
      >
        <Container className="flex min-h-full flex-col gap-8 py-6">
          <div>
            <p className="coord mb-3 text-muted">Services</p>
            <ul className="divide-y divide-granite/10 border-y border-granite/10">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`} className="flex items-baseline gap-3 py-3.5">
                    <span className="coord w-10 text-trail">{s.code}</span>
                    <span className="text-lg font-semibold">{s.shortTitle}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="space-y-1">
            {[{ label: "All services", href: "/services/" }, ...nav.slice(1)].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-2 text-2xl font-bold tracking-[-0.03em]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={site.primaryCta.href}
            className="mt-auto inline-flex min-h-13 items-center justify-center rounded-[5px] bg-trail px-5 text-base font-semibold text-white"
          >
            {site.primaryCta.label}
          </Link>
        </Container>
      </div>
    </header>
  );
}
