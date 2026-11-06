"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowButton from "./ArrowButton";

const OFFERINGS = [
  {
    slug: "spa",
    category: "recovery",
    title: "Full spa & massage",
    description:
      "Unwind after training with a traditional Moroccan bath for couples and a full menu of relaxing massages.",
    image: "spa",
    position: "object-[40%_center]",
  },
  {
    slug: "combat",
    category: "combat",
    title: "Combat sports",
    description:
      "MMA, kickboxing, Muay Thai and boxing classes for every level, from your first jab to fight-ready.",
    image: "combat",
    position: "object-[60%_center]",
  },
  {
    slug: "pilates-yoga",
    category: "studio",
    title: "Hot Pilates & yoga",
    description:
      "Build strength, balance and flexibility in heated Pilates and calming yoga sessions.",
    image: "pilates-yoga",
    position: "object-[55%_center]",
  },
  {
    slug: "hyrox",
    category: "training",
    title: "Hyrox & Cross Fitness",
    description:
      "High-intensity functional training built to push your endurance, power and race-day fitness.",
    image: "hyrox",
    position: "object-center",
  },
];

const ALL_OFFERINGS_HREF = "/offerings";

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function MoreDetails() {
  return (
    <span className="glass mt-5 flex items-center justify-between rounded-full py-1.5 pl-4 pr-1.5 text-sm">
      More details
      <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 transition-colors group-hover:bg-brand group-hover:text-black">
        <Chevron />
      </span>
    </span>
  );
}

export default function Offerings() {
  const [active, setActive] = useState(0);

  return (
    <section id="offerings" className="page-width scroll-mt-8 px-6 py-24 md:px-12 md:py-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            More than a gym.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-white/65 sm:text-[15px]">
            Fight, flow, recover and refuel. From combat classes to a full spa,
            everything you need lives under one roof.
          </p>
        </div>
        <div className="shrink-0">
          <ArrowButton href={ALL_OFFERINGS_HREF} variant="glass">
            See all offerings
          </ArrowButton>
        </div>
      </div>

      {/* Desktop: expanding cards — hovered/focused card widens and reveals its description */}
      <div className="mt-12 hidden h-[540px] gap-3 md:flex">
        {OFFERINGS.map((o, i) => {
          const isActive = active === i;
          return (
            <Link
              key={o.slug}
              href={`${ALL_OFFERINGS_HREF}#${o.category}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`group relative min-w-0 overflow-hidden rounded-3xl transition-[flex-grow] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                isActive ? "grow-[2.6]" : "grow"
              }`}
              style={{ flexBasis: 0 }}
            >
              <Image
                src={`/offerings/${o.image}.jpg`}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className={`object-cover transition-transform duration-700 group-hover:scale-105 ${o.position}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-2xl font-semibold leading-tight tracking-tight lg:text-3xl">
                  {o.title}
                </h3>
                {/* Description slides open on the active card; others show the button */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ${
                    isActive ? "grid-rows-[1fr] opacity-100 delay-200" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="overflow-hidden">
                    <span className="block max-w-md pt-3 text-sm leading-relaxed text-white/75">
                      {o.description}
                    </span>
                  </p>
                </div>
                {!isActive && <MoreDetails />}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile: swipeable cards */}
      <div className="-mx-6 mt-10 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
        {OFFERINGS.map((o) => (
          <Link
            key={o.slug}
            href={`${ALL_OFFERINGS_HREF}#${o.category}`}
            className="group relative h-[440px] w-[80%] shrink-0 snap-start overflow-hidden rounded-3xl"
          >
            <Image
              src={`/offerings/${o.image}.jpg`}
              alt=""
              fill
              sizes="80vw"
              className={`object-cover ${o.position}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="text-2xl font-semibold leading-tight tracking-tight">{o.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{o.description}</p>
              <MoreDetails />
            </div>
          </Link>
        ))}
        {/* Trailing spacer: browsers drop right padding in overflow rows */}
        <div aria-hidden className="w-3 shrink-0" />
      </div>
    </section>
  );
}
