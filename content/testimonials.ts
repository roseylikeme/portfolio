export type Testimonial = {
  /** The full note, exactly as written. Shown behind "Read the full note". */
  quote: string;
  /** The line that carries it on the page. Word-for-word from `quote`, with
      "…" wherever words are skipped — an excerpt, never a paraphrase. */
  pull: string;
  /** The phrase inside `pull` to mark like a highlighter. */
  highlight: string;
  author: string;
  role: string;
  /** Short source label for the chip. */
  org: string;
  /** Ties the quote to a claim made elsewhere on the page. */
  context?: string;
  /** Leads the section, set large. One only. */
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Rose is a fast self-learner and she showed strong web development skills. What makes Rose unique is her ability to lift people up with her feedback — she loves to help other team members grow their skill set by teaching the things she learned. I can highly recommend Rose for any front-end web developer role!",
    pull: "What makes Rose unique is her ability to lift people up with her feedback — she loves to help other team members grow their skill set by teaching the things she learned.",
    highlight: "lift people up",
    author: "Remsey M.",
    role: "Instructor, Year Up Code Academy",
    org: "Year Up",
    featured: true,
  },
  {
    quote:
      "You are the most energetic young engineer I have ever worked with. Your positivity and energy inspire and touch everyone around you. Thank you for all the impact you've made on Galapagos — the UI you've added is so impactful for allowing promoters to create and author elements of promotions in a self-serve manner.",
    pull: "You are the most energetic young engineer I have ever worked with… the UI you've added is so impactful.",
    highlight: "most energetic young engineer",
    author: "Engineering colleague",
    role: "LinkedIn — Marketing Tech Engineering",
    org: "LinkedIn",
    context: "On the internal marketing tooling work, 2023",
  },
  {
    quote:
      "Rose has been an absolute pleasure to work with... She is able to quickly and easily incorporate feedback/advice and move forward toward completing work products. Her combination of technical skills, positive attitude, proactive mindset, and ability to deliver high-quality work products make her an exceptional intern. She has not only met expectations but has set a high standard for future interns. I look forward to seeing her continued growth and contribution for the remainder of the summer.",
    pull: "She has not only met expectations but has set a high standard for future interns.",
    highlight: "set a high standard",
    author: "Charlene and Aren",
    role: "Supervisor and Manager, Federal Reserve Bank of SF",
    org: "Federal Reserve",
    context: "NextGen Implementation",
  },
];
