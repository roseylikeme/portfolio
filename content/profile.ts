export const profile = {
  name: "Roselene Gabun",
  shortName: "Rose",

  headline: "A lover of many hats: I build and analyze products, processes, and data.",
  subhead:
    "MIS senior at San José State, building AI automation solutions at the Federal Reserve. Previous SWE Intern at LinkedIn. Lover of ice cream.",

  availability: "Graduating May/Dec 2027 · open to 2027 internships and new-grad roles",

  now: {
    updated: "August 2026",
    lines: [
      "At the **Federal Reserve Bank of San Francisco**, building a hybrid AI + Excel VBA tool that turns Steering Committee decks into strictly formatted executive summaries — and training colleagues on AI tools.",
      "Shipping **Resume Fit Assistant** — a job-search tool that scores your résumé against a real posting and tells you what's missing, without ever inventing experience you don't have.",
      "Finishing a **BS in Management Information Systems** at SJSU.",
      "Using **AI to help analyze market trends** and build a scoring system for investment opportunities",
      "**Language Learning** on my downtime! Currently learning Chinese(Mandarin)",
    ],
  },

  email: "roselenegabunjobs@gmail.com",
  links: {
    github: "https://github.com/roseylikeme",
    linkedin: "https://www.linkedin.com/in/roselene-g/",
    resume: "/resume.pdf", // TODO(rose): drop the current PDF at public/resume.pdf
  },

  greetings: [
    { text: "Hi", language: "English" },
    { text: "안녕하세요", language: "Korean" },
    { text: "こんにちは", language: "Japanese" },
    { text: "你好", language: "Chinese" },
    { text: "Kamusta?", language: "Tagalog" },
  ],

  skills: [
    {
      group: "Build",
      items: [
        "TypeScript",
        "React / Next.js",
        "Node.js",
        "Python",
        "Java",
        "Prisma / Postgres",
        "Chrome Extensions (MV3)",
        "Testing (Vitest)",
      ],
    },
    {
      group: "Analyze",
      items: [
        "SQL",
        "Python / Pandas",
        "IBM Cognos",
        "Power BI / Tableau",
        "Excel (pivots, VLOOKUP, VBA)",
        "LLM parsing & structured extraction",
        "Scoring & ranking systems",
      ],
    },
    {
      group: "Decide & operate",
      items: [
        "PRDs, scoping, and non-goals",
        "Requirements gathering",
        "Business process modeling",
        "Power Automate / SharePoint",
        "Jira / Confluence · Figma",
        "IAM, IT general controls, SPII handling",
      ],
    },
  ],

  certifications: [
    "Google Cybersecurity Professional Certificate",
    "IBM Business Intelligence Analyst",
    "AI Ethics",
  ],

  lookingFor:
    "I'm looking for a team that will give me technical problems to solve, and trust me to own the fix. From product, analytics, automation, AI, or engineering — the work is the same work. I want to be on a team that values curiosity, learning, and constant innovation. Ideally one that lets me sit at the intersection of business and technology.",
} as const;

export type Profile = typeof profile;
