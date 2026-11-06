import Link from "next/link";
import { NAV } from "@/lib/nav";
import SocialLinks from "./SocialLinks";
import CurrentYear from "./CurrentYear";

export default function Footer() {
  return (
    <footer className="page-width border-t border-white/10 px-6 py-10 md:px-12">
      {/* Equal 1fr side columns keep the nav + socials truly centered */}
      <div className="grid items-center justify-items-center gap-8 text-center md:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="text-xl font-semibold lowercase tracking-tight md:justify-self-start">
          elevate
        </Link>

        <div className="flex flex-col items-center gap-6">
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[15px] font-medium text-white/70">
            {NAV.map((item) => (
              <Link key={item.label} href={item.href} className="transition-colors hover:text-brand">
                {item.label}
              </Link>
            ))}
          </nav>
          <SocialLinks />
        </div>

        <p className="text-sm leading-relaxed text-white/45 md:justify-self-end md:text-right">
          © <CurrentYear /> Elevate Gym.{" "}
          <span className="md:block">Addis Ababa.</span>
        </p>
      </div>
    </footer>
  );
}
