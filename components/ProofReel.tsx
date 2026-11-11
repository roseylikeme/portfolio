"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { LiveSite } from "@/content/work";

function Card({ site, dupe }: { site: LiveSite; dupe?: boolean }) {
  return (
    <li className="mr-5 w-64 shrink-0 sm:w-80" aria-hidden={dupe || undefined}>
      <a
        href={site.href}
        tabIndex={dupe ? -1 : undefined}
        target="_blank"
        rel="noreferrer noopener"
        className="lift group block overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-raised)]"
      >
        <span className="flex h-6 items-center gap-1 border-b border-[var(--border)] bg-[var(--bg-sunken)] px-2.5">
          <span aria-hidden="true" className="size-2 rounded-full bg-[#ff5f57]" />
          <span aria-hidden="true" className="size-2 rounded-full bg-[#febc2e]" />
          <span aria-hidden="true" className="size-2 rounded-full bg-[#28c840]" />
        </span>
        <Image
          src={site.shot}
          alt={dupe ? "" : site.alt}
          width={1440}
          height={900}
          sizes="320px"
          className="aspect-[16/10] w-full object-cover object-top"
        />
        <span className="flex items-center justify-between gap-2 px-3 py-2 text-sm font-semibold">
          {site.name}
          <span
            aria-hidden="true"
            className="text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            ↗
          </span>
        </span>
      </a>
    </li>
  );
}

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous site" : "Next site"}
      className="pointer-events-auto inline-flex size-9 items-center justify-center rounded-full border border-[var(--border)]/50 bg-[var(--bg)]/55 text-[var(--fg)] opacity-60 backdrop-blur-md transition hover:bg-[var(--bg)]/80 hover:opacity-100 focus-visible:opacity-100"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-4"
      >
        <path d={dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}

/* A continuously drifting strip of live sites. The track holds the list twice
   and wraps seamlessly at the halfway point. It pauses while hovered or
   focused and for a moment after the visitor swipes, scrolls or uses an
   arrow. It is a real scroll container, so swiping and the arrows work too.
   Under reduced motion it doesn't drift. */
const SPEED = 38; // px per second

// Width of one full copy of the list: where the second copy begins.
function loopWidth(el: HTMLElement) {
  const n = el.children.length / 2;
  const a = el.children[0] as HTMLElement | undefined;
  const b = el.children[n] as HTMLElement | undefined;
  return a && b ? b.offsetLeft - a.offsetLeft : 0;
}

export function ProofReel({ sites }: { sites: LiveSite[] }) {
  const track = useRef<HTMLUListElement>(null);
  const hovering = useRef(false);
  const pausedUntil = useRef(0);

  const holdFor = (ms: number) => {
    pausedUntil.current = performance.now() + ms;
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let last = performance.now();
    let pos = el.scrollLeft;
    let onScreen = false;

    const observer = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting));
    observer.observe(el);

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      const half = loopWidth(el);
      if (hovering.current || now < pausedUntil.current || !onScreen) {
        pos = el.scrollLeft; // follow wherever the visitor took it
      } else {
        pos += SPEED * dt;
        if (pos >= half) pos -= half;
        el.scrollLeft = pos;
      }
      // Scrolled back past the start by hand: hop to the same spot in the copy.
      if (el.scrollLeft < 1 && half > 0 && now < pausedUntil.current) {
        el.scrollLeft = half - 1;
        pos = el.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    holdFor(1500);
    const width = card.getBoundingClientRect().width + 20; // card + mr-5
    if (dir === -1 && el.scrollLeft < width) el.scrollLeft += loopWidth(el);
    el.scrollBy({ left: dir * width, behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="reel-heading"
      className="border-b border-[var(--border)] py-10"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
      onFocus={() => (hovering.current = true)}
      onBlur={() => (hovering.current = false)}
    >
      <div className="mx-auto mb-6 max-w-5xl px-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
          Proof, not promises
        </p>
        <h2 id="reel-heading" className="text-xl font-bold sm:text-2xl">
          {sites.length} things I built that are live right now
        </h2>
      </div>

      <div className="relative">
        <div className="reel-mask">
          <ul
            ref={track}
            onPointerDown={() => holdFor(2500)}
            onWheel={() => holdFor(2500)}
            onTouchMove={() => holdFor(2500)}
            className="reel-track flex overflow-x-auto py-2 pl-5"
          >
            {sites.map((site) => (
              <Card key={site.href} site={site} />
            ))}
            {/* Second copy for the seamless loop — hidden from AT and the tab order. */}
            {sites.map((site) => (
              <Card key={`${site.href}-dupe`} site={site} dupe />
            ))}
          </ul>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center sm:left-4">
          <Arrow dir="prev" onClick={() => step(-1)} />
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center sm:right-4">
          <Arrow dir="next" onClick={() => step(1)} />
        </div>
      </div>
    </section>
  );
}
