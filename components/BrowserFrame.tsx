/* Window chrome around a screenshot, so it reads as a real, running site rather
   than a picture. The URL is the claim: it's the address you can go and visit. */
export function BrowserFrame({
  url,
  children,
  className = "",
}: {
  url?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-raised)] ${className}`}
    >
      <div className="flex h-7 items-center gap-1.5 border-b border-[var(--border)] bg-[var(--bg-sunken)] px-3">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-[#febc2e]" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-[#28c840]" />
        {url && (
          <span className="ml-2 truncate rounded-md bg-[var(--bg-raised)] px-2 py-0.5 font-mono text-[11px] text-subtle">
            {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
        )}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
