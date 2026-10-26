export const profile = {
  name: "Roselene Gabun",
  shortName: "Rose",

  headline: "I build and improve products, processes, and data.",
  subhead:
    "Building AI automation solutions at the Federal Reserve. Previous SWE Intern at LinkedIn. Huge generalist.",

  /** How I describe myself — the hero leads with these. */
  traits: [{ word: "Technical" }, { word: "Creative" }, { word: "Analytical" }],

  /** The numbers strip under the hero. Each is backed by a card further down. */
  stats: [
    { value: 93, prefix: "", suffix: "K+", label: "YouTube views on my tutorials" },
    { value: 30, prefix: "", suffix: "+", label: "colleagues trained on AI at the Fed" },
    { value: 67, prefix: "−", suffix: "%", label: "support calls after my knowledge base" },
    { value: 5000, prefix: "", suffix: "+", label: "contracts migrated off paper" },
  ],

  availability: "Graduating May/Dec 2027 · open to 2027 internships and new-grad roles",
  /** The footer's shorter version — the hero already says when I graduate. */
  openTo: "Open to 2027 internships and new-grad roles",

  /** The "Now" cards. The month on the section is the visitor's current one
      (see CurrentMonth), so keep these true rather than dated. */
  now: [
    {
      kicker: "Day job",
      title: "AI automation at the Fed",
      body: "Building a hybrid AI + Excel VBA tool that turns Steering Committee decks into strictly formatted executive summaries — and training colleagues on AI tools.",
      where: "Federal Reserve Bank of San Francisco",
      graphic: "deck-to-email",
      href: "#automate",
    },
    {
      kicker: "Shipping",
      title: "Resume Fit Assistant",
      body: "Scores your résumé against a real posting and tells you what's missing — without ever inventing experience you don't have.",
      where: "Solo build",
      graphic: "resume-fit",
      href: "#build",
    },
    {
      kicker: "Exploring",
      title: "AI for market trends",
      body: "Using AI to help analyze market trends and build a scoring system for investment opportunities.",
      where: "Side project",
      graphic: "trend",
    },
    {
      kicker: "Studying",
      title: "BS, Management Information Systems",
      body: "Finishing my degree at San José State — business and technology, on purpose.",
      where: "SJSU · class of 2027",
      graphic: "degree",
    },
    {
      kicker: "Downtime",
      title: "Learning Mandarin",
      body: "Currently learning Chinese — and I built a Chrome extension to make my dictionary lookups faster.",
      where: "Language learning",
      graphic: "mandarin",
    },
  ],

  email: "roselenegabunjobs@gmail.com",
  links: {
    github: "https://github.com/roseylikeme",
    linkedin: "https://www.linkedin.com/in/roselene-g/",
    resume: "/resume.pdf", 
  },

  greetings: [
    { text: "Hi", language: "English" },
    { text: "안녕하세요", language: "Korean" },
    { text: "こんにちは", language: "Japanese" },
    { text: "你好", language: "Chinese" },
    { text: "Kamusta?", language: "Tagalog" },
  ],

  certifications: [
    "Google Cybersecurity Professional Certificate",
    "IBM Business Intelligence Analyst",
    "AI Ethics",
  ],

  /** Under the closing callout: the ask, the kinds of roles, and the team. */
  lookingFor: {
    lead: "I'm looking for a team that will give me technical problems to solve, and trust me to own the fix.",
    roles: ["Product", "Analytics", "Automation", "Consulting", "Solutions engineering"],
    team: "Ideally on a team that values curiosity, learning, and constant innovation — at the intersection of business and technology.",
  },
} as const;

export type Profile = typeof profile;
