"use client";

import { useRef, useState } from "react";

/* A screenshot that can become the real thing. The live viz loads only when
   someone asks for it, so the page stays light, and it opens in a near
   full-screen dialog because a Tableau story is laid out for ~1000px and
   cramps inside a card. On phones the button is hidden; the card's link out
   does that job. */
export function LiveEmbed({
  name,
  title,
  children,
}: {
  /** Tableau Public workbook/view, e.g. "Workbook_123/Story1". */
  name: string;
  title: string;
  children: React.ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  // The iframe mounts on first open and stays, so reopening doesn't reload it.
  const [loaded, setLoaded] = useState(false);
  const src = `https://public.tableau.com/views/${name}?:embed=y&:showVizHome=no&:tabs=no&:toolbar=yes&:display_count=no&:language=en-US`;

  return (
    <div className="relative">
      {children}
      <button
        type="button"
        onClick={() => {
          setLoaded(true);
          dialog.current?.showModal();
        }}
        className="absolute bottom-3 right-3 z-10 hidden items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-raised)] px-3 py-1 text-xs font-semibold text-[var(--fg)] shadow-lift transition-colors hover:border-[var(--lane)] md:inline-flex"
      >
        <span aria-hidden="true" className="size-1.5 rounded-full bg-[var(--lane)]" />
        Interact with the live story
      </button>

      <dialog
        ref={dialog}
        aria-label={`${title}, live on Tableau Public`}
        // A click on the backdrop (the dialog itself, outside the panel) closes it.
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto h-[88vh] w-[min(1280px,94vw)] max-w-none overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)] p-0 text-[var(--fg)] shadow-lift backdrop:bg-black/60"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-2.5">
            <p className="truncate text-sm font-semibold">{title}</p>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-semibold hover:border-[var(--fg)]"
            >
              Close
            </button>
          </div>
          {loaded && (
            <iframe src={src} title={title} className="block w-full flex-1 border-0 bg-white" allowFullScreen />
          )}
        </div>
      </dialog>
    </div>
  );
}
