"use client";

import Image from "next/image";
import { useState } from "react";
import type { LiveSite } from "@/content/work";

function Card({ site, dupe }: { site: LiveSite; dupe?: boolean }) {
  return (
    <li className={`mr-5 w-64 shrink-0 sm:w-80 ${dupe ? "reel-dupe" : ""}`} aria-hidden={dupe || undefined}>
      <a
        href={site.href}
        target="_blank"
        rel="noreferrer noopener"
        tabIndex={dupe ? -1 : undefined}
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

export function ProofReel({ sites }: { sites: LiveSite[] }) {
  const [paused, setPaused] = useState(false);

  return (
    <section
      aria-labelledby="reel-heading"
      className="reel border-b border-[var(--border)] py-10"
      data-paused={paused}
    >
      <div className="mx-auto mb-6 flex max-w-5xl items-end justify-between gap-4 px-5">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
            Proof, not promises
          </p>
          <h2 id="reel-heading" className="text-xl font-bold sm:text-2xl">
            {sites.length} things I built that are live right now
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="reel-toggle inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-raised)] px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-[var(--fg-subtle)]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-3.5">
            {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
          </svg>
          {paused ? "Play" : "Pause"}
          <span className="sr-only"> scrolling</span>
        </button>
      </div>

      {/* Spacing is a right margin on every card, not gap or padding, so the
          track is exactly two equal halves and -50% lands on the seam. */}
      <div className="reel-mask overflow-hidden pl-5">
        <ul className="reel-track flex w-max py-2">
          {sites.map((site) => (
            <Card key={site.href} site={site} />
          ))}
          {/* Second copy for the seamless loop — hidden from AT and the tab order. */}
          {sites.map((site) => (
            <Card key={`${site.href}-dupe`} site={site} dupe />
          ))}
        </ul>
      </div>
    </section>
  );
}
