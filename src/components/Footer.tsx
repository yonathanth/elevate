import Link from "next/link";
import { NAV } from "@/lib/nav";
import { ADDRESS } from "@/lib/contact";
import SocialLinks from "./SocialLinks";
import CurrentYear from "./CurrentYear";

export default function Footer() {
  return (
    <footer className="page-width border-t border-white/10 px-6 pt-14 md:px-12 md:pt-20">
      {/* Links + socials */}
      <div className="flex flex-col items-center gap-6 text-center">
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[15px] font-medium text-white/70">
          {NAV.map((item) => (
            <Link key={item.label} href={item.href} className="transition-colors hover:text-brand">
              {item.label}
            </Link>
          ))}
        </nav>
        <SocialLinks />
      </div>

      {/* Wordmark */}
      <Link href="/" aria-label="Elevate Gym home" className="mt-12 block md:mt-16">
        <span
          aria-hidden
          className="text-texture-green block select-none text-center font-display text-[clamp(4rem,23vw,21rem)] uppercase leading-[0.85] tracking-wide"
        >
          Elevate
        </span>
      </Link>

      {/* Bottom bar */}
      <div className="mt-10 flex flex-col items-center gap-2 border-t border-white/10 py-8 text-center text-sm text-white/45 md:mt-14 md:flex-row md:justify-between">
        <p>
          © <CurrentYear /> Elevate Gym. All rights reserved.
        </p>
        <p>
          {ADDRESS.lines[0]}, {ADDRESS.lines[1].split(",")[0]}
        </p>
      </div>
    </footer>
  );
}
