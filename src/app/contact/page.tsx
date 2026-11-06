import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArrowButton from "@/components/ArrowButton";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import { ADDRESS, MAPS_EMBED, MAPS_URL, PHONES } from "@/lib/contact";
import { CATEGORIES } from "@/lib/offerings";

export const metadata: Metadata = {
  title: "Contact — Elevate Gym",
  description:
    "Visit Elevate Gym at Mount Moriah Mall, Ayat, Addis Ababa. Call, message or walk in, we're open 24/7.",
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/55">{children}</p>
  );
}

// /contact?interest=combat (from "Book now" on /offerings) pre-fills the question.
// Reading searchParams is request-time data, so this part streams in under <Suspense>.
async function QuickQuestion({
  searchParams,
}: {
  searchParams: PageProps<"/contact">["searchParams"];
}) {
  const { interest } = await searchParams;
  const category = CATEGORIES.find((c) => c.id === interest);
  const defaultQuestion = category
    ? `I'd like to know more about ${category.title.toLowerCase()}.`
    : undefined;
  return <ContactForm defaultQuestion={defaultQuestion} />;
}

export default function ContactPage(props: PageProps<"/contact">) {
  return (
    <main>
      <Header />

      {/* Intro */}
      <section className="page-width px-6 pb-12 pt-36 md:px-12 md:pb-16 md:pt-44">
        <h1>
          <span className="rise block text-4xl font-semibold tracking-tight sm:text-5xl">
            Get in touch.
          </span>
          <span
            className="rise text-gradient mt-3 block py-[0.04em] font-display text-[clamp(3.5rem,9vw,7rem)] uppercase leading-[0.95] tracking-wide"
            style={{ animationDelay: "100ms" }}
          >
            We never close.
          </span>
        </h1>
        <p
          className="rise mt-6 max-w-lg text-[15px] leading-relaxed text-white/65 sm:text-base"
          style={{ animationDelay: "200ms" }}
        >
          Questions about memberships, classes or the spa? Send us a message, give us a call, or
          just walk in. Any hour, any day.
        </p>
      </section>

      <section className="page-width px-6 pb-24 md:px-12 md:pb-32">
        <div className="grid gap-3 lg:grid-cols-12">
          {/* Quick question + map */}
          <div className="flex flex-col gap-3 lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <Suspense fallback={<ContactForm />}>
                <QuickQuestion searchParams={props.searchParams} />
              </Suspense>
            </div>

            <div className="relative min-h-[280px] flex-1 overflow-hidden rounded-3xl border border-white/10">
              <iframe
                title="Map showing Elevate Gym at Mount Moriah Mall, Ayat"
                src={MAPS_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full [filter:grayscale(1)_invert(0.92)_contrast(0.9)_brightness(0.95)]"
              />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5">
            <div className="texture-green h-full rounded-3xl p-7 text-black sm:p-10">
              <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div>
                  <Label>Visit</Label>
                  <address className="mt-3 text-lg font-semibold not-italic leading-snug">
                    {ADDRESS.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>

                <div>
                  <Label>Call</Label>
                  <ul className="mt-3 space-y-3">
                    {PHONES.map((p) => (
                      <li key={p.tel}>
                        <a
                          href={`tel:${p.tel}`}
                          className="text-lg font-semibold tabular-nums underline-offset-4 hover:underline"
                        >
                          {p.display}
                        </a>
                        <span className="block text-sm text-black/55">{p.network}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Label>Hours</Label>
                  <p className="mt-3 text-lg font-semibold">
                    Open 24/7
                    <span className="block text-sm font-normal text-black/55">
                      Every day, all year round
                    </span>
                  </p>
                </div>

                <div>
                  <Label>Follow</Label>
                  <div className="mt-3">
                    <SocialLinks tone="green" />
                  </div>
                </div>
              </div>

              <div className="relative mt-10">
                <ArrowButton href={MAPS_URL} variant="dark" external>
                  Get directions
                </ArrowButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
