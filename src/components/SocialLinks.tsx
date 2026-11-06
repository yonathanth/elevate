import type { ReactNode } from "react";

// Replace "#" with the gym's real profile URLs.
const SOCIALS: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1zm0 4.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6zm5.3-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" />
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <path d="M16.6 2h-3.4v13.4a2.9 2.9 0 1 1-2-2.8V9.1a6.3 6.3 0 1 0 5.4 6.3V8.6a8 8 0 0 0 4.6 1.5V6.7a4.6 4.6 0 0 1-4.6-4.7z" />
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <path d="M13.5 21.9v-7.7h2.6l.4-3h-3V9.3c0-.9.3-1.5 1.5-1.5h1.6V5.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6v7.7h3.1z" />
    ),
  },
  {
    label: "Telegram",
    href: "#",
    icon: (
      <path d="M21.4 4.1 18.3 19c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.8-7.9c.4-.3-.1-.5-.6-.2L6.2 13 1.5 11.5c-1-.3-1-1 .2-1.5L20.1 3c.8-.3 1.6.2 1.3 1.1z" />
    ),
  },
];

const TONES = {
  // On the dark page background
  dark: "border-white/10 bg-white/5 text-white/70 hover:border-brand hover:bg-brand/15 hover:text-brand hover:shadow-[0_10px_28px_-8px_rgba(10,206,38,0.75)]",
  // On the green textured surface
  green:
    "border-black/15 bg-black/5 text-black/75 hover:border-black hover:bg-black hover:text-brand hover:shadow-[0_10px_28px_-8px_rgba(0,0,0,0.5)]",
};

export default function SocialLinks({ tone = "dark" }: { tone?: keyof typeof TONES }) {
  return (
    <ul className="flex gap-3">
      {SOCIALS.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            aria-label={`Elevate Gym on ${s.label}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`group grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 ease-out hover:-translate-y-1 ${TONES[tone]}`}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover:-rotate-8 group-hover:scale-115"
            >
              {s.icon}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
