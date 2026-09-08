export type RoleIcon = "bank" | "ballot" | "robot" | "network" | "records";

export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  icon: RoleIcon;
  summary: string;
  /** The one number from the bullets worth reading without expanding them. */
  highlight?: string;
  bullets: string[];
  /** Ties this role to a card in Selected work, so the timeline isn't a dead end. */
  seeAlso?: { label: string; href: string };
};

export const experience: Role[] = [
  {
    company: "Federal Reserve Bank of San Francisco",
    title: "AI Builder & Automation Ops Intern",
    period: "May 2026 — present",
    location: "San Francisco, CA",
    icon: "bank",
    summary:
      "Building internal AI automation, and getting people to actually use it.",
    highlight: "30+ colleagues trained",
    bullets: [
      "Designed and built a hybrid automation tool combining internal generative AI with Advanced Excel VBA macros, turning decks into strictly formatted executive email summaries for the Steering Committee.",
      "Centralized Cash Contracts and stood up email automation workflows using Power Automate and SharePoint.",
      "Trained and upskilled 30+ cross-functional colleagues on practical AI applications, including prompt engineering and structured extraction.",
    ],
    seeAlso: { label: "See the build", href: "#work" },
  },
  {
    company: "Alameda County",
    title: "Technical Specialist — Recruiter & Area Coordinator",
    period: "Jan 2024 — Sep 2024",
    location: "Oakland, CA",
    icon: "ballot",
    summary:
      "Recruiting and supporting poll workers across the county, then building the system that made the support calls stop.",
    highlight: "67% fewer support calls",
    bullets: [
      "Reduced inbound troubleshooting calls by 67% by analyzing recurring issues and building a standardized knowledge base.",
      "Tracked and recruited 160+ workers across 20+ locations using the in-house ATS.",
      "Closed gaps in SPII handling, reducing cybersecurity risk and improving IT compliance.",
      "Documented the poll-working workflow and used it to onboard 3 new recruits in one week, down from the usual two to three.",
    ],
    seeAlso: { label: "See the analysis", href: "#analyze" },
  },
  {
    company: "Digital Dreamers STEAM Academy",
    title: "STEAM Tech Instructor",
    period: "Mar 2024 — Aug 2024",
    location: "Oakland, CA",
    icon: "robot",
    summary:
      "After-school coding and robotics for groups of 3–15 students, in person at local schools.",
    bullets: [
      "Taught coding fundamentals through block programming, Scratch, and LEGO Robotics.",
      "Adapted delivery per classroom — the same lesson needs a different teacher for a quiet room than for a loud one.",
    ],
  },
  {
    company: "LinkedIn",
    title: "Software Engineer Intern",
    period: "Jan 2023 — Jul 2023",
    location: "Sunnyvale, CA",
    icon: "network",
    summary:
      "Marketing Tech Engineering (MTE) — internal tooling so marketers could ship campaigns without filing work to an engineer.",
    highlight: "75% more campaign volume",
    bullets: [
      "Increased marketing campaign volume by 75% by building and maintaining internal tooling with HTML, Play, JavaScript, and Ember.js.",
      "Shipped Generic Personalization end to end: aligned with product, marketing, and design, mocked the designs, wrote the code and macro validations, wrote the tests, and ramped it.",
      "Ran A/B testing to find bugs and improve the UI, and documented changes and technical process in Git, GitHub, and Confluence.",
      "Volunteered onto a one-week program introducing Black students to tech — co-developed curriculum with senior engineers and spoke.",
    ],
    seeAlso: { label: "See the build", href: "#build" },
  },
  {
    company: "UC Davis Health",
    title: "Administrative Assistant: Systems Support & Contracts",
    period: "Apr 2021 — May 2022",
    location: "Sacramento, CA",
    icon: "records",
    summary:
      "Titled admin. Functionally the system administrator for the contract management system — access, training, documentation, and reporting.",
    highlight: "5,000+ contracts migrated",
    bullets: [
      "Migrated 5,000+ contracts from paper to an electronic database with audit-trail integrity, cutting processing time by 40%.",
      "Managed user access and identity, troubleshot hardware and software, and handled 15+ inquiries a day.",
      "Wrote the training and documentation for the contract management system, and ran database queries to pull reporting.",
    ],
    seeAlso: { label: "See the migration", href: "#analyze" },
  },
];

export const education = {
  school: "San José State University",
  degree: "BS, Management Information Systems (Business Administration)",
  period: "Expected May/Dec 2027",
  location: "San José, CA",
  note: "Why MIS? To position myself at the intersection of emerging business and technology.",
};

export const earlierRoles =
  "Before that: retail and customer-facing sales roles, plus a stint building the front end for an early-stage artist platform.";
