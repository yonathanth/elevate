import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import JoinButton from "@/components/JoinButton";
import VideoTour from "@/components/VideoTour";
import Facilities from "@/components/Facilities";
import Offerings from "@/components/Offerings";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <div className="relative flex min-h-svh flex-col overflow-hidden">
        {/* Background */}
        <Image
          src="/hero-gym.jpg"
          alt="Athlete gripping a loaded barbell for a deadlift"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center] brightness-[0.6] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent" />

        <Header />

        {/* Content column: background stays full-bleed, content is capped and centered */}
        <div className="page-width relative z-10 flex flex-1 flex-col">
          {/* Mobile & tablet: play button centered just above the headline */}
          <div className="flex flex-1 items-end justify-center md:hidden">
            <VideoTour />
          </div>

          {/* Hero copy */}
          <section className="relative mt-auto px-6 pb-12 pt-8 md:px-12 md:pb-16 md:pt-24">
            {/* --big drives both the BIGGEST size and the play button's vertical
                position, so the button stays centered on that line at every size */}
            <div className="relative [--big:clamp(4rem,11vw,8.5rem)]">
              <h1 className="rise uppercase">
                <span className="block text-base font-medium tracking-[0.3em] text-white/70 sm:text-lg">
                  The
                </span>
                <span className="gritty-gradient-text mt-1 block py-[0.04em] font-display text-[length:var(--big)] leading-[0.95] tracking-wide">
                  Biggest
                </span>
                <span className="mt-2 block text-[clamp(1.3rem,3.4vw,2.6rem)] font-bold leading-tight tracking-tight">
                  Gym in Ethiopia &amp; East Africa
                </span>
              </h1>

              {/* Desktop: beside BIGGEST. Top = "The" line height + its gap, then half the
                  BIGGEST line (0.95 leading + 0.08em padding) */}
              <div className="absolute right-10 top-[calc(2rem_+_var(--big)*0.515)] hidden -translate-y-1/2 scale-[1.15] md:block lg:right-16">
                <VideoTour />
              </div>
            </div>

            <div className="flex items-end justify-between gap-8">
              <div className="max-w-3xl">
                <p
                  className="rise mt-5 max-w-md text-[15px] leading-relaxed text-white/70 sm:text-base"
                  style={{ animationDelay: "120ms" }}
                >
                  3,612 m² of premium equipment, coached classes and recovery
                  spaces, all built to take your training to the next level.
                </p>
                <div
                  className="rise mt-8 flex items-center gap-8"
                  style={{ animationDelay: "240ms" }}
                >
                  <JoinButton />
                  <Link
                    href="#offerings"
                    className="text-[15px] text-white/90 underline-offset-4 hover:text-brand hover:underline"
                  >
                    See our offerings
                  </Link>
                </div>
              </div>

              <a
                href="#facilities"
                className="hidden items-center gap-2 text-[15px] text-white/80 transition-colors hover:text-brand md:flex"
              >
                Scroll down
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>
            </div>
          </section>
        </div>
      </div>

      <Facilities />
      <Offerings />
      <Contact />
      <Footer />
    </main>
  );
}
