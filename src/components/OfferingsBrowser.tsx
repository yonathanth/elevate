"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/offerings";

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

export default function OfferingsBrowser() {
  const [active, setActive] = useState(CATEGORIES[0].id);
  const pillsRef = useRef<HTMLDivElement>(null);

  // Highlight the category whose section is crossing the upper part of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    CATEGORIES.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Keep the active pill in view on the mobile bar
  useEffect(() => {
    const bar = pillsRef.current;
    const pill = bar?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (bar && pill)
      bar.scrollTo({ left: pill.offsetLeft - 24, behavior: "smooth" });
  }, [active]);

  return (
    <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
      {/* Mobile: sticky category pills under the header */}
      <div className="sticky top-16 z-30 -mx-6 border-b border-white/10 bg-background/80 backdrop-blur-xl lg:hidden">
        <div
          ref={pillsRef}
          className="flex gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              data-id={c.id}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === c.id
                  ? "bg-gradient-brand text-black"
                  : "border border-white/10 text-white/70 hover:text-white"
              }`}
            >
              {c.title}
            </a>
          ))}
        </div>
      </div>

      {/* Desktop: sticky sidebar */}
      <aside className="hidden lg:block">
        <nav className="sticky top-28" aria-label="Offering categories">
          <ul className="space-y-1">
            {CATEGORIES.map((c) => {
              const isActive = active === c.id;
              return (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                      isActive
                        ? "bg-white/5 text-white"
                        : "text-white/55 hover:text-white"
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-brand transition-transform duration-300 ${
                        isActive ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                    {c.title}
                    <span className="text-xs tabular-nums text-white/35">
                      {c.items.length}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Categories */}
      <div className="mt-12 space-y-24 lg:mt-0 lg:space-y-32">
        {CATEGORIES.map((c) => (
          <section
            key={c.id}
            id={c.id}
            className="scroll-mt-36 lg:scroll-mt-28"
          >
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {c.title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60 sm:text-[15px]">
              {c.description}
            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-12">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl lg:col-span-5 lg:aspect-[4/5]">
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className={`object-cover ${c.imagePosition ?? "object-center"}`}
                />
              </div>

              <ul className="border-t border-white/10 lg:col-span-7">
                {c.items.map((item, i) => (
                  <li key={item.name}>
                    <Link
                      // "Book now" → join showing this offering; custom CTAs (shops) → contact
                      href={
                        item.cta
                          ? `/contact?interest=${c.id}`
                          : `/join?interest=${c.id}&offering=${encodeURIComponent(item.name)}`
                      }
                      className="group flex items-center gap-4 border-b border-white/10 py-5 sm:gap-6"
                    >
                      <span className="w-6 shrink-0 text-xs tabular-nums text-white/35">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-brand sm:text-xl">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-white/55">
                          {item.description}
                        </p>
                      </div>
                      <span className="hidden shrink-0 text-sm text-white/55 transition-colors group-hover:text-white sm:inline">
                        {item.cta ?? "Book now"}
                      </span>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-gradient-brand group-hover:text-black">
                        <ArrowIcon />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
