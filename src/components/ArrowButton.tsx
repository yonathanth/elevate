import Link from "next/link";

type Props = {
  href: string;
  external?: boolean;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "glass" | "dark";
  fullWidth?: boolean;
};

const SIZES = {
  sm: { link: "py-1 pl-4 pr-1 text-[15px]", icon: "h-7 w-7" },
  md: { link: "py-1.5 pl-6 pr-1.5 text-[15px]", icon: "h-9 w-9" },
  lg: { link: "py-2 pl-7 pr-2 text-base", icon: "h-12 w-12" },
};

const VARIANTS = {
  solid: { link: "bg-gradient-brand text-black", icon: "bg-black text-brand" },
  glass: {
    link: "glass text-white hover:border-brand/50",
    icon: "bg-gradient-brand text-black",
  },
  // For use on the green textured surface
  dark: { link: "bg-black text-white", icon: "bg-gradient-brand text-black" },
};

// Pill button with a round ↗ arrow badge on the right.
export default function ArrowButton({
  href,
  children,
  size = "md",
  variant = "solid",
  fullWidth = false,
  external = false,
}: Props) {
  const s = SIZES[size];
  const v = VARIANTS[variant];
  return (
    <Link
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={`group items-center gap-3 rounded-full font-semibold transition-[transform,border-color] hover:scale-[1.03] ${s.link} ${v.link} ${
        fullWidth ? "flex w-full justify-between hover:scale-[1.01]" : "inline-flex"
      }`}
    >
      {children}
      <span
        className={`grid place-items-center rounded-full transition-transform group-hover:rotate-45 ${s.icon} ${v.icon}`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M8 7h9v9" />
        </svg>
      </span>
    </Link>
  );
}
