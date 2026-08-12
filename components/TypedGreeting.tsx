"use client";

import { useEffect, useState } from "react";

type Greeting = { readonly text: string; readonly language: string };

const TYPE_MS = 110;
const DELETE_MS = 55;
const HOLD_MS = 1600;
const BETWEEN_MS = 350;

export function TypedGreeting({ greetings }: { greetings: readonly Greeting[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(greetings[0].text);
  const [deleting, setDeleting] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAnimate(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const isLast = index === greetings.length - 1;

  useEffect(() => {
    if (!animate) return;

    const full = greetings[index].text;

    if (!deleting && text === full && isLast) return;

    if (!deleting && text === full) {
      const t = setTimeout(() => setDeleting(true), HOLD_MS);
      return () => clearTimeout(t);
    }

    if (deleting && text === "") {
      const t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % greetings.length);
      }, BETWEEN_MS);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () =>
        setText((current) =>
          deleting
            ? full.slice(0, current.length - 1)
            : full.slice(0, current.length + 1),
        ),
      deleting ? DELETE_MS : TYPE_MS,
    );
    return () => clearTimeout(t);
  }, [animate, text, deleting, index, greetings]);

  const language = greetings[index].language;

  return (
    <span className="block">
      {/* One stable greeting for assistive tech — not the animation. */}
      <span className="sr-only">{greetings[0].text}. I&apos;m Roselene.</span>

      <span aria-hidden="true" className="block">
        <span className="gradient-text text-3xl sm:text-4xl font-semibold">
          {text}
        </span>
        <span
          className={`ml-0.5 inline-block w-[2px] translate-y-[3px] self-stretch bg-[var(--fg-subtle)] h-7 sm:h-9 ${
            animate ? "caret" : "opacity-0"
          }`}
        />
        <span className="ml-3 align-middle text-xs uppercase tracking-[0.18em] text-subtle">
          {language}
        </span>
      </span>
    </span>
  );
}
