"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { lockScroll } from "@/lib/scroll";

// Drop the tour file at public/tour.mp4 (or change this path).
const TOUR_SRC = "/tour.mp4";

function RotatingPlay({ onClick }: { onClick: () => void }) {
  const pathId = useId();
  return (
    <button
      onClick={onClick}
      aria-label="Watch the gym tour"
      className="group relative grid h-28 w-28 place-items-center"
    >
      <svg
        viewBox="0 0 100 100"
        className="animate-spin-slow absolute inset-0 h-full w-full"
      >
        <defs>
          <path
            id={pathId}
            d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
          />
        </defs>
        <text className="fill-white text-[9.5px] font-medium uppercase tracking-[0.3em]">
          <textPath href={`#${pathId}`}>
            Gym tour · Play video · Gym tour ·
          </textPath>
        </text>
      </svg>
      {/* Pulse rings */}
      <span className="pulse-ring absolute h-12 w-12 rounded-full bg-brand" />
      <span
        className="pulse-ring absolute h-12 w-12 rounded-full bg-brand"
        style={{ animationDelay: "1s" }}
      />
      <span className="pulse-core bg-gradient-brand relative grid h-12 w-12 place-items-center rounded-full text-black transition-transform group-hover:scale-110">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 4l14 8-14 8z" />
        </svg>
      </span>
    </button>
  );
}

export default function VideoTour() {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    lockScroll(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open]);

  const play = () => {
    setFailed(false);
    setOpen(true);
  };

  return (
    <>
      <RotatingPlay onClick={play} />

      {/* Portaled to <body> so it sits above the hero text and header */}
      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Elevate Gym video tour"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-4 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black"
            >
              {failed ? (
                <div className="grid h-full place-items-center text-center text-white/70">
                  <p>The video tour is coming soon.</p>
                </div>
              ) : (
                <video
                  src={TOUR_SRC}
                  controls
                  autoPlay
                  playsInline
                  onError={() => setFailed(true)}
                  className="h-full w-full object-cover"
                />
              )}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close video"
                className="glass absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full hover:bg-brand hover:text-black"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
