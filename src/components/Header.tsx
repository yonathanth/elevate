"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import JoinButton from "./JoinButton";
import { lockScroll } from "@/lib/scroll";
import { NAV } from "@/lib/nav";

export default function Header() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    // Close if the viewport grows past the mobile breakpoint
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = () => mq.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    lockScroll(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
      lockScroll(false);
    };
  }, [menuOpen]);

  const isActive = (href: string) => {
    const [path, anchor = ""] = href.split("#");
    if (path !== "/") return pathname.startsWith(path);
    return pathname === "/" && hash === (anchor ? `#${anchor}` : "");
  };
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`page-width fixed inset-x-0 top-0 z-40 transition-[padding] duration-500 ${
        scrolled ? "py-3" : "pb-3 pt-6 md:pt-8"
      }`}
    >
      {/* Glass bar that fades in once the page scrolls. Kept on its own layer:
          a backdrop-filter on <header> itself would trap the fixed mobile menu inside it. */}
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 border-b border-white/10 bg-background/55 min-[1440px]:rounded-b-2xl min-[1440px]:border-x backdrop-blur-xl backdrop-saturate-150 transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Padding matches the sections so edges line up. No z-index here,
          so the logo and toggle can still sit above the mobile menu. */}
      <div className="flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-14 lg:gap-24">
          <Link
            href="/"
            onClick={closeMenu}
            className="relative z-50 text-xl font-semibold lowercase tracking-tight"
          >
            elevate
          </Link>
          <nav className="hidden gap-8 text-[15px] font-medium md:flex">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative py-1 transition-colors hover:text-white ${
                    active ? "text-white" : "text-white/70"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 origin-center rounded-full bg-brand transition-transform duration-300 group-hover:scale-x-100 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <JoinButton size="sm" />
          </div>

          {/* Mobile menu toggle: stays above the overlay so it doubles as the close button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="relative z-50 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/60 backdrop-blur-md md:hidden"
          >
            <span
              className={`absolute h-0.5 w-4 rounded-full bg-white transition-transform duration-300 ${
                menuOpen ? "rotate-45" : "-translate-y-[3px]"
              }`}
            />
            <span
              className={`absolute h-0.5 w-4 rounded-full bg-white transition-transform duration-300 ${
                menuOpen ? "-rotate-45" : "translate-y-[3px]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed inset-0 z-40 flex flex-col bg-background/90 px-6 pb-10 pt-28 backdrop-blur-xl transition-opacity duration-500 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2">
          {NAV.map((item, i) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                aria-current={active ? "page" : undefined}
                style={{
                  transitionDelay: menuOpen ? `${120 + i * 70}ms` : "0ms",
                }}
                className={`flex items-center gap-4 border-b border-white/10 py-4 text-3xl font-semibold tracking-tight transition-all duration-500 ease-out ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                } ${active ? "text-brand" : "text-white"}`}
              >
                <span className="text-xs font-medium tabular-nums text-white/40">
                  0{i + 1}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div
          onClick={closeMenu}
          style={{
            transitionDelay: menuOpen ? `${120 + NAV.length * 70}ms` : "0ms",
          }}
          className={`mt-auto transition-all duration-500 ease-out ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <JoinButton size="lg" fullWidth />
          <p className="mt-6 text-center text-sm text-white/50">
            The biggest gym in Ethiopia &amp; East Africa
          </p>
        </div>
      </div>
    </header>
  );
}
