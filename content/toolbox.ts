/* The skills section, as five clusters of a generalist brain. Every skill says
   where it was actually used — a keyword with a receipt beats a keyword — and
   `bridges` are the cross-cluster links that make the generalist case.

   `icon` is a file in /public/icons (from Simple Icons, CC0). Microsoft and
   IBM asked Simple Icons to remove their marks, and soft skills have none, so
   those get a short letter tile via `mono`. */

export type Tool = {
  id: string;
  name: string;
  /** Where it was used. Short — it sits under the name. */
  at?: string;
  icon?: string;
  /** Two to four characters for skills without a free logo. */
  mono?: string;
};

export type ToolGroup = {
  id: string;
  title: string;
  blurb: string;
  /** A colour token. Matches the hero traits and the Work lanes. */
  color: string;
  tools: Tool[];
};

/* Order matters: clusters sit clockwise around the web in this order, so
   neighbours here are neighbours on screen. */
export const toolbox: ToolGroup[] = [
  {
    id: "build",
    title: "Build",
    blurb: "Web apps, extensions, and the APIs behind them.",
    color: "var(--accent)",
    tools: [
      { id: "ts", name: "TypeScript", at: "Resume Fit, data table", icon: "typescript" },
      { id: "react", name: "React", at: "Data table, this site", icon: "react" },
      { id: "next", name: "Next.js", at: "Resume Fit, this site", icon: "nextdotjs" },
      { id: "js", name: "JavaScript + Ember", at: "LinkedIn", icon: "javascript" },
      { id: "node", name: "Node + Express", at: "Code RARE, Northwind", icon: "nodedotjs" },
      { id: "python", name: "Python", at: "AutoBookmark, tutorials", icon: "python" },
      { id: "java", name: "Java", at: "Coursework", icon: "openjdk" },
      { id: "postgres", name: "Postgres + Prisma", at: "Resume Fit", icon: "postgresql" },
      { id: "mongo", name: "MongoDB", at: "Code RARE", icon: "mongodb" },
      { id: "chrome", name: "Chrome extensions", at: "Resume Fit, Purple Culture", icon: "googlechrome" },
      { id: "vitest", name: "Vitest", at: "219 test files", icon: "vitest" },
      { id: "github", name: "Git + GitHub", at: "Everything", icon: "github" },
    ],
  },
  {
    id: "automate",
    title: "Automate & AI",
    blurb: "Taking the repeat work off people's plates.",
    color: "var(--text-violet)",
    tools: [
      { id: "n8n", name: "n8n", at: "Expense claim workflow", icon: "n8n" },
      { id: "pa", name: "Power Automate + SharePoint", at: "Federal Reserve", mono: "PA" },
      { id: "vba", name: "Excel VBA", at: "Federal Reserve", mono: "VBA" },
      { id: "genai", name: "Generative AI", at: "Fed, Resume Fit", mono: "AI" },
      { id: "llm", name: "LLM extraction", at: "Resume Fit", mono: "{ }" },
      { id: "sf", name: "Salesforce Flows", at: "Investment records app", icon: "salesforce" },
    ],
  },
  {
    id: "people",
    title: "People & solutions",
    blurb: "Hearing the real problem and getting people on board.",
    color: "var(--text-green)",
    tools: [
      { id: "req", name: "Requirements", at: "Alameda County, LinkedIn", mono: "REQ" },
      { id: "stake", name: "Stakeholder alignment", at: "Product, marketing & design at LinkedIn", mono: "ALN" },
      { id: "train", name: "AI training", at: "30+ colleagues at the Fed", mono: "30+" },
      { id: "kb", name: "Knowledge bases", at: "−67% support calls", mono: "KB" },
      { id: "recruit", name: "Recruiting", at: "160+ poll workers, 20+ sites", mono: "160" },
      { id: "process", name: "Process modeling", at: "Alameda County", mono: "BPM" },
      { id: "prd", name: "PRDs & scoping", at: "Resume Fit", mono: "PRD" },
      { id: "jira", name: "Jira + Confluence", at: "LinkedIn", icon: "jira" },
      { id: "iam", name: "IAM & IT controls", at: "UC Davis, Alameda", mono: "IAM" },
    ],
  },
  {
    id: "create",
    title: "Create & teach",
    blurb: "Explaining things so they stick.",
    color: "var(--text-red)",
    tools: [
      { id: "video", name: "Video editing", at: "My YouTube channel", mono: "CUT" },
      { id: "content", name: "Content creation", at: "47 videos, 93K+ views", icon: "youtube" },
      { id: "demo", name: "Live demos", at: "Code RARE walkthrough", mono: "▶" },
      { id: "teach", name: "Teaching & curriculum", at: "STEAM classes, Fed workshops, LinkedIn tech week", mono: "EDU" },
      { id: "story", name: "Data storytelling", at: "Tableau happiness story", mono: "DS" },
      { id: "figma", name: "Figma", icon: "figma" },
    ],
  },
  {
    id: "analyze",
    title: "Analyze",
    blurb: "Finding the pattern before building the fix.",
    color: "var(--text-gold)",
    tools: [
      { id: "tableau", name: "Tableau", at: "Happiness data story", icon: "tableau" },
      { id: "sql", name: "SQL", at: "UC Davis Health reporting", mono: "SQL" },
      { id: "pandas", name: "Pandas", at: "Office supply analysis", icon: "pandas" },
      { id: "bi", name: "Power BI + Cognos", at: "IBM BI Analyst cert", mono: "BI" },
      { id: "excel", name: "Excel", at: "Pivots, VLOOKUP", mono: "XL" },
      { id: "scoring", name: "Scoring & ranking", at: "Resume Fit, market trends", mono: "#1" },
    ],
  },
];

/** Cross-cluster links: the same skill doing two jobs, or one feeding another. */
export const bridges: [string, string][] = [
  ["python", "pandas"],
  ["sql", "postgres"],
  ["figma", "react"],
  ["genai", "train"],
  ["pa", "process"],
  ["vba", "excel"],
  ["llm", "scoring"],
  ["teach", "train"],
  ["demo", "stake"],
  ["kb", "teach"],
  ["prd", "next"],
  ["tableau", "story"],
  ["story", "content"],
  ["demo", "video"],
];

export const skillCount = toolbox.reduce((n, g) => n + g.tools.length, 0);
