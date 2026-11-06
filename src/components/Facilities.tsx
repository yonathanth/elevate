import Image from "next/image";

type Tile = { src: string; label: string; h: string };

// Desktop: columns step up in height toward the feature image, like a staircase.
const COLUMNS: { width: string; tiles: Tile[] }[] = [
  {
    width: "w-[17%]",
    tiles: [{ src: "barbell-grip", label: "Barbells", h: "h-28" }],
  },
  {
    width: "w-[23%]",
    tiles: [{ src: "dumbbells", label: "Dumbbells", h: "h-56" }],
  },
  {
    width: "w-[26%]",
    tiles: [
      { src: "squat-rack", label: "Squat racks", h: "h-48" },
      { src: "cardio", label: "Cardio deck", h: "h-36" },
    ],
  },
  {
    width: "w-[34%]",
    tiles: [
      { src: "strength", label: "Strength zone", h: "h-44" },
      { src: "benches", label: "Benches & racks", h: "h-28" },
      { src: "machines", label: "Machines", h: "h-40" },
    ],
  },
];

// Smaller screens show a trimmed set (drops the last two)
const MOBILE_TILES = COLUMNS.flatMap((col) => col.tiles).slice(0, 5);

function Tile({
  src,
  label,
  className,
  sizes,
  alwaysShowLabel = false,
}: {
  src: string;
  label: string;
  className: string;
  sizes: string;
  alwaysShowLabel?: boolean;
}) {
  return (
    <figure className={`group relative overflow-hidden rounded-2xl ${className}`}>
      <Image
        src={`/facilities/${src}.jpg`}
        alt={label}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <figcaption
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2.5 pt-8 text-xs font-medium text-white transition-opacity duration-300 ${
          alwaysShowLabel ? "" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {label}
      </figcaption>
    </figure>
  );
}

export default function Facilities() {
  return (
    <section id="facilities" className="page-width scroll-mt-8 px-6 py-24 md:px-12 md:py-32">
      <div className="grid gap-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-6 lg:gap-y-16">
        {/* Copy */}
        <div className="lg:col-span-6 lg:pr-8">
          <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            Everything you need to train.
            <span className="text-gradient mt-3 block py-[0.04em] font-display text-[clamp(4rem,9vw,7rem)] font-normal uppercase leading-[0.95] tracking-wide">
              Open 24/7.
            </span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/65 sm:text-[15px]">
            From barbells and squat racks to a full cardio deck, every piece
            of equipment you could ask for is on our floor, ready whenever you
            are, day or night.
          </p>
        </div>

        {/* Feature image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl sm:aspect-[16/10] lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:min-h-[640px]">
          <Image
            src="/facilities/gym-floor.jpg"
            alt="Wide view of the gym floor with racks, benches and turf lane"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[45%_center]"
          />
        </div>

        {/* Desktop: staircase collage */}
        <div className="hidden items-end gap-2 lg:col-span-6 lg:flex lg:self-end">
          {COLUMNS.map((col, i) => (
            <div key={i} className={`flex flex-col gap-2 ${col.width}`}>
              {col.tiles.map((t) => (
                <Tile
                  key={t.src}
                  src={t.src}
                  label={t.label}
                  className={t.h}
                  sizes="15vw"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile & tablet: simple grid with labels always visible */}
        <div className="-mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:hidden">
          {MOBILE_TILES.map((t, i) => (
            <Tile
              key={t.src}
              src={t.src}
              label={t.label}
              alwaysShowLabel
              // Wide first tile so 5 tiles fill 2 or 3 columns evenly
              className={i === 0 ? "col-span-2 aspect-[2/1]" : "aspect-square"}
              sizes="(min-width: 640px) 33vw, 50vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
