export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  /** Ties the quote to a claim made elsewhere on the page. */
  context?: string;
};


export const testimonials: Testimonial[] = [
  {
    quote:
      "You are the most energetic young engineer I have ever worked with. Your positivity and energy inspire and touch everyone around you. Thank you for all the impact you've made on Galapagos — the UI you've added is so impactful for allowing promoters to create and author elements of promotions in a self-serve manner.",
    author: "Engineering colleague",
    role: "LinkedIn — Marketing Tech Engineering",
    context: "On the internal marketing tooling work, 2023",
  },
  {
    quote:
      "Rose is a fast self-learner and she showed strong web development skills. What makes Rose unique is her ability to lift people up with her feedback — she loves to help other team members grow their skill set by teaching the things she learned. I can highly recommend Rose for any front-end web developer role!",
    author: "Remsey M.",
    role: "Instructor, Year Up Code Academy",
  },
  {
    quote:
    "Rose has been an absolute pleasure to work with... She is able to quickly and easily incorporate feedback/advice and move forward toward completing work products. Her combination of technical skills, positive attitude, proactive mindset, and ability to deliver high-quality work products make her an exceptional intern. She has not only met expectations but has set a high standard for future interns. I look forward to seeing her continued growth and contribution for the remainder of the summer.",
    author: "Charlene and Aren",
    context: "NextGen Implementation",
    role: "Supervisor and Manager, Federal Reserve Bank of SF",
  }
];
