import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArrowButton from "@/components/ArrowButton";
import OfferingsBrowser from "@/components/OfferingsBrowser";
import { CATEGORIES, OFFERING_COUNT } from "@/lib/offerings";

export const metadata: Metadata = {
  title: "Offerings — Elevate Gym",
  description:
    "Training, studio classes, combat sports, spa and recovery, nutrition and beauty, all under one roof at Elevate Gym.",
};

export default function OfferingsPage() {
  return (
    <main>
      <Header />

      {/* Intro */}
      <section className="page-width px-6 pb-16 pt-36 md:px-12 md:pb-20 md:pt-44">
        <h1>
          <span className="rise block text-4xl font-semibold tracking-tight sm:text-5xl">
            Train, fight, recover.
          </span>
          <span
            className="rise text-gradient mt-3 block py-[0.04em] font-display text-[clamp(3.5rem,9vw,7rem)] uppercase leading-[0.95] tracking-wide"
            style={{ animationDelay: "100ms" }}
          >
            All under one roof.
          </span>
        </h1>
        <p
          className="rise mt-6 max-w-lg text-[15px] leading-relaxed text-white/65 sm:text-base"
          style={{ animationDelay: "200ms" }}
        >
          {OFFERING_COUNT} offerings across {CATEGORIES.length} categories at the biggest gym in
          Ethiopia &amp; East Africa.
        </p>
      </section>

      <div className="page-width px-6 md:px-12">
        <OfferingsBrowser />
      </div>

      {/* Closing CTA */}
      <section className="page-width px-6 py-24 md:px-12 md:py-32">
        <div className="texture-green flex flex-col gap-8 rounded-3xl p-7 text-black sm:p-10 md:flex-row md:items-end md:justify-between lg:p-12">
          <div className="relative">
            <h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] uppercase leading-[0.9] tracking-wide">
              Find your fit.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-black/70 sm:text-base">
              Not sure where to start? Talk to our team and we&apos;ll help you build the right
              mix of training, classes and recovery.
            </p>
          </div>
          <div className="relative shrink-0">
            <ArrowButton href="/contact" variant="dark">
              Talk to us
            </ArrowButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
