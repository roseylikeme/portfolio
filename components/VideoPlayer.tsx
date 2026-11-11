"use client";

import Image from "next/image";
import { useState } from "react";

/* A YouTube embed that costs nothing until it's wanted: a real thumbnail and a
   play button, swapped for the privacy-enhanced player on click. Saves ~1MB of
   YouTube JS on load and keeps their cookies off the page until then. */
export function VideoPlayer({
  id,
  title,
  sizes,
  priority,
}: {
  id: string;
  title: string;
  sizes: string;
  priority?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 size-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group absolute inset-0 size-full"
    >
      <span className="sr-only">Play video: {title}</span>
      <Image
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0"
      />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#0e0e11] shadow-lg ring-4 ring-white/30 transition-transform duration-300 group-hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="ml-1 size-7" fill="currentColor">
          <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
        </svg>
      </span>
    </button>
  );
}
