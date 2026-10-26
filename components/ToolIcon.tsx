import type { Tool } from "@/content/toolbox";

/* A Simple Icons logo drawn in currentColor (see .tool-icon), so it follows
   the theme. Decorative — the tool's name is always written beside it. */
export function ToolIcon({ icon, className = "" }: { icon: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`tool-icon ${className}`}
      style={{ ["--icon" as string]: `url(/icons/${icon}.svg)` }}
    />
  );
}

/** The logo, or the letter tile for tools without one. */
export function ToolMark({ tool, className = "size-[18px]" }: { tool: Tool; className?: string }) {
  return tool.icon ? (
    <ToolIcon icon={tool.icon} className={className} />
  ) : (
    <span aria-hidden="true" className="font-mono text-[10px] font-bold tracking-tight">
      {tool.mono}
    </span>
  );
}

export function ToolTile({ tool }: { tool: Tool }) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-raised)] p-2.5 pr-3.5 transition-colors hover:border-[var(--fg-subtle)]">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-sunken)] text-[var(--fg)]">
        <ToolMark tool={tool} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold leading-tight">{tool.name}</span>
        {tool.at && (
          <span className="mt-0.5 block truncate text-xs text-subtle">{tool.at}</span>
        )}
      </span>
    </li>
  );
}
