"use client";

import { useEffect, useRef, useState } from "react";

/* The address as a button that copies itself — for visitors whose mailto
   opens nothing, or who'd rather paste it into their own client. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // No clipboard access (insecure context, permissions): select the text
      // so a manual copy is one keystroke away.
      const el = textRef.current;
      const selection = window.getSelection();
      if (!el || !selection) return;
      const range = document.createRange();
      range.selectNodeContents(el);
      selection.removeAllRanges();
      selection.addRange(range);
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-raised)] px-5 py-3 text-sm font-semibold transition-colors hover:border-[var(--fg-subtle)]"
    >
      <span ref={textRef} className="font-mono text-[13px] font-medium">
        {email}
      </span>
      <span
        aria-hidden="true"
        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors ${
          copied
            ? "bg-[var(--text-green)] text-[var(--bg)]"
            : "bg-[var(--bg-sunken)] text-muted group-hover:text-[var(--fg)]"
        }`}
      >
        {copied ? "Copied ✓" : "Copy"}
      </span>
      <span className="sr-only">Copy email address</span>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </button>
  );
}
