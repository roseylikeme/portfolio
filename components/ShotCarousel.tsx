"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Shot = { src: string; alt: string; width: number; height: number };

/* Several screenshots of one project, crossfading in place on a short beat,
   so every screen is seen without anyone having to click. It keeps going
   under the pointer (hovering pans the screenshot instead), and only runs
   while on screen. Picking a dot hands control to the visitor and stops the
   autoplay — that's also its pause control. Never moves under reduced motion. */
export function ShotCarousel({
  shots,
  sizes,
  className,
  interval = 2600,
}: {
  shots: Shot[];
  sizes: string;
  className: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [manual, setManual] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (manual || !visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % shots.length), interval);
    return () => window.clearInterval(t);
  }, [manual, visible, shots.length, interval]);

  const playing = visible && !manual;

  return (
    <div ref={ref} className="relative">
      {shots.map((shot, i) => (
        <Image
          key={shot.src}
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes={sizes}
          aria-hidden={i !== index || undefined}
          className={`${className} transition-opacity duration-500 ${
            i === 0 ? "relative" : "absolute inset-0"
          } ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 rounded-full bg-black/45 px-1 backdrop-blur">
        {shots.map((shot, i) => (
          // The visible dot is small; the button around it is a 24px target.
          <button
            key={shot.src}
            type="button"
            onClick={() => {
              setManual(true);
              setIndex(i);
            }}
            aria-label={`Show screenshot ${i + 1} of ${shots.length}`}
            aria-pressed={i === index}
            className="group flex h-6 min-w-6 items-center justify-center px-1"
          >
            <span
              aria-hidden="true"
              className={`relative block h-1.5 overflow-hidden rounded-full transition-all ${
                i === index ? "w-6 bg-white/40" : "w-1.5 bg-white/55 group-hover:bg-white/80"
              }`}
            >
              {/* The active dot fills up until the next switch. */}
              {i === index && (
                <span
                  key={`${index}-${playing}`}
                  className={`absolute inset-y-0 left-0 rounded-full bg-white ${
                    playing ? "shot-progress" : "w-full"
                  }`}
                  style={{ animationDuration: `${interval}ms` }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
