import Image from "next/image";
import { Bold } from "@/components/Bold";
import { Nav } from "@/components/Nav";
import { Section } from "@/components/Section";
import { TypedGreeting } from "@/components/TypedGreeting";
import { earlierRoles, education, experience } from "@/content/experience";
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
          A hospital contracts office, a county elections program, a big tech
          marketing org, and a federal bank. Grouped below by the kind of
          thinking each one took, rather than by job title.
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

function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've been (Building Range)"
    >
      <div className="space-y-10">
        {experience.map((role) => (
          <article key={role.company}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-semibold">
                {role.title} ·{" "}
                <span className="gradient-text">{role.company}</span>
              </h3>
              <p className="text-sm text-subtle">
                {role.period} · {role.location}
              </p>
            </div>
            <p className="mt-2 max-w-2xl text-muted">{role.summary}</p>
            <ul className="mt-3 max-w-2xl space-y-2">
              {role.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="relative pl-5 text-sm text-muted before:absolute before:left-0 before:top-[0.6em] before:size-1.5 before:rounded-full before:bg-[var(--fg-subtle)]"
                >
                  {bullet}
                </li>
              ))}
            </ul>
            {role.seeAlso && (
              <a
                href={role.seeAlso.href}
                className="mt-3 inline-block text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
              >
                {role.seeAlso.label} →
              </a>
            )}
          </article>
        ))}
      </div>

      <p className="mt-10 max-w-2xl border-l-2 border-[var(--border)] pl-5 text-sm text-subtle">
        {earlierRoles}
      </p>

      <div className="mt-14 border-t border-[var(--border)] pt-8">
        <h3 className="text-lg font-semibold">
          {education.degree} ·{" "}
          <span className="gradient-text">{education.school}</span>
        </h3>
        <p className="mt-1 text-sm text-subtle">
          {education.period} · {education.location}
        </p>
        <p className="mt-2 max-w-2xl text-muted">{education.note}</p>
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
