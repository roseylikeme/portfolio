"use client";

import { useEffect, useRef, useState } from "react";

/* Counts a number up the first time it scrolls into view. Screen readers get
   the final value straight away; the animation is aria-hidden. */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  plain = false,
  duration = 1400,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Years and the like — no thousands separator. */
  plain?: boolean;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Starts at the final value so the server render and no-JS view are right.
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // A year counting up from 0 looks silly — start close instead.
    const from = plain ? Math.floor(value * 0.995) : 0;
    let frame = 0;
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(Math.round(from + (value - from) * eased));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        setShown(from);
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, plain, duration]);

  const format = (n: number) => (plain ? String(n) : n.toLocaleString("en-US"));

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">
        {prefix}
        {format(value)}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        {format(shown)}
        {suffix}
      </span>
    </span>
  );
}
