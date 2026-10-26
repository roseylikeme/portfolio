

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
      /** Shown instead of src in dark mode, when the project has one. */
      srcDark?: string;
      alt: string;
      width: number;
      height: number;
      /** The address shown in the browser frame. */
      url?: string;
      /** More screens of the same project — the frame crossfades through them. */
      more?: { src: string; alt: string; width: number; height: number }[];
    }
  /** A number drawn as a picture of itself. `chart` picks the drawing:
      people = one figure per person, drop = before/after bars,
      grid = a hundred squares flipping from paper to digital. */
  | {
      kind: "viz";
      chart: "people" | "drop" | "grid";
      value: string;
      label: string;
      sub?: string;
      /** people: how many figures. drop: the "after" bar as % of before. */
      n?: number;
    }
  /** A drawn workflow, for automations that only live behind a login. */
  | {
      kind: "flow";
      steps: string[];
      /** Where the last step forks: the If node's two outcomes. */
      branches?: { when: string; label: string }[];
      label: string;
      sub?: string;
      /** A logo from /public/icons, shown beside the label. */
      icon?: string;
    };

export type WorkItem = {
  slug: string;
  name: string;
  /** The job, program, or context this came out of. */
  where: string;
  period: string;
  visual: Visual;
  /** One line, on the card face. Everything longer lives behind the disclosure. */
  tagline: string;
  /** The numbers, set large. These carry the card at a skim. */
  metrics?: { value: string; label: string }[];
  /** Short qualitative chips. */
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
      "I like building products and solutions.",
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
          alt: "Resume Fit Assistant dashboard: fields filled, time saved, applications and jobs saved this month, a weekly goal ring, and a streak calendar.",
          width: 1634,
          height: 1290,
          url: "resume-fit-assistant/dashboard",
        },
        metrics: [
          { value: "403", label: "commits" },
          { value: "219", label: "test files" },
          { value: "+1,281%", label: "skill coverage" },
        ],
        results: ["PRD → production", "Web app + Chrome extension"],
        featured: true,
        notes: [
          {
            label: "Problem",
            body: "Job seekers are juggling multiple résumé versions, each with different keywords, and they don't know which one is the best fit for a given posting.",
          },
          {
            label: "Decision",
            body: "I wanted to build a tool that not only finds the best résumé version for a posting, but also explains why it's the best fit and what keywords are missing. I decided to build a web app and a Chrome extension that work together to capture postings, parse them, and score résumés against them.",
          },
          {
            label: "Build",
            body: "I built the tool in TypeScript, using Next.js for the web app and Chrome MV3 for the extension. I used Prisma and Postgres for the backend, and Vitest for testing. I also used LLM extraction to parse job postings into structured data.",
          }
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
        slug: "poll-worker-table",
        name: "Poll Worker System data table",
        where: "Alameda County — Technical Specialist",
        period: "Jan — Mar 2024",
        tagline:
          "A reusable table for the system I was using every day at my county job, built because of poor user experience.",
        visual: {
          kind: "shot",
          src: "/shots/poll-worker-table.jpg",
          srcDark: "/shots/live/poll-worker-table-dark.jpg",
          url: "https://shadcn-ui-table.vercel.app",
          alt: "The Poll Worker System data table: a filter field, column toggle, export button, and a sortable table of poll-worker records.",
          width: 1600,
          height: 1000,
        },
        results: ["Live demo", "Light + dark mode", "Filter · sort · paginate · hide columns", "Built for a system I used daily"],
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

  /* ------------------------------------------------------------- automate -- */
  {
    id: "automate",
    label: "Automate",
    thesis:
      "If a task repeats, I'd rather build the thing that does it — then teach the people around me to trust it.",
    items: [
      {
        slug: "fed-exec-summaries",
        name: "Deck-to-executive-summary automation",
        where: "Federal Reserve Bank of San Francisco",
        period: "2026",
        tagline:
          "A hybrid generative-AI and Excel VBA tool that turns Steering Committee decks into strictly formatted executive email summaries.",
        visual: {
          kind: "viz",
          chart: "people",
          n: 30,
          value: "30+",
          label: "colleagues trained on AI",
          sub: "Internal tool — no public screenshot possible",
        },
        results: ["Steering Committee output", "AI drafts, VBA formats"],
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
        slug: "n8n-expense-claims",
        name: "Expense claim automation",
        where: "Personal — n8n Cloud",
        period: "2026",
        tagline:
          "A 5-node n8n workflow that takes expense claims from a web form, logs every one to Google Sheets, auto-approves anything under $25, and routes the rest to accounting — emailing everyone along the way.",
        visual: {
          kind: "flow",
          steps: ["Web form", "Google Sheets", "If < $25"],
          branches: [
            { when: "Yes", label: "Auto-approve" },
            { when: "No", label: "Accounting review" },
          ],
          label: "Built in n8n",
          icon: "n8n",
          sub: "5 nodes · form to inbox, no hands",
        },
        metrics: [
          { value: "5", label: "nodes" },
          { value: "< $25", label: "auto-approved" },
        ],
        results: ["Web form intake", "Audit log in Sheets", "Email to both sides"],
        notes: [],
        stack: ["n8n Cloud", "Google Sheets", "Gmail API", "Conditional logic"],
        links: [],
      },
    ],
  },

  /* -------------------------------------------------------------- analyze -- */
  {
    id: "analyze",
    label: "Analyze",
    thesis:
      "Before I build anything I analyze the patterns in the data: What's working? What's not? Why? What are the real problems, and what can I do to remove them?",
    items: [
      {
        slug: "tableau-happiness",
        name: "Happiness, GDP, Freedom, and Health",
        where: "Tableau Public — data story",
        period: "2026",
        tagline:
          "A five-part Tableau story asking what actually moves a country's happiness score: money, or freedom, social support, generosity, and health.",
        visual: {
          kind: "shot",
          src: "/shots/live/tableau-happiness.jpg",
          alt: "Tableau story page on the least happy countries: a happiness-score heat table by year, plus dual-axis charts of freedom and social support, and generosity and healthy life expectancy, 2015 to 2024.",
          width: 1440,
          height: 860,
          url: "public.tableau.com/app/profile/rose.gabun",
          more: [
            {
              src: "/shots/live/tableau-happiness-most.jpg",
              alt: "Tableau story page on the most happy countries: a happiness-score heat table for ten countries from 2015 to 2023, with the Netherlands highlighted, above dual-axis charts of freedom and social support, and generosity and healthy life expectancy.",
              width: 1440,
              height: 1268,
            },
          ],
        },
        metrics: [
          { value: "5", label: "story chapters" },
          { value: "10 yrs", label: "of country data" },
        ],
        results: ["Most vs. least happy countries", "Published on Tableau Public"],
        featured: true,
        notes: [
          {
            label: "Question",
            body: "Does GDP explain why some countries are happier than others — or do freedom, social support, generosity, and healthy life expectancy matter more?",
          },
          {
            label: "Approach",
            body: "Built it as a story rather than a dashboard: an overview, GDP per capita against happiness score, then the most- and least-happy countries broken out factor by factor across a decade, ending on the inferences.",
          },
        ],
        stack: ["Tableau", "Data storytelling", "Dual-axis charts"],
        links: [
          {
            label: "Explore the story",
            href: "https://public.tableau.com/app/profile/rose.gabun/viz/MyFinalProjectRose_17879556433010/Story1",
            primary: true,
          },
        ],
      },
      {
        slug: "alameda-knowledge-base",
        name: "The knowledge base that stopped the calls",
        where: "Alameda County — Technical Specialist",
        period: "2024",
        tagline:
          "Analyzed what people were actually calling about, then removed the reason to call.",
        visual: {
          kind: "viz",
          chart: "drop",
          n: 33,
          value: "−67%",
          label: "inbound troubleshooting calls",
          sub: "Before vs. after the knowledge base",
        },
        metrics: [
          { value: "160+", label: "workers, 20+ sites" },
          { value: "3 → 1 wk", label: "onboarding" },
        ],
        results: ["Issue analysis", "SPII gaps closed"],
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
          kind: "viz",
          chart: "grid",
          value: "5,000+",
          label: "contracts moved off paper",
          sub: "Each square ≈ 50 contracts",
        },
        metrics: [
          { value: "−40%", label: "processing time" },
        ],
        results: ["Audit trail intact", "15+ inquiries a day"],
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
  /** A running version, when there is one. */
  live?: string;
  /** A recorded walkthrough. */
  demo?: string;
  year: string;
  shot?: { src: string; alt: string; width: number; height: number };
};

export const smallerWork: SmallItem[] = [
  {
    name: "Code Rare",
    note: "CRUD social platform for engineers, with a REST API behind it",
    href: "https://github.com/roseylikeme/code-rare",
    live: "https://roseylikeme.github.io/code-rare/",
    demo: "https://www.youtube.com/watch?v=jUVr62vpyL0",
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
    live: "https://roseylikeme.github.io/weather-api",
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
    live: "https://roseylikeme.github.io/abc-toys/",
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
    shot: {
      src: "/shots/chinese-ext.png",
      alt: "A right-click context menu with a Search Purple Chinese entry added by the extension.",
      width: 482,
      height: 322,
    },
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

/** Everything that's still live on the web, for the proof reel under the hero.
    Screenshots captured from the running sites in October 2026. */
export type LiveSite = {
  name: string;
  href: string;
  shot: string;
  alt: string;
};

export const liveSites: LiveSite[] = [
  {
    name: "Poll Worker data table",
    href: "https://shadcn-ui-table.vercel.app",
    shot: "/shots/live/poll-worker-table-dark.jpg",
    alt: "Poll Worker data table in dark mode: filter, column toggle, export, and paginated rows.",
  },
  {
    name: "The Rose Project",
    href: "https://roseylikeme.github.io/ecommerce-website/",
    shot: "/shots/live/rose-project.jpg",
    alt: "The Rose Project storefront: a botanical photo hero with a Click me call to action.",
  },
  {
    name: "ABC Toys",
    href: "https://roseylikeme.github.io/abc-toys/",
    shot: "/shots/live/abc-toys.jpg",
    alt: "ABC Toys homepage: a hero photo and three coloured Products, Location, and Contact cards.",
  },
  {
    name: "Code RARE",
    href: "https://roseylikeme.github.io/code-rare/",
    shot: "/shots/live/code-rare-login.jpg",
    alt: "Code RARE login screen with the round Code RARE logo beside a welcome panel.",
  },
  {
    name: "Northwind Grocery",
    href: "https://roseylikeme.github.io/northwind-grocery",
    shot: "/shots/live/northwind-grocery.jpg",
    alt: "Northwind's grocery site: a basket of vegetables above a row of featured dishes.",
  },
  {
    name: "Stay Organized",
    href: "https://roseylikeme.github.io/stay-organized",
    shot: "/shots/live/stay-organized.jpg",
    alt: "Stay Organized to-do app landing page: a desk photo with a Get started button.",
  },
  {
    name: "CNIT 133 projects",
    href: "https://roseylikeme.github.io/cnit133/",
    shot: "/shots/live/cnit133.jpg",
    alt: "CNIT 133 homework hub: an illustrated header and a table of contents of JavaScript assignments.",
  },
  {
    name: "Arithmetic Calculator",
    href: "https://roseylikeme.github.io/arithmetic-calculator/",
    shot: "/shots/live/arithmetic-calculator.jpg",
    alt: "A pink JavaScript arithmetic calculator with two number fields and four operation buttons.",
  },
];
