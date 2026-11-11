"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { ToolMark, ToolTile } from "@/components/ToolIcon";
import { bridges, skillCount, toolbox, type Tool, type ToolGroup } from "@/content/toolbox";

/* ------------------------------------------------------------- layout ---- */

/* Everything is placed in a 1200×780 stage. A deterministic layout, not a
   physics sim: the server render is the real picture, nothing jitters, and it
   costs nothing at runtime. Clusters get a slice of the circle sized to how
   many skills they hold; each slice has its hub on an inner ring and its
   skills zig-zagged across two outer rings so neighbouring labels never share
   a line. The ellipse is stretched wide to use the stage's shape. */
// Tuned with an overlap checker against the real labels: at this size and a
// ~1200px stage, no two nodes collide. Change labels or counts and re-check.
const W = 1200;
const H = 780;
const CX = W / 2;
const CY = H / 2;
const SX = 1.6;
const SY = 1;
const R_HUB = 165;
const R_IN = 270;
const R_OUT = 345;
const PAD = 5;

type Pt = { x: number; y: number };

// Rounded: Math.cos/sin differ in the last digits between Node and browsers,
// and unrounded coordinates would make the server and client markup disagree.
const r2 = (n: number) => Math.round(n * 100) / 100;

const at = (deg: number, r: number): Pt => {
  const rad = (deg * Math.PI) / 180;
  return { x: r2(CX + Math.cos(rad) * r * SX), y: r2(CY + Math.sin(rad) * r * SY) };
};

type WebNode = Pt & { id: string; group: ToolGroup; tool?: Tool; angle: number; i: number };
type WebEdge = {
  id: string;
  d: string;
  kind: "core" | "spoke" | "bridge";
  a: string;
  b: string;
  color: string;
};

const hubId = (g: ToolGroup) => `hub:${g.id}`;

function buildWeb() {
  const total = toolbox.reduce((n, g) => n + g.tools.length + 1, 0);
  const span = (g: ToolGroup) => ((g.tools.length + 1) / total) * 360;
  // The largest cluster faces left, where the wide ellipse has the most room.
  let a0 = 180 - span(toolbox[0]) / 2;

  const hubs: WebNode[] = [];
  const skills: WebNode[] = [];
  const edges: WebEdge[] = [];
  let i = 0;

  for (const g of toolbox) {
    const s = span(g);
    const mid = a0 + s / 2;
    const hub = { id: hubId(g), group: g, angle: mid, i: i++, ...at(mid, R_HUB) };
    hubs.push(hub);
    edges.push({
      id: `core:${g.id}`,
      d: `M${CX} ${CY}L${hub.x} ${hub.y}`,
      kind: "core",
      a: "core",
      b: hub.id,
      color: g.color,
    });

    const step = (s - PAD * 2) / g.tools.length;
    g.tools.forEach((tool, k) => {
      const angle = a0 + PAD + step * (k + 0.5);
      const p = at(angle, k % 2 ? R_OUT : R_IN);
      skills.push({ id: tool.id, group: g, tool, angle, i: i++, ...p });
      const c = at((mid + angle) / 2, (R_HUB + R_IN) / 2);
      edges.push({
        id: `spoke:${tool.id}`,
        d: `M${hub.x} ${hub.y}Q${c.x} ${c.y} ${p.x} ${p.y}`,
        kind: "spoke",
        a: hub.id,
        b: tool.id,
        color: g.color,
      });
    });
    a0 += s;
  }

  // Bridges bow toward the centre, so they read as long-range links passing
  // through the middle of the brain rather than short hops around its edge.
  const byId = new Map(skills.map((n) => [n.id, n]));
  for (const [x, y] of bridges) {
    const A = byId.get(x);
    const B = byId.get(y);
    if (!A || !B) continue;
    const m = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
    const c = { x: r2(m.x + (CX - m.x) * 0.45), y: r2(m.y + (CY - m.y) * 0.45) };
    edges.push({
      id: `bridge:${x}:${y}`,
      d: `M${A.x} ${A.y}Q${c.x} ${c.y} ${B.x} ${B.y}`,
      kind: "bridge",
      a: x,
      b: y,
      color: A.group.color,
    });
  }

  return { hubs, skills, edges, byId };
}

const web = buildWeb();

/** Who lights up when `id` is active: itself, its hub, its bridge partners
    and their hubs — or, for a hub, the whole cluster and where it reaches. */
function neighbourhood(id: string | null) {
  const nodes = new Set<string>();
  const edges = new Set<string>();
  if (!id) return { nodes, edges };

  const lightSkill = (sid: string, deep: boolean) => {
    const n = web.byId.get(sid);
    if (!n) return;
    nodes.add(sid);
    nodes.add(hubId(n.group));
    edges.add(`spoke:${sid}`);
    if (!deep) return;
    for (const e of web.edges) {
      if (e.kind !== "bridge" || (e.a !== sid && e.b !== sid)) continue;
      edges.add(e.id);
      lightSkill(e.a === sid ? e.b : e.a, false);
    }
  };

  if (id.startsWith("hub:")) {
    const g = toolbox.find((t) => hubId(t) === id);
    if (g) {
      nodes.add(id);
      edges.add(`core:${g.id}`);
      g.tools.forEach((t) => lightSkill(t.id, true));
    }
  } else {
    lightSkill(id, true);
  }
  return { nodes, edges };
}

function partners(id: string) {
  return web.edges
    .filter((e) => e.kind === "bridge" && (e.a === id || e.b === id))
    .map((e) => web.byId.get(e.a === id ? e.b : e.a)!)
    .filter(Boolean);
}

/* -------------------------------------------------------------- the web ---- */

function Web() {
  const [hover, setHover] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [spark, setSpark] = useState<{ edge: WebEdge; key: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLButtonElement>());

  const active = hover ?? selected;
  const lit = useMemo(() => neighbourhood(active), [active]);

  const select = useCallback((id: string) => {
    setSelected((cur) => (cur === id ? null : id));
  }, []);

  const jumpTo = (id: string) => {
    setSelected(id);
    setHover(null);
    nodeRefs.current.get(id)?.focus();
  };

  // Esc lets go of whatever is pinned.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setSelected(null);
      setHover(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // While idle and on screen, a random link fires now and then so the brain
  // reads as alive. Stops the moment someone is exploring, or scrolls away.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: number | undefined;
    let n = 0;
    const fire = () => {
      const edge = web.edges[Math.floor(Math.random() * web.edges.length)];
      setSpark({ edge, key: n++ });
    };
    const observer = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (entry.isIntersecting) timer = window.setInterval(fire, 1100);
    });
    observer.observe(stage);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [active]);

  // The whole stage leans a few degrees toward the pointer.
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--ry", `${px * 4}deg`);
    e.currentTarget.style.setProperty("--rx", `${py * -4}deg`);
  };

  const onPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--ry", "0deg");
    e.currentTarget.style.setProperty("--rx", "0deg");
  };

  const nodeHandlers = (id: string) => ({
    onMouseEnter: () => setHover(id),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover(id),
    onBlur: () => setHover(null),
    onClick: () => select(id),
    ref: (el: HTMLButtonElement | null) => {
      if (el) nodeRefs.current.set(id, el);
      else nodeRefs.current.delete(id);
    },
  });

  const pos = (p: Pt) => ({
    left: `${((p.x / W) * 100).toFixed(3)}%`,
    top: `${((p.y / H) * 100).toFixed(3)}%`,
  });

  return (
    // Breaks out of the page column to a ~1240px stage — the layout needs the
    // room, which is why the web is only offered at 1280px and up.
    <div className="relative left-1/2 w-[min(1240px,calc(100vw-2.5rem))] -translate-x-1/2">
      <Reveal className="viz">
        <div
          ref={stageRef}
          className="web relative aspect-[1200/780] w-full"
          data-active={active ? "" : undefined}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          role="group"
          aria-label={`Skill web: ${skillCount} skills in ${toolbox.length} clusters. Select a skill to see where I used it and what it connects to.`}
        >
          <div className="web-tilt absolute inset-0">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              aria-hidden="true"
              className="absolute inset-0 size-full overflow-visible"
              fill="none"
            >
              {web.edges.map((e, k) => (
                <path
                  key={e.id}
                  d={e.d}
                  pathLength={100}
                  className={`web-edge web-${e.kind} ${e.kind === "bridge" ? "" : "web-draw"}`}
                  data-lit={lit.edges.has(e.id) ? "" : undefined}
                  style={{ ["--c" as string]: e.color, ["--i" as string]: e.kind === "core" ? 0 : k % 14 }}
                />
              ))}
              {/* Pulses along every lit edge. */}
              {web.edges
                .filter((e) => lit.edges.has(e.id))
                .map((e) => (
                  <path
                    key={`pulse-${e.id}`}
                    d={e.d}
                    pathLength={100}
                    className="web-pulse"
                    style={{ ["--c" as string]: e.color }}
                  />
                ))}
              {spark && !active && (
                <path
                  key={`spark-${spark.key}`}
                  d={spark.edge.d}
                  pathLength={100}
                  className="web-spark"
                  style={{ ["--c" as string]: spark.edge.color }}
                />
              )}
            </svg>

            {toolbox.map((g) => {
              const hub = web.hubs.find((h) => h.group === g)!;
              return (
                <div key={g.id} role="group" aria-label={g.title}>
                  <button
                    type="button"
                    {...nodeHandlers(hub.id)}
                    aria-pressed={selected === hub.id}
                    data-lit={lit.nodes.has(hub.id) ? "" : undefined}
                    className="web-node web-hub web-pop absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ ...pos(hub), ["--c" as string]: g.color, ["--i" as string]: hub.i }}
                  >
                    <span className="web-float inline-flex items-center gap-2 whitespace-nowrap rounded-full border-2 border-[var(--c)] bg-[var(--bg-raised)] px-3 py-1 font-display text-[13px] font-bold shadow-lift">
                      <span aria-hidden="true" className="size-2.5 rounded-full bg-[var(--c)]" />
                      {g.title}
                    </span>
                  </button>

                  {g.tools.map((t) => {
                    const n = web.byId.get(t.id)!;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        {...nodeHandlers(t.id)}
                        aria-pressed={selected === t.id}
                        data-lit={lit.nodes.has(t.id) ? "" : undefined}
                        className="web-node web-pop absolute flex w-[88px] -translate-x-1/2 -translate-y-[18px] flex-col items-center gap-1 rounded-xl p-0.5 text-center"
                        style={{ ...pos(n), ["--c" as string]: g.color, ["--i" as string]: n.i }}
                      >
                        <span className="web-float web-dot flex size-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-raised)] text-[var(--fg)]">
                          <ToolMark tool={t} className="size-4" />
                        </span>
                        <span className="web-label rounded-md px-1 text-[11px] font-semibold leading-tight">
                          {t.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })}

            {/* The nucleus doubles as the readout: it says who Rose is when
                idle, and what the active node means when there is one. */}
            <div
              className="web-nucleus absolute left-1/2 top-1/2 w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)] p-4 shadow-lift"
              aria-live="polite"
            >
              <Readout active={active} pinned={selected} onJump={jumpTo} />
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function Readout({
  active,
  pinned,
  onJump,
}: {
  active: string | null;
  pinned: string | null;
  onJump: (id: string) => void;
}) {
  if (!active) {
    return (
      <div className="text-center">
        <p className="font-display text-xl font-bold">
          <span className="gradient-text">Rose</span>
        </p>
        <p className="mt-1 text-xs text-muted">
          {skillCount} skills · {toolbox.length} clusters · {bridges.length} bridges
        </p>
        <p className="mt-3 text-xs leading-relaxed text-subtle">
          Hover or tab to any skill to light up what it connects to. Click to
          pin it.
        </p>
      </div>
    );
  }

  if (active.startsWith("hub:")) {
    const g = toolbox.find((t) => hubId(t) === active)!;
    return (
      <div style={{ ["--c" as string]: g.color }}>
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
          <span aria-hidden="true" className="size-2 rounded-full bg-[var(--c)]" />
          Cluster · {g.tools.length} skills
        </p>
        <p className="mt-1 font-display text-lg font-bold leading-tight">{g.title}</p>
        <p className="mt-1 text-xs text-muted">{g.blurb}</p>
        <p className="mt-2 text-xs leading-relaxed text-subtle">
          {g.tools.map((t) => t.name).join(" · ")}
        </p>
      </div>
    );
  }

  const n = web.byId.get(active)!;
  const links = partners(active);
  const isPinned = pinned === active;
  return (
    <div style={{ ["--c" as string]: n.group.color }}>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
        <span aria-hidden="true" className="size-2 rounded-full bg-[var(--c)]" />
        {n.group.title}
      </p>
      <p className="mt-1 font-display text-lg font-bold leading-tight">{n.tool!.name}</p>
      {n.tool!.at && (
        <p className="mt-1 text-xs text-muted">
          <span className="font-semibold text-[var(--fg)]">Used at:</span> {n.tool!.at}
        </p>
      )}
      {links.length > 0 && (
        <div className="mt-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle">
            Bridges to
          </p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {links.map((p) => (
              <li key={p.id}>
                {isPinned ? (
                  <button
                    type="button"
                    onClick={() => onJump(p.id)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-semibold hover:border-[var(--fg-subtle)]"
                  >
                    <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: p.group.color }} />
                    {p.tool!.name}
                    <span aria-hidden="true">→</span>
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-semibold">
                    <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: p.group.color }} />
                    {p.tool!.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {!isPinned && (
        <p className="mt-3 text-[11px] text-subtle">Click to pin and follow a bridge.</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------- the list ---- */

function List() {
  return (
    // grid-cols-1 (minmax(0, 1fr)) rather than the implicit auto column: the
    // tiles' truncated one-line text would otherwise stretch it past the screen.
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-x-8">
      {toolbox.map((group, i) => (
        <Reveal key={group.id} className="min-w-0" style={{ transitionDelay: `${(i % 2) * 90}ms` }}>
          <div
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t-2 pt-4"
            style={{ borderColor: group.color }}
          >
            <h3 className="font-display text-lg font-bold">{group.title}</h3>
            <p className="text-xs text-subtle">{group.blurb}</p>
          </div>
          <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {group.tools.map((tool) => (
              <ToolTile key={tool.id} tool={tool} />
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------ the toggle ---- */

type View = "web" | "list";
const VIEW_KEY = "skills-view";

/* The web on desktop widths, the list below 1280px — decided in CSS (see
   .skills in globals.css) so there is no flash of the wrong view on load.
   On desktop the visitor can switch, and their pick is remembered. */
export function Skills() {
  const [view, setView] = useState<View | null>(null);
  const [wide, setWide] = useState(true);

  useEffect(() => {
    const q = window.matchMedia("(min-width: 1280px)");
    const sync = () => setWide(q.matches);
    sync();
    q.addEventListener("change", sync);
    try {
      const saved = localStorage.getItem(VIEW_KEY);
      if (saved === "web" || saved === "list") setView(saved);
    } catch {}
    return () => q.removeEventListener("change", sync);
  }, []);

  // The web needs a desktop-width stage; below that it's always the list.
  const shown: View = wide ? (view ?? "web") : "list";

  const choose = (v: View) => {
    setView(v);
    try {
      localStorage.setItem(VIEW_KEY, v);
    } catch {}
  };

  const tabs: { id: View; label: string }[] = [
    { id: "web", label: "Web" },
    { id: "list", label: "List" },
  ];

  return (
    <div className="skills" data-view={view ?? undefined}>
      <div
        role="tablist"
        aria-label="Show skills as"
        className="skills-tabs inline-flex rounded-full border border-[var(--border)] bg-[var(--bg-raised)] p-1"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`skills-tab-${t.id}`}
            aria-selected={shown === t.id}
            aria-controls={`skills-${t.id}`}
            tabIndex={shown === t.id ? 0 : -1}
            onClick={() => choose(t.id)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
              const next = t.id === "web" ? "list" : "web";
              choose(next);
              document.getElementById(`skills-tab-${next}`)?.focus();
            }}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              shown === t.id
                ? "bg-[var(--fg)] text-[var(--bg)]"
                : "text-muted hover:text-[var(--fg)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id="skills-web"
        aria-labelledby="skills-tab-web"
        className="skills-web mt-8"
      >
        <Web />
      </div>
      <div
        role="tabpanel"
        id="skills-list"
        aria-labelledby="skills-tab-list"
        className="skills-list mt-8"
      >
        <List />
      </div>
    </div>
  );
}
