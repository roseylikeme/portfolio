

export type WorkLink = {
  label: string;
  href: string;
  /** Marks the link a recruiter should click first. */
  primary?: boolean;
};

export type Visual =
  | {
      kind: "shot";
      src: string;
      alt: string;
      width: number;
      height: number;
    }
  | { kind: "stat"; value: string; label: string; sub?: string };

export type WorkItem = {
  slug: string;
  name: string;
  /** The job, program, or context this came out of. */
  where: string;
  period: string;
  visual: Visual;
  /** One line, on the card face. Everything longer lives behind the disclosure. */
  tagline: string;
  /** Short outcome chips — numbers first. These carry the card at a skim. */
  results: string[];
  featured?: boolean;
  /** The full reasoning. Collapsed by default: depth on demand, not by default. */
  notes: { label: string; body: string }[];
  stack: string[];
  links: WorkLink[];
};

export type Lane = {
  id: string;
  label: string;
  /** One line on what this lane is claiming, before the evidence. */
  thesis: string;
  items: WorkItem[];
};

export const lanes: Lane[] = [
  /* ---------------------------------------------------------------- build -- */
  {
    id: "build",
    label: "Build",
    thesis:
      "I like building products and solutions. Helping marketers self-serve their campaigns @ LinkedIn, cutting manual effort through automation @ Federal Reserve Bank of San Francisco, and full products from concept to launch.",
    items: [
      {
        slug: "resume-fit-assistant",
        name: "Resume Fit Assistant",
        where: "Solo — product and engineering",
        period: "2026 — ongoing",
        tagline:
          "A web app and Chrome extension that score your résumé against a real job posting.",
        visual: {
          kind: "shot",
          src: "/shots/resume-fit-assistant.png",
          alt: "Resume Fit Assistant: a résumé editor on the left, a job posting on the right, and a match score with a breakdown of missing keywords.",
          width: 1600,
          height: 1000,
        },
        results: ["403 commits", "219 test files", "+1,281% skill coverage", "PRD → production"],
        featured: true,
        notes: [
          {
            label: "Problem",
            body: "Job seekers either hand-tailor a résumé for every application or don't tailor at all and lose to keyword filters. The tools that promise to fix this do one of two harmful things: they invent experience the candidate doesn't have, which becomes a real problem in an interview or a background check, or they auto-submit applications with no meaningful human review.",
          },
          {
            label: "Decision",
            body: "I wrote the non-goals before the features. It never auto-submits — permanently, not “deferred.” It never generates a résumé claim that isn't in the source résumé. Autofill exists, but only behind an explicit per-use click, never chained into a submit. Those three lines shaped every design decision downstream, and I turned down otherwise-obvious features that would have broken them.",
          },
          {
            label: "Build",
            body: "A pnpm monorepo: a Next.js app and a Chrome MV3 extension sharing seven workspace packages over Prisma/Postgres. The hard part wasn't the LLM calls — it was making extraction trustworthy across ATSs that don't agree on anything. Detecting when a posting was published, for instance, needed a four-rung ladder (JSON-LD → a <time> element with posting context → an absolute date in the body → a relative phrase like “Posted 3 days ago”), recording which rung answered, because an approximate date must never overwrite an exact one on re-capture.",
          },
          {
            label: "Outcome",
            body: "403 commits, ~74k lines of TypeScript, 219 test files. The full loop works end to end: capture a posting, parse it into must-have and nice-to-have requirements, score every résumé version with an explainable breakdown, see exactly which keywords are missing, edit, and export to PDF or DOCX. Seeding the skills taxonomy from O*NET improved skill coverage by 1,281%.",
          },
        ],
        stack: [
          "TypeScript",
          "Next.js",
          "Chrome MV3",
          "Prisma",
          "Postgres",
          "Vitest",
          "LLM extraction",
        ],
        links: [],
      },
      {
        slug: "fed-exec-summaries",
        name: "Deck-to-executive-summary automation",
        where: "Federal Reserve Bank of San Francisco",
        period: "2026",
        tagline:
          "A hybrid generative-AI and Excel VBA tool that turns Steering Committee decks into strictly formatted executive email summaries.",
        visual: {
          kind: "stat",
          value: "30+",
          label: "colleagues trained on AI adoption",
          sub: "Internal to the Fed — no public screenshot possible",
        },
        results: ["Steering Committee output", "AI drafts, VBA formats", "30+ trained"],
        notes: [
          {
            label: "Problem",
            body: "Summarizing decks for the Steering Committee was manual, repeated, and had to come out in exactly one format every time. The reading is the easy part; the formatting discipline is what made it expensive.",
          },
          {
            label: "Decision",
            // TODO(rose): confirm this framing — it's my read of "hybrid... strictly
            // formatted", and it's the sharpest thing in your Fed bullet. If the
            // reason you kept VBA in the loop was different, tell me and I'll fix it.
            body: "I didn't hand the whole job to the model. The generative half drafts the summary; the Excel VBA macros do the formatting, deterministically, because output going to a Steering Committee has to be exactly right rather than usually right. Then I treated AI adoption as part of the deliverable and trained 30+ colleagues on practical AI applications, including prompt engineering and structured extraction.",
          },
          {
            label: "Outcome",
            body: "Live internally, alongside Cash Contracts centralization and email automation workflows I stood up in Power Automate and SharePoint. 30+ cross-functional colleagues trained on practical AI use.",
          },
        ],
        stack: [
          "Generative AI",
          "Excel VBA",
          "Power Automate",
          "SharePoint",
        ],
        // Internal work at a federal bank — no public link, and that's the honest
        // state. Saying so beats a dead "#" link.
        links: [],
      },
      {
        slug: "poll-worker-table",
        name: "Poll Worker System data table",
        where: "Alameda County — Technical Specialist",
        period: "Jan — Mar 2024",
        tagline:
          "A reusable table for the system I was using every day at my county job, built because of poor user experience.",
        visual: {
          kind: "shot",
          src: "/shots/poll-worker-table.jpg",
          alt: "The Poll Worker System data table: a filter field, column toggle, export button, and a sortable table of poll-worker records.",
          width: 1600,
          height: 1000,
        },
        results: ["Live demo", "Filter · sort · paginate · hide columns", "Built for a system I used daily"],
        notes: [
          {
            label: "Problem",
            body: "I was recruiting poll workers out of a system whose tables were painful to work in.",
          },
          {
            label: "What I did",
            body: "Translated the user and stakeholder needs into a reusable data-table feature — defined the requirements, prioritized what shipped, and documented it. Responsive layout, better pagination, show/hide columns, filtering, and sorting, in TypeScript.",
          },
          {
            label: "Outcome",
            body: "A documented, reusable component that makes the data actually explorable. It's the clearest case of a pattern I keep repeating: use the thing, notice the friction, then go build the fix.",
          },
        ],
        stack: ["TypeScript", "React", "shadcn/ui"],
        links: [
          {
            label: "Live demo",
            href: "https://shadcn-ui-table.vercel.app/",
            primary: true,
          },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------- analyze -- */
  {
    id: "analyze",
    label: "Analyze",
    thesis:
      "Before I build anything I analyze the patterns in the data: What's working? What's not? Why? What are the real problems, and what can I do to remove them? I like to find the friction and remove it.",
    items: [
      {
        slug: "alameda-knowledge-base",
        name: "The knowledge base that stopped the calls",
        where: "Alameda County — Technical Specialist",
        period: "2024",
        tagline:
          "Analyzed what people were actually calling about, then removed the reason to call.",
        visual: {
          kind: "stat",
          value: "−67%",
          label: "inbound troubleshooting calls",
          sub: "After the knowledge base shipped",
        },
        results: ["−67% support calls", "160+ workers across 20+ sites", "Onboarding: 3 weeks → 1"],
        notes: [
          {
            label: "Problem",
            body: "Inbound troubleshooting calls were eating the team's day during an election cycle, while we were also recruiting 160+ workers across 20+ locations. The calls were treated as the workload rather than as a symptom.",
          },
          {
            label: "What I did",
            body: "Ran a data-driven pass over the incoming issues to find what was recurring, then built a standardized knowledge base against the actual distribution rather than against what we assumed people were stuck on. Documented the poll-working workflow the same way and used it to onboard 3 new recruits in one week instead of the usual two to three.",
          },
          {
            label: "Outcome",
            body: "Inbound troubleshooting calls down 67%. Separately, closed gaps in SPII handling that were creating cybersecurity and IT compliance risk.",
          },
        ],
        stack: ["Issue analysis", "Process documentation", "ATS", "SPII / IT compliance"],
        links: [],
      },
      {
        slug: "ucdavis-contract-migration",
        name: "5,000 contracts off paper",
        where: "UC Davis Health — Systems Support & Contracts",
        period: "2021 — 2022",
        tagline:
          "A paper-to-database migration that had to survive an audit, run by the person whose title said nothing about systems.",
        visual: {
          kind: "stat",
          value: "5,000+",
          label: "contracts moved off paper",
          sub: "−40% processing time, audit trail intact",
        },
        results: ["−40% processing time", "Audit traceability preserved", "15+ inquiries a day"],
        notes: [
          {
            label: "Problem",
            body: "Contracts lived on paper. Finding one meant searching physically, reporting on them meant counting by hand, and nothing about it was auditable. My title was Administrative Assistant 3; functionally I was the system administrator for the contract management system.",
          },
          {
            label: "What I did",
            body: "Migrated 5,000+ contracts into an electronic database with the audit trail intact — heavy data entry and cleanup, then queries against the new database to pull reporting that hadn't existed before. Managed user access and identity, and wrote the training and documentation so the rest of the office could work in the new system.",
          },
          {
            label: "Outcome",
            body: "Processing time down 40%, with better data accuracy and real audit traceability. This is the job where I figured out what I actually do — nobody asked me to rebuild the process, it was just obviously the thing that needed doing.",
          },
        ],
        stack: ["Database migration", "Querying & reporting", "IAM", "SAI 360 compliance"],
        links: [],
      },
    ],
  },
];

/** Kept off the main lanes on purpose — small tools and coursework. */
export type SmallItem = {
  name: string;
  note: string;
  href: string;
  year: string;
  shot?: { src: string; alt: string; width: number; height: number };
};

export const smallerWork: SmallItem[] = [
  {
    name: "Code Rare",
    note: "CRUD social platform for engineers, with a REST API behind it",
    href: "https://github.com/roseylikeme/code-rare",
    year: "2023",
    shot: {
      src: "/shots/code-rare.jpg",
      alt: "Code Rare user profile page: a dark sidebar, a profile card, a post composer, and a feed of posts with like and delete controls.",
      width: 1100,
      height: 1081,
    },
  },
  {
    name: "The Rose Project: Weather",
    note: "City weather lookup against the US government's REST API",
    href: "https://github.com/roseylikeme/weather-api",
    year: "2023",
    shot: {
      src: "/shots/weather.jpg",
      alt: "The Rose Project: Weather — a city selector and temperature readout over a photograph of a slot canyon.",
      width: 1100,
      height: 1054,
    },
  },
  {
    name: "ABC Toys",
    note: "Responsive storefront front end — my first real layout build",
    href: "https://github.com/roseylikeme/abc-toys",
    year: "2022",
    shot: {
      src: "/shots/abc-toys.jpg",
      alt: "ABC Toys storefront homepage: a bright header, a hero image with a Shop Now call to action, and four coloured category cards.",
      width: 1098,
      height: 1100,
    },
  },
  {
    name: "Purple Culture Chinese extension",
    note: "Right-click any Chinese text to jump straight to its dictionary entry — a 6-step lookup cut to 3",
    href: "https://github.com/roseylikeme/purple-chinese-ext",
    year: "2024",
  },
  {
    name: "Salesforce investment records app",
    note: "Startup investment tracking with dashboards, lead-routing validation, and record-triggered flows",
    href: "",
    year: "2025",
  },
  {
    name: "Office Supply Solutions analysis",
    note: "Python and Pandas trend analysis that surfaced process inefficiencies",
    href: "",
    year: "2025",
  },
  {
    name: "AutoBookmark for PDFs",
    note: "Python CLI that reads a PDF's typography and generates the outline its author never added",
    href: "", // TODO(rose): push this to GitHub and add the link.
    year: "2026",
  },
];
