import Image from "next/image";
import { BrowserFrame } from "@/components/BrowserFrame";
import { CopyEmail } from "@/components/CopyEmail";
import { CountUp } from "@/components/CountUp";
import { CurrentMonth } from "@/components/CurrentMonth";
import { HeroGlow } from "@/components/HeroGlow";
import { Nav } from "@/components/Nav";
import { ProofReel } from "@/components/ProofReel";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { ShotCarousel } from "@/components/ShotCarousel";
import { Skills } from "@/components/SkillWeb";
import { ToolIcon } from "@/components/ToolIcon";
import { TypedGreeting } from "@/components/TypedGreeting";
import { VideoPlayer } from "@/components/VideoPlayer";
import {
  channel,
  crafts,
  featuredVideo,
  videos,
  type Craft,
} from "@/content/creator";
import {
  earlierRoles,
  education,
  experience,
  type RoleIcon,
} from "@/content/experience";
import { profile } from "@/content/profile";
import { testimonials, type Testimonial } from "@/content/testimonials";
import {
  lanes,
  liveSites,
  smallerWork,
  type Lane,
  type WorkItem,
} from "@/content/work";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <span id="top" />
        <Hero />
        <ProofReel sites={liveSites} />
        <Now />
        <Work />
        <Create />
        <Experience />
        <Toolbox />
        {/* <About /> */}
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}

/* ---------------------------------------------------------------- hero ---- */

/* One font, one line — each word just carries its own flag colour. */
const traitColor: Record<string, string> = {
  Technical: "text-[var(--accent)]",
  Creative: "text-red",
  Analytical: "text-gold",
};

function Hero() {
  return (
    // Fills the first screen exactly, so the stats strip always lands above the
    // fold on a laptop instead of wherever the content happens to end.
    <section className="hero-wash relative flex flex-col overflow-hidden border-b border-[var(--border)] lg:min-h-[calc(100svh-4rem)]">
      <HeroGlow />
      <div className="relative mx-auto grid w-full max-w-5xl flex-1 items-center gap-14 px-5 pb-14 pt-12 sm:pt-16 lg:grid-cols-[1.15fr_1fr] lg:py-10">
        <div>
          <TypedGreeting greetings={profile.greetings} />

          <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
            I&apos;m {profile.name}.
            <span className="mt-3 block text-[0.62em] leading-[1.3]">
              {profile.traits.map((t, i) => (
                <span key={t.word}>
                  <span className={traitColor[t.word]}>{t.word}</span>
                  {i < profile.traits.length - 1 ? (
                    <span className="text-subtle">
                      <span aria-hidden="true"> · </span>
                      <span className="sr-only">, </span>
                    </span>
                  ) : (
                    <span className="sr-only">.</span>
                  )}
                </span>
              ))}
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg text-muted">
            {profile.headline} {profile.subhead}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#work"
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-fg)] transition-opacity hover:opacity-90"
            >
              See my work
            </a>
            <a
              href="#create"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-raised)] px-5 py-2.5 text-sm font-semibold transition-colors hover:border-[var(--fg-subtle)]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-3.5 text-[var(--text-red)]">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch me teach
            </a>
          {/* <a
            href={profile.links.resume}
            className="rounded-full border border-[var(--border)] bg-[var(--bg-raised)] px-5 py-2.5 text-sm font-semibold transition-colors hover:border-[var(--fg-subtle)]"
          >
            Résumé
          </a> */}
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-[var(--border)] bg-[var(--bg-raised)] px-5 py-2.5 text-sm font-semibold transition-colors hover:border-[var(--fg-subtle)]"
            >
              Email me
            </a>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {profile.availability}
          </p>
        </div>

        <ProofStack />
      </div>

      <div className="relative border-t border-[var(--border)] bg-[var(--bg)]/60 backdrop-blur-sm">
        <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-8 px-5 py-7 lg:grid-cols-4">
          {profile.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl font-bold leading-none sm:text-4xl">
                <span className="gradient-text">
                  <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </span>
              </dd>
              <dd aria-hidden="true" className="mt-2 text-sm text-muted">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div aria-hidden="true" className="gradient-band h-1 w-full" />
    </section>
  );
}

/* Three real screens fanned out — the first thing you see is work, not a
   claim about work. Hover spreads the hand; each card links to its section. */
function ProofStack() {
  return (
    // Desktop only: on narrower screens the hero stacks, and the fan of
    // screenshots would push the stats strip below the fold.
    <div className="relative hidden w-full lg:block">
      <div className="proof-stack relative aspect-[5/4]">
        <a
          href="#create"
          className="shadow-lift absolute left-0 top-[6%] w-[62%] overflow-hidden rounded-xl border border-[var(--border)] bg-black"
        >
          <span className="sr-only">Watch me teach: {featuredVideo.title}</span>
          <span className="relative block aspect-video">
            <Image
              src={`https://i.ytimg.com/vi/${featuredVideo.id}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(max-width: 1024px) 60vw, 320px"
              className="object-cover"
            />
            <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-11 items-center justify-center rounded-full bg-[#e62117] text-white shadow-lg">
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 size-5">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </span>
        </a>

        <a
          href="#build"
          className="shadow-lift absolute right-0 top-0 w-[64%]"
        >
          <span className="sr-only">See the Poll Worker data table</span>
          <BrowserFrame url="shadcn-ui-table.vercel.app">
            <Image
              src="/shots/poll-worker-table.jpg"
              alt=""
              width={1600}
              height={1000}
              sizes="(max-width: 1024px) 60vw, 340px"
              className="only-light aspect-[16/10] w-full object-cover object-top"
            />
            <Image
              src="/shots/live/poll-worker-table-dark.jpg"
              alt=""
              width={1440}
              height={900}
              sizes="(max-width: 1024px) 60vw, 340px"
              className="only-dark aspect-[16/10] w-full object-cover object-top"
            />
          </BrowserFrame>
        </a>

        <a
          href="#build"
          className="shadow-lift absolute bottom-0 left-[14%] w-[72%]"
        >
          <span className="sr-only">See Resume Fit Assistant</span>
          <BrowserFrame url="resume-fit-assistant/dashboard">
            <Image
              src="/shots/resume-fit-assistant.png"
              alt=""
              width={1634}
              height={1290}
              priority
              sizes="(max-width: 1024px) 70vw, 380px"
              className="aspect-[16/10] w-full object-cover object-top"
            />
          </BrowserFrame>
        </a>
      </div>

      {/* Floating receipts. Decorative restatements of numbers that are read
          out properly in the stats strip below. */}
      <div
        aria-hidden="true"
        className="float shadow-lift absolute -left-2 bottom-[18%] hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)] px-3.5 py-2.5 sm:block"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle">
          Resume Fit Assistant
        </p>
        <p className="font-display text-lg font-bold">403 commits</p>
      </div>
      <div
        aria-hidden="true"
        className="float float-delay shadow-lift absolute -right-2 top-[44%] hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)] px-3.5 py-2.5 sm:block"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle">
          On YouTube since
        </p>
        <p className="font-display text-lg font-bold">
          <span className="text-red">●</span> 2014
        </p>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- now ---- */

type NowItem = (typeof profile.now)[number];

/* Small drawn graphics, one per card, so the section scans as pictures first.
   All decorative — the card text says the same thing. */
function NowGraphic({ kind }: { kind: NowItem["graphic"] }) {
  if (kind === "resume-fit") {
    return (
      <BrowserFrame url="resume-fit-assistant" className="border-0">
        <Image
          src="/shots/resume-fit-assistant.png"
          alt=""
          width={1634}
          height={1290}
          sizes="(max-width: 1024px) 100vw, 320px"
          className="aspect-[16/9] w-full object-cover object-top"
        />
      </BrowserFrame>
    );
  }

  if (kind === "mandarin") {
    return (
      <div className="flex h-full items-center justify-center gap-3" lang="zh">
        <span className="gradient-text font-display text-6xl font-bold">你好</span>
        <span className="flex flex-col text-left text-xs text-subtle">
          <span className="font-semibold text-muted">nǐ hǎo</span>
          <span>hello</span>
        </span>
      </div>
    );
  }

  const svg = (children: React.ReactNode, viewBox = "0 0 240 120") => (
    <svg viewBox={viewBox} aria-hidden="true" className="h-full w-full" fill="none">
      {children}
    </svg>
  );

  if (kind === "deck-to-email") {
    // A slide deck becomes a formatted email: the Fed tool in one picture.
    return svg(
      <>
        <rect x="18" y="22" width="78" height="56" rx="6" className="fill-[var(--bg-raised)] stroke-[var(--border)]" strokeWidth="2" />
        <rect x="26" y="14" width="78" height="56" rx="6" className="fill-[var(--bg-raised)] stroke-[var(--fg-subtle)]" strokeWidth="2" />
        <rect x="36" y="26" width="40" height="6" rx="3" className="fill-[var(--accent)]" />
        <rect x="36" y="40" width="58" height="4" rx="2" className="fill-[var(--fg-subtle)]" opacity=".5" />
        <rect x="36" y="49" width="48" height="4" rx="2" className="fill-[var(--fg-subtle)]" opacity=".5" />
        <rect x="36" y="58" width="30" height="4" rx="2" className="fill-[var(--fg-subtle)]" opacity=".5" />
        <path d="M114 46h22" className="stroke-[var(--text-red)]" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 5" />
        <circle cx="125" cy="46" r="11" className="fill-[var(--bg-raised)] stroke-[var(--text-red)]" strokeWidth="2" />
        <path d="m121 46 3 3 5-6" className="stroke-[var(--text-red)]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="146" y="18" width="78" height="60" rx="6" className="fill-[var(--bg-raised)] stroke-[var(--fg-subtle)]" strokeWidth="2" />
        <path d="m146 24 39 26 39-26" className="stroke-[var(--fg-subtle)]" strokeWidth="2" strokeLinejoin="round" />
        <rect x="158" y="88" width="54" height="5" rx="2.5" className="fill-[var(--text-gold)]" />
        <rect x="166" y="99" width="38" height="4" rx="2" className="fill-[var(--fg-subtle)]" opacity=".5" />
      </>,
    );
  }

  if (kind === "trend") {
    return svg(
      <>
        <defs>
          <linearGradient id="trend-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--grad-a)" stopOpacity=".35" />
            <stop offset="1" stopColor="var(--grad-a)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[30, 60, 90].map((y) => (
          <path key={y} d={`M12 ${y}h216`} className="stroke-[var(--border)]" strokeWidth="1" />
        ))}
        <path d="M12 92 L46 80 L80 86 L114 60 L148 66 L182 38 L228 22 L228 108 L12 108Z" fill="url(#trend-fill)" />
        <path d="M12 92 L46 80 L80 86 L114 60 L148 66 L182 38 L228 22" className="stroke-[var(--accent)]" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="228" cy="22" r="4.5" className="fill-[var(--text-gold)]" />
        <rect x="150" y="84" width="70" height="20" rx="10" className="fill-[var(--bg-raised)] stroke-[var(--border)]" />
        <text x="185" y="98" textAnchor="middle" className="fill-[var(--fg)]" fontSize="11" fontWeight="700">
          ▲ score
        </text>
      </>,
    );
  }

  // degree: progress toward graduation
  return svg(
    <>
      <path d="M120 18 72 40l48 22 48-22-48-22Z" className="fill-[var(--accent)]" opacity=".9" />
      <path d="M94 52v18c0 7 12 13 26 13s26-6 26-13V52" className="stroke-[var(--accent)]" strokeWidth="3" />
      <path d="M168 40v22" className="stroke-[var(--text-gold)]" strokeWidth="3" strokeLinecap="round" />
      <circle cx="168" cy="65" r="4" className="fill-[var(--text-gold)]" />
      <rect x="40" y="96" width="160" height="8" rx="4" className="fill-[var(--bg-sunken)] stroke-[var(--border)]" />
      <rect x="40" y="96" width="128" height="8" rx="4" className="fill-[var(--grad-b)]" />
    </>,
  );
}

function Now() {
  // Mid-month UTC, so the build date names the same month in every timezone.
  const now = new Date();
  const builtAt = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 15)).toISOString();

  return (
    <Section
      id="now"
      eyebrow={
        <>
          Now · <CurrentMonth builtAt={builtAt} />
        </>
      }
      title="What I'm working on"
    >
      {/* Bento: the day job leads wide, the side build sits tall beside it. */}
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {profile.now.map((item, i) => {
          const card = (
            <>
              <div
                className={`overflow-hidden border-[var(--border)] bg-[var(--bg-sunken)] ${
                  item.graphic === "resume-fit" ? "" : "h-36 px-6 py-4"
                } ${i === 0 ? "border-b lg:h-auto lg:w-1/2 lg:shrink-0 lg:border-b-0 lg:border-r lg:py-10" : "border-b"}`}
              >
                <NowGraphic kind={item.graphic} />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                  {item.kicker}
                </p>
                <h3 className="mt-1.5 font-display text-lg font-bold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                <p className="mt-auto flex items-center justify-between gap-3 pt-4 text-xs text-subtle">
                  {item.where}
                  {"href" in item && (
                    <span aria-hidden="true" className="font-semibold text-[var(--accent)]">
                      See it →
                    </span>
                  )}
                </p>
              </div>
            </>
          );
          // The lead card lies on its side at desktop width: graphic left, words right.
          const className = `surface lift flex h-full flex-col overflow-hidden rounded-2xl ${
            i === 0 ? "lg:flex-row" : ""
          }`;
          return (
            <Reveal
              as="li"
              key={item.title}
              className={i === 0 ? "md:col-span-2 lg:col-span-2" : ""}
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              {"href" in item ? (
                <a href={item.href} className={className}>
                  {card}
                </a>
              ) : (
                <div className={className}>{card}</div>
              )}
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

/* ---------------------------------------------------------------- work ---- */

/* Each lane carries one flag colour through its label, glow, and numbers, so
   you always know which room you're in while scrolling. */
const laneColor: Record<string, string> = {
  build: "var(--accent)",
  automate: "var(--text-violet)",
  analyze: "var(--text-gold)",
};

function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="ambient relative border-y border-[var(--border)] bg-[var(--bg-sunken)]"
    >
      <div className="relative mx-auto max-w-5xl px-5 py-20 sm:py-24">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
          Selected work
        </p>
        <h2 id="work-heading" className="max-w-4xl text-3xl font-bold leading-tight sm:text-5xl">
          The same job, in <span className="gradient-text">four different rooms</span>
        </h2>
        <p className="mt-5 max-w-2xl text-muted">
          A hospital contracts office, a county elections program, big tech,
          and a federal bank. Wherever I go, I analyze the work, find the
          bottlenecks, and build the tools that remove them.
        </p>

        <nav aria-label="Work areas" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {lanes.map((lane, i) => (
              <li key={lane.id}>
                <a
                  href={`#${lane.id}`}
                  className="lift inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-raised)] px-4 py-2 text-sm font-semibold"
                >
                  <span className="font-mono text-xs" style={{ color: laneColor[lane.id] }}>
                    0{i + 1}
                  </span>
                  {lane.label}
                  <span className="text-xs font-normal text-subtle">
                    {lane.items.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-16 space-y-24">
          {lanes.map((lane, i) => (
            <LaneBlock key={lane.id} lane={lane} index={i} />
          ))}
        </div>

        <MoreBuilds />
      </div>
    </section>
  );
}

function LaneBlock({ lane, index }: { lane: Lane; index: number }) {
  return (
    <div
      id={lane.id}
      className="scroll-mt-20 lg:grid lg:grid-cols-[200px_1fr] lg:gap-12"
      style={{ ["--lane" as string]: laneColor[lane.id] }}
    >
      {/* The label rides along beside its projects. */}
      <div className="mb-8 lg:sticky lg:top-24 lg:mb-0 lg:self-start">
        <p className="font-mono text-sm font-semibold text-[var(--lane)]">
          0{index + 1} / 0{lanes.length}
        </p>
        <h3 className="mt-1 font-display text-4xl font-bold">{lane.label}</h3>
        <span
          aria-hidden="true"
          className="mt-4 block h-1 w-12 rounded-full bg-[var(--lane)]"
        />
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          {lane.thesis}
        </p>
      </div>

      <div className="space-y-8">
        {lane.items.map((item) => (
          <CaseStudy key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}

function Visual({ visual, featured }: { visual: WorkItem["visual"]; featured?: boolean }) {
  if (visual.kind === "shot") {
    const sizes = featured
      ? "(max-width: 1024px) 100vw, 720px"
      : "(max-width: 768px) 100vw, 400px";
    // On hover the screenshot slowly pans to its bottom edge, so a tall app
    // screen shows more of itself than the crop allows.
    const img = "case-pan aspect-[16/10] w-full object-cover object-top";
    if (visual.more?.length) {
      const { src, alt, width, height } = visual;
      return (
        <BrowserFrame url={visual.url} className="shadow-lift">
          <ShotCarousel
            shots={[{ src, alt, width, height }, ...visual.more]}
            sizes={sizes}
            className={img}
          />
        </BrowserFrame>
      );
    }
    return (
      <BrowserFrame url={visual.url} className="shadow-lift">
        <Image
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          sizes={sizes}
          className={`${img} ${visual.srcDark ? "only-light" : ""}`}
        />
        {visual.srcDark && (
          <Image
            src={visual.srcDark}
            alt={visual.alt}
            width={1440}
            height={900}
            sizes={sizes}
            className={`${img} only-dark`}
          />
        )}
      </BrowserFrame>
    );
  }

  if (visual.kind === "flow") {
    // Laid out like the n8n canvas it was built on: steps left to right on a
    // dotted grid, and a decision's outputs stacked on its right. Positions
    // are percentages of the diagram box, so the SVG connectors underneath
    // land exactly on the node centres at any width.
    const branches = visual.branches ?? [];
    const cols = visual.steps.length + (branches.length ? 1 : 0);
    const x = (i: number) => ((i + 0.5) / cols) * 100;
    const nodes = [
      ...visual.steps.map((label, i) => ({
        label,
        when: undefined as string | undefined,
        x: x(i),
        y: 50,
        dot:
          i === 0
            ? "bg-[var(--text-green)]"
            : i === visual.steps.length - 1 && !branches.length
              ? "bg-[var(--text-gold)]"
              : "bg-[var(--accent)]",
      })),
      ...branches.map((b, i) => ({
        label: b.label,
        when: b.when,
        x: x(visual.steps.length),
        y: branches.length === 1 ? 50 : 22 + (56 / (branches.length - 1)) * i,
        dot: i === 0 ? "bg-[var(--text-green)]" : "bg-[var(--text-gold)]",
      })),
    ];
    const last = visual.steps.length - 1;
    const links = [
      ...visual.steps.slice(1).map((_, i) => [i, i + 1] as const),
      ...branches.map((_, i) => [last, visual.steps.length + i] as const),
    ];

    return (
      <Reveal className="viz flex aspect-[16/10] flex-col justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-sunken)] bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] px-3 sm:px-4">
        <div className="relative aspect-[16/7] w-full" role="group" aria-label="Workflow steps">
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full"
            fill="none"
          >
            {links.map(([from, to]) => {
              const A = nodes[from];
              const B = nodes[to];
              const mid = (A.x + B.x) / 2;
              return (
                <path
                  key={`${from}-${to}`}
                  d={`M${A.x} ${A.y}C${mid} ${A.y} ${mid} ${B.y} ${B.x} ${B.y}`}
                  stroke="var(--fg-subtle)"
                  strokeOpacity="0.55"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>
          {nodes.map((n, i) => (
            <div
              key={n.label}
              className="viz-cell absolute flex w-[23%] -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: `${n.x}%`, top: `${n.y}%`, ["--i" as string]: i * 3 }}
            >
              <span className="shadow-lift flex w-full flex-col items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--bg-raised)] px-1.5 py-1.5 text-center">
                <span aria-hidden="true" className={`size-2 rounded-full ${n.dot}`} />
                <span className="text-[10.5px] font-semibold leading-tight">
                  {n.when && <span className="text-subtle">{n.when}: </span>}
                  {n.label}
                </span>
              </span>
            </div>
          ))}
        </div>

        <p className="mt-3 flex items-center gap-2 text-sm font-semibold">
          {visual.icon && <ToolIcon icon={visual.icon} className="size-4 text-[#ea4b71]" />}
          {visual.label}
        </p>
        {visual.sub && <p className="mt-0.5 text-xs text-subtle">{visual.sub}</p>}
      </Reveal>
    );
  }

  return <DataViz visual={visual} />;
}

/* Numbers drawn as pictures of themselves. Decorative: the value and label
   beside each drawing carry the meaning for screen readers. */
function DataViz({ visual }: { visual: Extract<WorkItem["visual"], { kind: "viz" }> }) {
  let chart: React.ReactNode;

  if (visual.chart === "people") {
    chart = (
      <div aria-hidden="true" className="grid grid-cols-10 gap-x-1.5 gap-y-2">
        {Array.from({ length: visual.n ?? 30 }, (_, i) => (
          <svg
            key={i}
            viewBox="0 0 16 20"
            className="viz-cell w-full text-[var(--lane)]"
            style={{ ["--i" as string]: i }}
          >
            <circle cx="8" cy="5" r="4" fill="currentColor" />
            <path d="M1 19c0-4.4 3.1-7.5 7-7.5s7 3.1 7 7.5" fill="currentColor" opacity=".75" />
          </svg>
        ))}
      </div>
    );
  } else if (visual.chart === "drop") {
    const after = visual.n ?? 33;
    chart = (
      <div aria-hidden="true" className="flex h-full items-end gap-5">
        {[
          { label: "Before", h: 100, tone: "bg-[var(--fg-subtle)] opacity-40" },
          { label: "After", h: after, tone: "bg-[var(--lane)]" },
        ].map((bar, i) => (
          <div key={bar.label} className="flex h-full flex-1 flex-col justify-end">
            <div
              className={`viz-bar w-full rounded-t-lg ${bar.tone}`}
              style={{ height: `${bar.h}%`, ["--i" as string]: i * 6 }}
            />
            <p className="mt-2 text-xs font-semibold text-subtle">{bar.label}</p>
          </div>
        ))}
      </div>
    );
  } else {
    chart = (
      <div aria-hidden="true" className="grid grid-cols-10 gap-1">
        {Array.from({ length: 100 }, (_, i) => (
          <span
            key={i}
            className="viz-flip aspect-[3/4] rounded-[3px] border border-[var(--lane)] bg-[var(--lane)]"
            style={{ ["--i" as string]: i % 10 + Math.floor(i / 10) }}
          />
        ))}
      </div>
    );
  }

  return (
    <Reveal className="viz relative grid aspect-[16/10] grid-cols-[1fr_1.15fr] items-center gap-5 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-raised)] p-5 sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 -top-10 size-48 rounded-full bg-[var(--lane)] opacity-15 blur-3xl"
      />
      <div className="relative">
        <p className="font-display text-4xl font-bold leading-none text-[var(--lane)] sm:text-5xl">
          {visual.value}
        </p>
        <p className="mt-3 text-sm font-semibold leading-snug">{visual.label}</p>
        {visual.sub && <p className="mt-1 text-xs text-subtle">{visual.sub}</p>}
      </div>
      <div className="relative h-full max-h-40 self-center">{chart}</div>
    </Reveal>
  );
}

function CaseStudy({ item }: { item: WorkItem }) {
  const links = item.links.map((link) => (
    <a
      key={link.label}
      href={link.href}
      target={link.href.startsWith("#") ? undefined : "_blank"}
      rel={link.href.startsWith("#") ? undefined : "noreferrer noopener"}
      className={
        link.primary
          ? "inline-flex items-center gap-1.5 rounded-full bg-[var(--fg)] px-4 py-2 text-sm font-semibold text-[var(--bg)] transition-opacity hover:opacity-85"
          : "text-sm font-semibold text-muted underline-offset-4 hover:underline"
      }
    >
      {link.label} <span aria-hidden="true">↗</span>
    </a>
  ));

  return (
    <Reveal
      as="article"
      className="case group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-raised)]"
    >
      {/* Lane-coloured light from the top edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(60%_100%_at_50%_0%,color-mix(in_oklab,var(--lane)_18%,transparent),transparent)]"
      />

      <div
        className={`relative ${
          item.featured ? "" : "md:grid md:grid-cols-[1.1fr_1fr] md:items-center"
        }`}
      >
        <div className="case-visual p-3 sm:p-4">
          <Visual visual={item.visual} featured={item.featured} />
        </div>

        <div className={`px-5 pb-6 sm:px-7 ${item.featured ? "pt-2 sm:pb-7" : "pt-2 md:py-6 md:pl-2"}`}>
          {/* Featured cards keep a right column for the numbers — only when
              there are numbers to put in it. */}
          <div className={item.featured && item.metrics ? "md:grid md:grid-cols-[1.35fr_1fr] md:gap-8" : ""}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
                {item.where} · {item.period}
              </p>
              <h4 className="mt-2 font-display text-2xl font-bold leading-tight">
                {item.name}
              </h4>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {item.tagline}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {item.results.map((result) => (
                  <li
                    key={result}
                    className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-muted"
                  >
                    {result}
                  </li>
                ))}
              </ul>
            </div>

            {item.metrics && (
              <dl
                className={`mt-5 grid gap-x-5 gap-y-3 ${
                  item.featured ? "grid-cols-3 md:mt-0 md:grid-cols-1 md:content-start" : "grid-cols-2"
                }`}
              >
                {item.metrics.map((m) => (
                  // dt before dd for valid markup; column-reverse puts the number on top.
                  <div key={m.label} className="flex flex-col-reverse border-l-2 border-[var(--lane)] pl-3">
                    <dt className="mt-1 text-xs text-subtle">{m.label}</dt>
                    <dd className="font-display text-xl font-bold leading-none sm:text-2xl">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {(links.length > 0 || item.notes.length > 0) && (
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              {links}
              {item.notes.length > 0 && (
                <details className="group/notes w-full">
                  <summary className="flex cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="transition-transform duration-200 group-open/notes:rotate-90"
                    >
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                    The thinking behind it
                  </summary>
                  <dl className="notes mt-4 space-y-4 border-l-2 border-[var(--border)] pl-4">
                    {item.notes.map((note) => (
                      <div key={note.label}>
                        <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--lane)]">
                          {note.label}
                        </dt>
                        <dd className="mt-1 max-w-[62ch] text-sm leading-relaxed text-muted">
                          {note.body}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </details>
              )}
            </div>
          )}

          <p className="mt-5 border-t border-[var(--border)] pt-4 font-mono text-[11px] text-subtle">
            {item.stack.join("  ·  ")}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* Smaller builds and coursework, as one quiet list — the live ones already
   have screenshots in the reel up top, so repeating them here was noise. */
function MoreBuilds() {
  return (
    <div className="mt-24">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-t-2 border-[var(--fg)] pt-5">
        <h3 className="font-display text-xl font-bold">More builds</h3>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noreferrer noopener"
          className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
        >
          All of it on GitHub ↗
        </a>
      </div>
      <ul className="mt-2 grid sm:grid-cols-2 sm:gap-x-10">
        {smallerWork.map((item) => {
          const href = item.live || item.href;
          const body = (
            <>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{item.name}</span>
                <span className="block text-sm text-muted">{item.note}</span>
              </span>
              <span className="flex shrink-0 items-center gap-3 text-xs text-subtle">
                {item.year}
                {href && (
                  <span aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                )}
              </span>
            </>
          );
          const row = "group flex items-start justify-between gap-4 border-b border-[var(--border)] py-4";
          return (
            <li key={item.name}>
              {href ? (
                <a href={href} target="_blank" rel="noreferrer noopener" className={`${row} hover:text-[var(--accent)]`}>
                  {body}
                </a>
              ) : (
                <div className={row}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------- create ---- */

const craftIcons: Record<Craft["icon"], React.ReactNode> = {
  teach: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.6" />
      <path d="M7 20l2-4M17 20l-2-4" />
      <path d="M7 9h6M7 12h4" />
    </>
  ),
  camera: (
    <>
      <rect x="2.5" y="6.5" width="13" height="11" rx="2" />
      <path d="m15.5 10.5 6-3.5v10l-6-3.5" />
    </>
  ),
  cut: (
    <>
      <circle cx="6" cy="6" r="2.6" />
      <circle cx="6" cy="18" r="2.6" />
      <path d="M8.2 7.6 20 17M8.2 16.4 20 7" />
    </>
  ),
  demo: (
    <>
      <path d="M4 18 9.5 12.5l3.5 3.5L20 9" />
      <path d="M15 9h5v5" />
    </>
  ),
};

function Create() {
  return (
    <section
      id="create"
      aria-labelledby="create-heading"
      className="relative overflow-hidden border-t border-[var(--border)]"
    >
      <div
        aria-hidden="true"
        className="hero-wash pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-70"
      />
      <div className="relative mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
          Creative · Teaching · Video
        </p>
        <h2 id="create-heading" className="text-2xl font-bold sm:text-4xl">
          I teach what I learn —{" "}
          <span className="gradient-text">on camera.</span>
        </h2>

        {/* Channel + featured video */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="shadow-lift overflow-hidden rounded-2xl border border-[var(--border)] bg-black">
            <div className="relative aspect-video">
              <VideoPlayer
                id={featuredVideo.id}
                title={featuredVideo.title}
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[var(--bg-raised)] px-4 py-3">
              <p className="text-sm font-semibold">{featuredVideo.title}</p>
              <p className="text-xs text-subtle">
                {featuredVideo.tag} · {featuredVideo.length}
              </p>
            </div>
          </div>

          <div className="surface flex flex-col rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Image
                src={channel.avatar}
                alt=""
                width={56}
                height={56}
                className="size-14 rounded-full border border-[var(--border)]"
              />
              <div>
                <p className="font-display text-lg font-bold leading-tight">
                  {channel.name}
                </p>
                <p className="text-sm text-subtle">{channel.handle} on YouTube</p>
              </div>
            </div>

            <dl className="mt-6 grid flex-1 content-start grid-cols-2 gap-x-4 gap-y-5">
              {channel.stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs text-subtle">{s.label}</dt>
                  <dd className="font-display text-2xl font-bold leading-tight">
                    <CountUp value={s.value} suffix={s.suffix} plain={s.plain} />
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href={channel.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#c4302b] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
                <path d="M8 5v14l11-7z" />
              </svg>
              Visit the channel
            </a>
          </div>
        </div>

        {/* Thumbnails */}
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {videos.map((v) => (
            <li key={v.id}>
              <a
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noreferrer noopener"
                className="lift group block overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-raised)]"
              >
                <span className="relative block aspect-video overflow-hidden bg-black">
                  <Image
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-semibold text-white">
                    {v.length}
                  </span>
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-[#1a1a1c]">
                    {v.tag}
                  </span>
                </span>
                <span className="block p-3">
                  <span className="line-clamp-2 text-sm font-semibold leading-snug">
                    {v.title}
                  </span>
                  <span className="mt-1 block text-xs text-subtle">
                    {v.views} views
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* The skills the channel proves — a strip of receipts, not essays. */}
        <h3 className="mt-14 text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
          Side skills that show up in the day job
        </h3>
        <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {crafts.map((craft, i) => (
            <Reveal
              key={craft.title}
              as="li"
              className="surface lift group relative overflow-hidden rounded-2xl p-5"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-[var(--grad-b)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
              />
              <div className="flex items-center gap-2 text-[var(--text-red)]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                >
                  {craftIcons[craft.icon]}
                </svg>
                <h4 className="text-xs font-semibold uppercase tracking-[0.14em]">{craft.title}</h4>
              </div>
              <p className="mt-3 font-display text-3xl font-bold leading-none">
                <span className="gradient-text">{craft.stat}</span>
              </p>
              <p className="mt-2 text-sm leading-snug text-muted">{craft.line}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- toolbox ---- */

function Toolbox() {
  return (
    <section
      id="toolbox"
      aria-labelledby="toolbox-heading"
      className="ambient relative border-y border-[var(--border)] bg-[var(--bg-sunken)]"
    >
      <div className="mx-auto max-w-5xl px-5 py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
              Skills
            </p>
            <h2 id="toolbox-heading" className="text-3xl font-bold leading-tight sm:text-5xl">
              One brain, <span className="gradient-text">five clusters</span>
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              I&apos;m a generalist on purpose — the connections are the point.
              Every skill says where I actually used it.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <Skills />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- experience ---- */

/* Placeholder marks, one per room — a real logo can replace any of these
   without touching the layout. Stroke-based on a 24px grid so they scale and
   recolour with the tile. */
const glyphs: Record<RoleIcon | "cap", React.ReactNode> = {
  bank: (
    <>
      <path d="M3 9 12 4l9 5" />
      <path d="M5.5 9.5v8" />
      <path d="M10 9.5v8" />
      <path d="M14 9.5v8" />
      <path d="M18.5 9.5v8" />
      <path d="M3 20h18" />
    </>
  ),
  ballot: (
    <>
      <rect x="3.5" y="10.5" width="17" height="9.5" rx="1.6" />
      <path d="M8 10.5V4.5h8v6" />
      <path d="m10.2 7.3 1.5 1.5 2.9-3" />
    </>
  ),
  robot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="3.2" />
      <path d="M12 4.8V8" />
      <circle cx="12" cy="3.7" r="1.1" />
      <circle cx="9.2" cy="13" r="1" />
      <circle cx="14.8" cy="13" r="1" />
      <path d="M9.6 16.6h4.8" />
    </>
  ),
  network: (
    <>
      <circle cx="5.6" cy="17" r="2.3" />
      <circle cx="12" cy="6" r="2.3" />
      <circle cx="18.4" cy="17" r="2.3" />
      <path d="M7.3 15.3 10.7 8" />
      <path d="M13.3 8l3.4 7.3" />
      <path d="M7.9 17h8.2" />
    </>
  ),
  records: (
    <>
      <path d="M8 3.5h5.5L18 8v10.5A1.5 1.5 0 0 1 16.5 20h-8.5A1.5 1.5 0 0 1 6.5 18.5V5A1.5 1.5 0 0 1 8 3.5z" />
      <path d="M13.5 3.5V8H18" />
      <path d="M9.5 12.5h5" />
      <path d="M9.5 15.8h3.5" />
    </>
  ),
  cap: (
    <>
      <path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4z" />
      <path d="M6.8 10.9V16c0 1.4 2.3 2.6 5.2 2.6s5.2-1.2 5.2-2.6v-5.1" />
      <path d="M21.5 8.5v5" />
    </>
  ),
};

function Glyph({ name }: { name: RoleIcon | "cap" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-6"
    >
      {glyphs[name]}
    </svg>
  );
}

/* The short version: one tile per role, the one number worth knowing, and a
   door to LinkedIn for everything else. The bullets in experience.ts are kept
   as the source for the résumé, they just don't need to be read here. */
function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Five rooms, one job"
      lede="The short version — newest first. The long one lives on LinkedIn."
    >
      <Reveal className="viz relative">
        {/* The rail, in the signature gradient: horizontal through the tiles
            at desktop width, vertical down the left edge below it. */}
        <div
          aria-hidden="true"
          className="gradient-band absolute inset-x-6 top-[27px] hidden h-0.5 rounded-full opacity-60 lg:block"
        />
        <div
          aria-hidden="true"
          className="gradient-band-y absolute bottom-6 left-[23px] top-6 w-0.5 rounded-full opacity-60 lg:hidden"
        />
        <ol className="relative grid gap-4 lg:grid-cols-5 lg:gap-3">
          {experience.map((role, i) => {
            const current = role.period.includes("present");
            return (
              <li
                key={role.company}
                className="viz-cell flex gap-4 lg:flex-col lg:gap-0"
                style={{ ["--i" as string]: i * 3 }}
              >
                <span
                  aria-hidden="true"
                  className={`relative flex size-12 shrink-0 items-center justify-center rounded-2xl border lg:size-14 ${
                    current
                      ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] shadow-lift"
                      : "border-[var(--border)] bg-[var(--bg-raised)] text-muted"
                  }`}
                >
                  <Glyph name={role.icon} />
                </span>
                <div className="surface lift flex min-w-0 flex-1 flex-col rounded-2xl p-4 lg:mt-4">
                  <p className="text-xs text-subtle">{role.period}</p>
                  <h3 className="mt-1.5 font-display text-base font-bold leading-snug">
                    {role.company}
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-snug text-muted">
                    {role.title}
                  </p>
                  <div className="mt-auto pt-4">
                    {current ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--bg-sunken)] px-2.5 py-1 text-[11px] font-semibold">
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
                        Current
                      </span>
                    ) : null}
                    {role.highlight && (
                      <p className={`text-sm font-bold leading-snug ${current ? "mt-2" : ""}`}>
                        {role.highlight}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </Reveal>

      <p className="mt-6 text-sm text-subtle">{earlierRoles}</p>

      <div className="mt-10 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div className="flex gap-4">
          <span
            aria-hidden="true"
            className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--bg-sunken)] text-muted"
          >
            <Glyph name="cap" />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold">
              <span className="gradient-text">{education.school}</span>
            </h3>
            <p className="text-sm text-muted">
              {education.degree} · {education.period}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.certifications.map((cert) => (
                <li
                  key={cert}
                  className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-muted"
                >
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-fg)] transition-opacity hover:opacity-90"
        >
          Full history on LinkedIn <span aria-hidden="true">↗</span>
        </a>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------- testimonials ---- */

/** Marks one phrase inside a quote like a highlighter pen. */
function Highlight({ text, mark }: { text: string; mark: string }) {
  const at = text.indexOf(mark);
  if (at === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <mark className="quote-mark">{mark}</mark>
      {text.slice(at + mark.length)}
    </>
  );
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /^[a-z]/i.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

function Attribution({ t, large }: { t: Testimonial; large?: boolean }) {
  return (
    <figcaption className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className={`flex shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--grad-a),var(--grad-b)_60%,var(--grad-c))] font-display font-bold text-white ${
          large ? "size-12 text-base" : "size-10 text-sm"
        }`}
      >
        {initials(t.author)}
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold">{t.author}</span>
          <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[11px] font-semibold text-muted">
            {t.org}
          </span>
        </span>
        <span className="block text-xs text-subtle">{t.role}</span>
      </span>
    </figcaption>
  );
}

function FullNote({ t }: { t: Testimonial }) {
  return (
    <details className="group/note mt-5">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-xs font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-200 group-open/note:rotate-90"
        >
          <path d="m9 6 6 6-6 6" />
        </svg>
        Read the full note
      </summary>
      <p className="notes mt-3 border-l-2 border-[var(--border)] pl-4 text-sm leading-relaxed text-muted">
        &ldquo;{t.quote}&rdquo;
        {t.context && <span className="mt-2 block text-xs text-subtle">{t.context}</span>}
      </p>
    </details>
  );
}

function Testimonials() {
  const featured = testimonials.find((t) => t.featured) ?? testimonials[0];
  const rest = testimonials.filter((t) => t !== featured);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="ambient relative border-t border-[var(--border)]"
    >
      <div className="mx-auto max-w-5xl px-5 py-20 sm:py-24">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
          References
        </p>
        <h2 id="testimonials-heading" className="text-3xl font-bold leading-tight sm:text-5xl">
          In their <span className="gradient-text">words</span>
        </h2>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.45fr_1fr]">
          {/* The one line that says the most, set large. */}
          <Reveal as="article" className="surface shadow-lift relative flex flex-col overflow-hidden rounded-3xl p-7 sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-[var(--grad-b)] opacity-10 blur-3xl"
            />
            <span
              aria-hidden="true"
              className="gradient-text font-display text-8xl font-bold leading-[0.6]"
            >
              &ldquo;
            </span>
            <figure className="relative mt-4 flex flex-1 flex-col">
              <blockquote className="flex-1 font-display text-2xl font-semibold leading-snug sm:text-3xl">
                <Highlight text={featured.pull} mark={featured.highlight} />
              </blockquote>
              <div className="mt-8">
                <Attribution t={featured} large />
              </div>
            </figure>
            <FullNote t={featured} />
          </Reveal>

          <div className="grid gap-5">
            {rest.map((t, i) => (
              <Reveal
                key={t.author}
                as="article"
                className="surface lift flex flex-col rounded-3xl p-6"
                style={{ transitionDelay: `${(i + 1) * 110}ms` }}
              >
                <figure className="flex flex-1 flex-col">
                  <blockquote className="flex-1 text-lg font-medium leading-snug">
                    &ldquo;<Highlight text={t.pull} mark={t.highlight} />&rdquo;
                  </blockquote>
                  <div className="mt-5">
                    <Attribution t={t} />
                  </div>
                </figure>
                <FullNote t={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- contact ---- */

/* A footer, not a second hero: smaller type, a flat surface, the question on
   the left and the ways to answer it on the right. */
function Contact() {
  const socials = [
    { label: "LinkedIn", href: profile.links.linkedin, icon: "linkedin" },
    { label: "GitHub", href: profile.links.github, icon: "github" },
    { label: "YouTube", href: channel.url, icon: "youtube" },
  ];

  return (
    <footer id="contact" className="border-t border-[var(--border)] bg-[var(--bg-sunken)]">
      <div className="mx-auto max-w-5xl px-5 pb-8 pt-16 sm:pt-20">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
              Your turn
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Have something worth <mark className="quote-mark">improving?</mark>
            </h2>
            {/* One paragraph: the ask, the roles (set in the foreground colour so
                they scan without chips), and the kind of team. */}
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              {profile.lookingFor.lead} Open to{" "}
              {profile.lookingFor.roles.map((role, i, all) => (
                <span key={role}>
                  <span className="font-semibold text-[var(--fg)]">{role.toLowerCase()}</span>
                  {i < all.length - 2 ? ", " : i === all.length - 2 ? ", or " : ". "}
                </span>
              ))}
              {profile.lookingFor.team}
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm text-muted">
              <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-emerald-500" />
              {profile.openTo}
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-fg)] transition-opacity hover:opacity-90"
              >
                Say hello
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              {/* <a
                href={profile.links.resume}
                className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold transition-colors hover:border-[var(--fg-subtle)]"
              >
                Résumé
              </a> */}
              <ul className="flex gap-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      title={s.label}
                      className="flex size-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-raised)] transition-colors hover:border-[var(--fg-subtle)]"
                    >
                      <ToolIcon icon={s.icon} className="size-[18px]" />
                      <span className="sr-only">{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <CopyEmail email={profile.email} />
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-6 text-xs text-subtle">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <a href="#top" className="font-semibold underline-offset-4 hover:text-[var(--fg)] hover:underline">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
