import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArrowButton from "@/components/ArrowButton";
import { ADDRESS, MAPS_URL } from "@/lib/contact";
import { OFFERING_COUNT } from "@/lib/offerings";

export const metadata: Metadata = {
  title: "About — Elevate Gym",
  description:
    "Elevate is the biggest gym in Ethiopia and East Africa: 3,612 m² of training floor at Mount Moriah Mall in Ayat, open 24/7.",
};

const PILLARS = [
  {
    title: "Everything under one roof",
    text: "Train, fight, stretch, recover, eat well and look good, without ever leaving the building.",
  },
  {
    title: "Never closed",
    text: "Early riser or night owl, the doors are open 24 hours a day, 7 days a week.",
  },
  {
    title: "Built for every level",
    text: "Whether it's your first session or your next PR, there's space, equipment and a class for you.",
  },
];

// Bento tour of the spaces: first tile is the large feature.
const SPACES = [
  {
    title: "Strength floor",
    text: "Racks, platforms, benches and free weights.",
    image: "/facilities/benches.jpg",
  },
  { title: "Cardio deck", text: "The latest machines in the sector.", image: "/facilities/cardio.jpg" },
  { title: "Studios", text: "Hot Pilates, yoga, Zumba, aerobics.", image: "/offerings/pilates-yoga.jpg" },
  { title: "Combat zone", text: "MMA, kickboxing, Muay Thai, boxing.", image: "/offerings/combat.jpg" },
  { title: "Spa & recovery", text: "Massage, Moroccan bath, physio.", image: "/offerings/spa.jpg" },
];

// Placeholder names and photos — replace with the real team.
const TEAM = [
  { name: "Dawit Bekele", role: "Head coach", image: "/team/head-coach.jpg" },
  { name: "Yonas Girma", role: "Strength & conditioning", image: "/team/strength-coach.jpg" },
  { name: "Abel Haile", role: "Combat sports coach", image: "/team/combat-coach.jpg" },
  { name: "Hanna Mekonnen", role: "Hyrox & circuit coach", image: "/team/conditioning-coach.jpg" },
];

export default function AboutPage() {
  return (
    <main>
      <Header />

      {/* Intro */}
      <section className="page-width px-6 pb-12 pt-36 md:px-12 md:pb-16 md:pt-44">
        <h1>
          <span className="rise block text-4xl font-semibold tracking-tight sm:text-5xl">
            About Elevate.
          </span>
          <span
            className="rise text-gradient mt-3 block py-[0.04em] font-display text-[clamp(3.5rem,9vw,7rem)] uppercase leading-[0.95] tracking-wide"
            style={{ animationDelay: "100ms" }}
          >
            Built to raise the bar.
          </span>
        </h1>
        <p
          className="rise mt-6 max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-base"
          style={{ animationDelay: "200ms" }}
        >
          Elevate is the biggest gym in Ethiopia and East Africa: 3,612 m² of training floor at
          Mount Moriah Mall in Ayat, open around the clock.
        </p>
      </section>

      {/* Wide image */}
      <section className="page-width px-6 md:px-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl sm:aspect-[21/9]">
          <Image
            src="/facilities/gym-floor.jpg"
            alt="Wide view of the gym floor with racks, benches and turf lane"
            fill
            priority
            sizes="(min-width: 1440px) 1344px, 100vw"
            className="object-cover object-[center_60%]"
          />
        </div>
      </section>

      {/* Story */}
      <section className="page-width px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:col-span-5">
            More than a gym. A place to become your strongest self.
          </h2>
          <div className="space-y-5 text-[15px] leading-relaxed text-white/65 sm:text-base lg:col-span-7">
            <p>
              Elevate brings together everything it takes to train well. A full floor of
              free weights, racks and the latest cardio machines. Studios for Hot Pilates, yoga,
              Zumba and aerobics. A combat area for MMA, kickboxing, Muay Thai and boxing.
            </p>
            <p>
              And because getting stronger doesn&apos;t stop when the workout does, there&apos;s a
              full spa, physiotherapy and red light therapy for recovery, meal prep supported by
              AI to keep your nutrition on track, and an in-house salon, supplement shop and
              sportswear store.
            </p>
            <p className="text-white/85">
              {OFFERING_COUNT} offerings. One address. Open whenever you are.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="page-width px-6 md:px-12">
        <ol className="grid gap-3 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <li key={p.title} className="rounded-3xl border border-white/10 p-6 sm:p-8">
              <span className="text-gradient font-display text-5xl">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Facilities */}
      <section className="page-width px-6 pt-24 md:px-12 md:pt-32">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Inside Elevate.</h2>
          <p className="max-w-sm text-[15px] leading-relaxed text-white/60">
            Every space you need to train, fight and recover, across 3,612 m².
          </p>
        </div>

        <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] lg:auto-rows-[240px] lg:grid-cols-4">
          {SPACES.map((s, i) => (
            <figure
              key={s.title}
              className={`group relative overflow-hidden rounded-3xl ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={s.image}
                alt=""
                fill
                sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className={`font-semibold tracking-tight ${i === 0 ? "text-2xl sm:text-3xl" : "text-base sm:text-lg"}`}>
                  {s.title}
                </p>
                <p className="mt-1 hidden text-sm text-white/65 sm:block">{s.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="page-width px-6 pt-24 md:px-12 md:pt-32">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Meet the team.</h2>
          <p className="max-w-sm text-[15px] leading-relaxed text-white/60">
            The coaches who&apos;ll push you further than you&apos;d go on your own.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {TEAM.map((m) => (
            <li key={m.name} className="group relative aspect-[3/4] overflow-hidden rounded-3xl">
              <Image
                src={m.image}
                alt={`${m.name}, ${m.role}`}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className="text-base font-semibold tracking-tight sm:text-lg">{m.name}</p>
                <p className="mt-0.5 text-xs text-brand sm:text-sm">{m.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="page-width px-6 py-24 md:px-12 md:py-32">
        <div className="texture-green flex flex-col gap-8 rounded-3xl p-7 text-black sm:p-10 md:flex-row md:items-end md:justify-between lg:p-12">
          <div className="relative">
            <h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] uppercase leading-[0.9] tracking-wide">
              See it for yourself.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-black/70 sm:text-base">
              {ADDRESS.lines[0]}, {ADDRESS.lines[1]}. Walk in any hour, any day.
            </p>
          </div>
          <div className="relative flex shrink-0 flex-wrap items-center gap-6">
            <ArrowButton href="/join" variant="dark">
              Join now
            </ArrowButton>
            <Link
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-semibold underline-offset-4 hover:underline"
            >
              Get directions
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
