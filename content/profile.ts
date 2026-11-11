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
    { value: 100, prefix: "", suffix: "+", label: "colleagues trained on AI at the Fed" },
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
      kicker: "Consulting",
      title: "An application registry for SJSU IT",
      body: "Leading technical delivery of one trustworthy inventory of the university's SaaS and in-house apps — who owns each one, how sensitive it is, how it recovers, and which ones need attention right now.",
      where: "San José State University IT · Technical Lead Consultant",
      graphic: "registry",
      wide: true,
      href: "#build",
    },
    {
      kicker: "Shipping",
      title: "Resume Fit Assistant",
      body: "My job-search pipeline: scores postings against my résumés, autofills applications from a Chrome extension, and syncs with Gmail to track every one through to an offer.",
      where: "Solo build",
      graphic: "resume-fit",
      href: "#build",
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
