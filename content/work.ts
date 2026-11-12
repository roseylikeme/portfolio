

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
      people = one figure per person (or per n people, said in sub), drop = before/after bars,
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
  /** The org or context this came out of, kept short: it shares a row with the date. */
  org: string;
  /** What I was there, in plain words. Sits under the title. */
  role?: string;
  period: string;
  /** A live version that loads in place of the screenshot on request. */
  embed?: { kind: "tableau"; name: string };
  visual: Visual;
  /** One line, on the card face. Everything longer lives behind the disclosure. */
  tagline: string;
  /** The numbers, set large. These carry the card at a skim. */
  metrics?: { value: string; label: string }[];
  /** How it works, as 3–4 short steps. Takes the place of metrics on a
      featured card when the honest story is what it does, not a count. */
  highlights?: { title: string; body: string }[];
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
        org: "Personal project",
        role: "Product and engineering, solo",
        period: "2026 – now",
        tagline:
          "A job-search pipeline: it scores every posting against your résumés, autofills applications from a Chrome extension, and tracks each one from inbox to offer.",
        visual: {
          kind: "shot",
          src: "/shots/resume-fit-assistant.png",
          alt: "Resume Fit Assistant dashboard: fields filled, time saved, applications and jobs saved this month, a weekly goal ring, and a streak calendar.",
          width: 1634,
          height: 1290,
          url: "resume-fit-assistant/dashboard",
        },
        highlights: [
          {
            title: "Capture",
            body: "The Chrome extension saves postings from Greenhouse, Lever, Workday, and other ATS sites.",
          },
          {
            title: "Score",
            body: "Every résumé is checked against the job, with evidence for each requirement and the keywords it's missing.",
          },
          {
            title: "Apply",
            body: "One click autofills the form from my profile and a saved answer bank. It never submits for me.",
          },
          {
            title: "Track",
            body: "Gmail sync moves each job from applied to interview to offer, and flags the follow-ups that are due.",
          },
        ],
        results: ["Web app + Chrome extension", "Never invents experience"],
        featured: true,
        notes: [
          {
            label: "Problem",
            body: "It started as one question: which of my résumé versions fits this posting best? But the real cost of a job search is everything around that — re-typing the same fields into every ATS, losing track of what I applied to, and missing the recruiter email that needed a reply.",
          },
          {
            label: "Decision",
            body: "So I grew it into one pipeline instead of a scoring tool. Every saved job moves through eight stages, from Considering to Offer, and a \"needs attention\" queue surfaces follow-ups that are due, deadlines, postings that have gone quiet for 14 days, and jobs still waiting on a résumé choice. One rule held throughout: the AI can suggest, but it never invents experience, and every edit shows up as a diff I approve.",
          },
          {
            label: "Build",
            body: "The Chrome extension captures postings on Greenhouse, Lever, Ashby, Workday, iCIMS and more, shows the fit score on the page, and autofills applications on a click — profile, EEO fields, dropdowns, and the résumé attachment, reusing answers from a saved answer bank. Never auto-submits. The web app scores each job against every résumé with requirement-level evidence and keyword coverage, has a résumé builder with version history and PDF/DOCX export, and a read-only Gmail sync that moves jobs to Applied and turns interview and rejection emails into confirmable updates. A momentum dashboard tracks fields filled, time saved, a weekly goal, and a streak.",
          },
        ],
        stack: [
          "TypeScript",
          "Next.js",
          "Chrome MV3",
          "Prisma",
          "Postgres",
          "Gmail API",
          "Vitest",
          "Playwright",
          "LLM extraction",
        ],
        // Private repo, not deployed — on purpose.
        links: [],
      },
      {
        slug: "sjsu-app-registry",
        name: "SJSU Application Registry",
        org: "SJSU IT · Consulting",
        role: "Technical Lead Consultant",
        period: "Aug 2026 – now",
        tagline:
          "One trustworthy inventory of the university's SaaS and in-house apps: who owns each one, how sensitive it is, how it recovers, and which ones need attention now.",
        visual: {
          kind: "shot",
          src: "/shots/sjsu-registry/dashboard.jpg",
          alt: "SJSU Portfolio Dashboard: metric cards for applications, critical priority, reviews due and record completeness, donut charts for data classification, hosting environment and status, and an attention queue of apps flagged Review due or Missing fields.",
          width: 1600,
          height: 1000,
          url: "sjsu-app-registry/dashboard",
          more: [
            {
              src: "/shots/sjsu-registry/registry.jpg",
              alt: "The Application Registry table with search and filters for department, status, environment, priority and data classification, and rows showing each app's owner, audience, user count, classification and recovery priority.",
              width: 1600,
              height: 1000,
            },
            {
              src: "/shots/sjsu-registry/detail.jpg",
              alt: "A Canvas record detail sheet with Active, Critical and Level 1 Confidential badges, a record-completeness meter, and overview fields.",
              width: 1600,
              height: 1000,
            },
          ],
        },
        highlights: [
          {
            title: "Inventory",
            body: "Every SaaS and in-house app in one record: owner, audience, hosting, and how it recovers.",
          },
          {
            title: "Classify",
            body: "Sorted by data sensitivity, business criticality, lifecycle status, and department.",
          },
          {
            title: "Flag",
            body: "An attention queue surfaces apps that are due for review, critical to recovery, or missing data.",
          },
          {
            title: "Control",
            body: "Department-scoped roles, campus single sign-on, and an audit trail of every change.",
          },
        ],
        results: ["Consulting engagement", "University IT"],
        featured: true,
        notes: [],
        stack: [
          "TypeScript",
          "Next.js",
          "React",
          "Drizzle ORM",
          "Okta OIDC",
          "shadcn/ui",
          "Recharts",
        ],
        // University-internal tool — no public link. Screenshots use sample data
        // with placeholder owner names.
        links: [],
      },
      {
        slug: "poll-worker-table",
        name: "Poll Worker System data table",
        org: "Alameda County",
        role: "Technical Specialist",
        period: "Jan – Mar 2024",
        tagline:
          "A reusable data table for the poll-worker system I used every day at my county job — rebuilt because the original was painful to work in.",
        visual: {
          kind: "shot",
          src: "/shots/poll-worker-table-featured.jpg",
          srcDark: "/shots/poll-worker-table-featured-dark.jpg",
          url: "https://shadcn-ui-table.vercel.app",
          alt: "The Poll Worker System data table filtered to names containing \"Ma\": three rows selected, the column-visibility menu open, Export to Excel, and pagination showing 3 of 64 rows selected.",
          width: 1440,
          height: 900,
        },
        highlights: [
          {
            title: "Find",
            body: "Filter the roster by name as you type, instead of paging through it.",
          },
          {
            title: "Shape",
            body: "Sort any column, change the page size, and hide the columns you don't need.",
          },
          {
            title: "Act",
            body: "Select the rows you want and export them straight to Excel.",
          },
        ],
        results: ["Live demo", "Light + dark mode", "Built for a system I used daily"],
        featured: true,
        notes: [],
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
        org: "Federal Reserve Bank of SF",
        role: "AI Builder and Automation Ops Intern",
        period: "2026",
        tagline:
          "A hybrid generative-AI and Excel VBA tool that turns Steering Committee decks into strictly formatted executive email summaries.",
        visual: {
          kind: "viz",
          chart: "people",
          n: 20,
          value: "100+",
          label: "colleagues trained on AI",
        },
        results: [
          "Steering Committee output",
          "AI drafts, VBA formats",
          "Built the Cash Contracts SharePoint site",
        ],
        notes: [],
        stack: [
          "Generative AI",
          "Excel VBA",
          "Power Automate",
          "SharePoint",
          "Power BI",
        ],
        // Internal work at a federal bank — no public link, and that's the honest
        // state. Saying so beats a dead "#" link.
        links: [],
      },
      {
        slug: "n8n-expense-claims",
        name: "Expense claim automation",
        org: "Personal project",
        role: "Built on n8n Cloud",
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
        org: "Tableau Public",
        role: "Data story",
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
        highlights: [
          { title: "Overview", body: "Happiness scores for every country, 2015 to 2024." },
          { title: "Money", body: "GDP per capita set against happiness score: it helps, but it isn't the whole story." },
          { title: "Extremes", body: "The ten happiest and ten least happy countries, broken out factor by factor." },
          { title: "Inferences", body: "What actually moves the score, once money is held up against the rest." },
        ],
        results: ["Most vs. least happy countries", "Published on Tableau Public"],
        featured: true,
        embed: { kind: "tableau", name: "MyFinalProjectRose_17879556433010/Story1" },
        notes: [
          {
            label: "Question",
            body: "Does GDP explain why some countries are happier than others — or do freedom, social support, generosity, and healthy life expectancy matter more?",
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
        org: "Alameda County",
        role: "Technical Specialist",
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
        notes: [],
        stack: ["Issue analysis", "Process documentation", "ATS", "SPII / IT compliance"],
        links: [],
      },
      {
        slug: "ucdavis-contract-migration",
        name: "5,000 contracts off paper",
        org: "UC Davis Health",
        role: "Systems Support and Contracts",
        period: "2021 – 2022",
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
        notes: [],
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
