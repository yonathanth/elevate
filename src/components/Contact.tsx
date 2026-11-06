import ArrowButton from "./ArrowButton";
import { ADDRESS, MAPS_EMBED, MAPS_URL, PHONES } from "@/lib/contact";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/55">{children}</p>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="page-width scroll-mt-8 px-6 py-24 md:px-12 md:py-32">
      <div className="grid gap-3 lg:grid-cols-12">
        {/* Green textured card */}
        <div className="texture-green flex flex-col rounded-3xl p-7 text-black sm:p-10 lg:col-span-7 lg:min-h-[600px] lg:p-12">
          <h2 className="relative font-display text-[clamp(3.5rem,8vw,6.5rem)] uppercase leading-[0.9] tracking-wide">
            Come lift
            <br />
            with us.
          </h2>
          <p className="relative mt-5 max-w-sm text-[15px] leading-relaxed text-black/70 sm:text-base">
            Walk in any hour, any day. Our doors never close.
          </p>

          <div className="relative mt-10 grid gap-8 sm:grid-cols-2 lg:mt-auto lg:pt-12">
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

            <div className="sm:self-end">
              <ArrowButton href={MAPS_URL} variant="dark" external>
                Get directions
              </ArrowButton>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-white/10 lg:col-span-5">
          <iframe
            title="Map showing Elevate Gym at Mount Moriah Mall, Ayat"
            src={MAPS_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full [filter:grayscale(1)_invert(0.92)_contrast(0.9)_brightness(0.95)]"
          />
        </div>
      </div>
    </section>
  );
}
