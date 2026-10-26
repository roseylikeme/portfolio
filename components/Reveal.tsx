"use client";

import { useEffect, useRef } from "react";

/* Marks its element once it scrolls into view, so CSS can animate it in (see
   [data-reveal] in globals.css). Two steps on purpose: the server render is
   the finished state, `data-armed` hides it only once JS is running, and
   `data-in` plays it — so no-JS visitors and crawlers never see a blank. */
export function Reveal({
  as: Tag = "div",
  className = "",
  children,
  style,
}: {
  as?: "div" | "article" | "li" | "section";
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already on screen at load: leave it alone rather than blink it out.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    el.dataset.armed = "";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.in = "";
        observer.disconnect();
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal=""
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}
