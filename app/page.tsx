import Image from "next/image";
import { Bold } from "@/components/Bold";
import { Nav } from "@/components/Nav";
import { Section } from "@/components/Section";
import { TypedGreeting } from "@/components/TypedGreeting";
import {
  earlierRoles,
  education,
  experience,
  type Role,
  type RoleIcon,
} from "@/content/experience";
import { profile } from "@/content/profile";
import { testimonials } from "@/content/testimonials";
import { lanes, smallerWork, type Lane, type WorkItem } from "@/content/work";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Now />
        <Work />
        <Experience />
        {/* <About /> */}
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}

/* ---------------------------------------------------------------- hero ---- */

function Hero() {
  return (
    <section className="hero-wash relative overflow-hidden border-b border-[var(--border)]">
      <div className="mx-auto max-w-5xl px-5 pb-20 pt-16 sm:pb-28 sm:pt-24">
        <TypedGreeting greetings={profile.greetings} />

        <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.12] sm:text-5xl">
          I&apos;m {profile.name}.{" "}
          <span className="text-muted">{profile.headline}</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">
          {profile.subhead}
        </p>

        <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-raised)] px-4 py-1.5 text-sm">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-emerald-500"
          />
          {profile.availability}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#work"
            className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-fg)] transition-opacity hover:opacity-90"
          >
            See my work
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
      </div>
      <div aria-hidden="true" className="gradient-band h-1 w-full" />
    </section>
  );
}

/* ----------------------------------------------------------------- now ---- */

function Now() {
  return (
    <Section
      id="now"
      eyebrow={`Now · ${profile.now.updated}`}
      title="What I'm working on"
    >
      <ul className="space-y-4 border-l-2 border-[var(--border)] pl-5">
        {profile.now.lines.map((line) => (
          <li key={line} className="max-w-2xl text-muted">
            <Bold text={line} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------------------------------------------------------------- work ---- */

function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="border-y border-[var(--border)] bg-[var(--bg-sunken)]"
    >
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
          Selected work
        </p>
        <h2 id="work-heading" className="text-2xl font-bold sm:text-3xl">
          The same job, in four different rooms
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          A hospital contracts office, a county elections program, big tech, and a federal bank. Wherever I go, I analyze the work, find the bottlenecks, and build tools to make it better. Here are some of the things I've built.
        </p>

        <div className="mt-14 space-y-16">
          {lanes.map((lane) => (
            <LaneBlock key={lane.id} lane={lane} />
          ))}
        </div>
          <ul className="mt-6 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {smallerWork.map((item) => (
              <li key={item.name} className="surface overflow-hidden rounded-xl">
                {item.shot && (
                  <Image
                    src={item.shot.src}
                    alt={item.shot.alt}
                    width={item.shot.width}
                    height={item.shot.height}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    className="aspect-[16/10] w-full border-b border-[var(--border)] object-cover object-top"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-baseline justify-between gap-3">
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm font-semibold underline-offset-4 hover:underline"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold">{item.name}</span>
                    )}
                    <span className="shrink-0 text-xs text-subtle">
                      {item.year}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted">{item.note}</p>
                </div>
              </li>
            ))}
          </ul>
      </div>
    </section>
  );
}

function LaneBlock({ lane }: { lane: Lane }) {
  return (
    <div id={lane.id} className="scroll-mt-24">
      <div className="mb-8 flex flex-col gap-3 border-t-2 border-[var(--fg)] pt-5 sm:flex-row sm:items-baseline sm:gap-8">
        <h3 className="shrink-0 font-display text-xl font-bold sm:w-40">
          {lane.label}
        </h3>
        <p className="max-w-2xl text-sm text-muted">{lane.thesis}</p>
      </div>

      {/* Featured item spans the row; the rest sit two-up so the lane reads as a
          grid of work rather than a stack of essays. */}
      <div className="grid gap-5 md:grid-cols-2">
        {lane.items.map((item) => (
          <div key={item.slug} className={item.featured ? "md:col-span-2" : ""}>
            <WorkCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Visual({ visual, featured }: { visual: WorkItem["visual"]; featured?: boolean }) {
  if (visual.kind === "shot") {
    return (
      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-sunken)]">
        <Image
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          sizes={featured ? "(max-width: 640px) 100vw, 640px" : "(max-width: 640px) 100vw, 460px"}
          className="aspect-[16/10] w-full object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div className="hero-wash flex aspect-[16/10] flex-col justify-center rounded-xl border border-[var(--border)] px-6">
      <p
        className={`gradient-text font-display font-bold leading-none ${
          featured ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"
        }`}
      >
        {visual.value}
      </p>
      <p className="mt-3 text-sm font-semibold">{visual.label}</p>
      {visual.sub && <p className="mt-1 text-xs text-subtle">{visual.sub}</p>}
    </div>
  );
}


function WorkCard({ item }: { item: WorkItem }) {
  return (
    <article
      className={`surface rounded-2xl p-5 sm:p-6 ${
        item.featured ? "ring-1 ring-[var(--accent)]/25" : ""
      }`}
    >
      <div className={item.featured ? "gap-6 sm:grid sm:grid-cols-2" : ""}>
        <Visual visual={item.visual} featured={item.featured} />

        <div className={item.featured ? "mt-5 sm:mt-0" : "mt-5"}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h4 className={`font-bold ${item.featured ? "text-xl" : "text-lg"}`}>
              {item.name}
            </h4>
            <p className="text-xs text-subtle">{item.period}</p>
          </div>
          <p className="mt-1 text-sm font-medium text-subtle">{item.where}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {item.tagline}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {item.results.map((result) => (
              <li
                key={result}
                className="rounded-full bg-[var(--bg-sunken)] px-3 py-1 text-xs font-medium text-muted"
              >
                {result}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <details className="group mt-5 border-t border-[var(--border)] pt-4">
        <summary className="cursor-pointer text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
          The thinking behind it
        </summary>
        <dl className="mt-5 space-y-5">
          {item.notes.map((note) => (
            <div
              key={note.label}
              className="sm:grid sm:grid-cols-[8rem_1fr] sm:gap-4"
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle sm:pt-0.5">
                {note.label}
              </dt>
              <dd className="mt-1 max-w-[62ch] text-sm leading-relaxed text-muted sm:mt-0">
                {note.body}
              </dd>
            </div>
          ))}
        </dl>
      </details>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--border)] pt-4">
        {item.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("#") ? undefined : "_blank"}
            rel={link.href.startsWith("#") ? undefined : "noreferrer noopener"}
            className={`text-sm font-semibold underline-offset-4 hover:underline ${
              link.primary ? "text-[var(--accent)]" : "text-muted"
            }`}
          >
            {link.label} →
          </a>
        ))}
        <p className="ml-auto text-xs text-subtle">{item.stack.join(" · ")}</p>
      </div>
    </article>
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
      className="size-5 sm:size-6"
    >
      {glyphs[name]}
    </svg>
  );
}

function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've been (Building Range)"
      lede="Five rooms, one job. Newest first — open any role for the detail."
    >
      <div className="relative">
        {/* The rail, in two layers: a static track, and the signature gradient
            filling it as you scroll (see .xp-fill in globals.css). Decorative,
            so both stay out of the accessibility tree. */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-[19px] top-2 w-0.5 rounded-full bg-[var(--border)] sm:left-[27px]"
        />
        <div
          aria-hidden="true"
          className="xp-fill gradient-band-y absolute bottom-0 left-[19px] top-2 w-0.5 origin-top rounded-full sm:left-[27px]"
        />

        <ol className="pl-14 sm:pl-[92px]">
          {experience.map((role) => (
            <TimelineNode key={role.company} role={role} />
          ))}

          <li className="xp-node relative">
            <span
              aria-hidden="true"
              className="absolute -left-14 top-1.5 flex size-10 items-center justify-center sm:-left-[92px] sm:size-14"
            >
              <span className="size-3.5 rounded-full border-2 border-dashed border-[var(--fg-subtle)] bg-[var(--bg)]" />
            </span>
            <p className="max-w-2xl pt-2 text-sm leading-relaxed text-subtle">
              {earlierRoles}
            </p>
          </li>
        </ol>
      </div>

      {/* Education terminates the line rather than trailing off beneath it, so
          the section closes where the story started. */}
      <div className="xp-node relative mt-11 pl-14 sm:pl-[92px]">
        <div
          aria-hidden="true"
          className="absolute -top-11 left-[19px] h-16 w-0.5 rounded-full bg-[var(--border)] sm:left-[27px] sm:h-18"
        />
        <div
          aria-hidden="true"
          className="xp-fill absolute -top-11 left-[19px] h-16 w-0.5 origin-top rounded-full bg-[var(--color-ph-yellow)] sm:left-[27px] sm:h-18"
        />
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-sunken)] text-muted sm:size-14 sm:rounded-2xl"
        >
          <Glyph name="cap" />
        </span>

        <div className="border-t-2 border-[var(--fg)] pt-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
            <h3 className="font-display text-xl font-bold">
              <span className="gradient-text">{education.school}</span>
            </h3>
            <p className="text-sm text-subtle">
              {education.period} · {education.location}
            </p>
          </div>
          <p className="mt-0.5 text-sm font-semibold text-muted">
            {education.degree}
          </p>
          <p className="mt-3 max-w-2xl text-muted">{education.note}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
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

      <div className="mt-14 grid gap-8 sm:grid-cols-3">
        {profile.skills.map((group) => (
          <div key={group.group}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
              {group.group}
            </h3>
            <ul className="space-y-1.5">
              {group.items.map((item) => (
                <li key={item} className="text-sm text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* One node on the rail. Bullets sit behind a disclosure so the section reads
   short — the summary and the one number carry the skim, the detail is a click
   away. The current role opens by default. */
function TimelineNode({ role }: { role: Role }) {
  const current = role.period.includes("present");

  return (
    <li className="xp-node relative pb-9">
      <span
        aria-hidden="true"
        className={`absolute -left-14 top-1 flex size-10 items-center justify-center rounded-xl sm:-left-[92px] sm:size-14 sm:rounded-2xl ${
          current
            ? "border border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)]"
            : "surface text-muted"
        }`}
      >
        <Glyph name={role.icon} />
      </span>

      <article className="surface rounded-2xl p-4 transition-[transform,border-color] duration-200 hover:border-[var(--fg-subtle)] hover:sm:translate-x-1 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
          <div className="flex items-center gap-2.5">
            <h3 className="font-display text-xl font-bold">{role.company}</h3>
            {current && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--bg-sunken)] px-2.5 py-0.5 text-[11px] font-semibold text-muted">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-emerald-500"
                />
                Current
              </span>
            )}
          </div>
          <p className="text-sm text-subtle">
            {role.period} · {role.location}
          </p>
        </div>

        <p className="mt-0.5 text-sm font-semibold text-muted">{role.title}</p>
        <p className="mt-3 max-w-2xl text-muted">{role.summary}</p>

        {(role.highlight || role.seeAlso) && (
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            {role.highlight && (
              <span className="rounded-full bg-[var(--bg-sunken)] px-3 py-1 text-xs font-semibold text-muted">
                {role.highlight}
              </span>
            )}
            {role.seeAlso && (
              <a
                href={role.seeAlso.href}
                className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
              >
                {role.seeAlso.label} →
              </a>
            )}
          </div>
        )}

        <details
          open={current}
          className="group xp-details mt-4 border-t border-[var(--border)] pt-4"
        >
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
              className="transition-transform duration-200 group-open:rotate-90"
            >
              <path d="m9 6 6 6-6 6" />
            </svg>
            What I did
          </summary>
          <ul className="mt-4 max-w-2xl space-y-2">
            {role.bullets.map((bullet) => (
              <li
                key={bullet}
                className="relative pl-5 text-sm text-muted before:absolute before:left-0 before:top-[0.6em] before:size-1.5 before:rounded-full before:bg-[var(--fg-subtle)]"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </details>
      </article>
    </li>
  );
}

/* -------------------------------------------------------- testimonials ---- */

function Testimonials() {
  return (
    <Section id="testimonials" eyebrow="References" title="What people say">
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.author}
            className="surface flex flex-col rounded-2xl p-6"
          >
            <blockquote className="flex-1 text-sm leading-relaxed text-muted">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 border-t border-[var(--border)] pt-4">
              <p className="text-sm font-semibold">{testimonial.author}</p>
              <p className="text-sm text-subtle">{testimonial.role}</p>
              {testimonial.context && (
                <p className="mt-1 text-xs text-subtle">{testimonial.context}</p>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------- contact ---- */

function Contact() {
  return (
    <footer id="contact" className="border-t border-[var(--border)]">
      <div aria-hidden="true" className="gradient-band h-1 w-full" />
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <h2 className="text-2xl font-bold sm:text-3xl">Let&apos;s talk</h2>
        <p className="mt-4 max-w-2xl text-muted">{profile.lookingFor}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-fg)] transition-opacity hover:opacity-90"
          >
            {profile.email}
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold transition-colors hover:border-[var(--fg-subtle)]"
          >
            LinkedIn
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold transition-colors hover:border-[var(--fg-subtle)]"
          >
            GitHub
          </a>
          {/* <a
            href={profile.links.resume}
            className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold transition-colors hover:border-[var(--fg-subtle)]"
          >
            Résumé
          </a> */}
        </div>

        <p className="mt-14 text-xs text-subtle">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js and
          Tailwind —{" "}
          <a
            href="https://github.com/roseylikeme/portfolio"
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-4"
          >
            source
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
