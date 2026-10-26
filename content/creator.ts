/* The YouTube channel and the off-résumé skills it proves. Numbers were read
   off youtube.com/@roselene in October 2026 — refresh them when they move. */

export type Video = {
  /** YouTube video id — thumbnails and the embed are derived from it. */
  id: string;
  title: string;
  views: string;
  length: string;
  /** What this one shows about the skill, in a few words. */
  tag: string;
};

export const channel = {
  name: "Code with Rose",
  handle: "@roselene",
  url: "https://www.youtube.com/@roselene/videos",
  avatar:
    "https://yt3.googleusercontent.com/tX9bgm4gvCD77ZyTF8byCfgMo96xgX5tQGicxGTkbud9J1g6qMwbYm9ZWzpvMsjt61y6rkEnyg=s160-c-k-c0x00ffffff-no-rj",
  stats: [
    { value: 93, suffix: "K+", label: "lifetime views" },
    { value: 47, suffix: "", label: "videos published" },
    { value: 2014, suffix: "", label: "teaching on YouTube since", plain: true },
    { value: 605, suffix: "", label: "subscribers" },
  ],
};

/** The one that plays inline: a game-dev tutorial from the series that built
    the channel. */
export const featuredVideo: Video = {
  id: "iixZ4CnswzY",
  title: "Let's Make a Ren'Py Game | Blinking | Animating",
  views: "13K",
  length: "5:14",
  tag: "Ren'Py tutorial · 13K views",
};

export const videos: Video[] = [
  {
    id: "J-R1gWkfa2U",
    title: "Let's Make a Ren'Py Game | Player Input",
    views: "21K",
    length: "5:01",
    tag: "Most-watched tutorial",
  },
  {
    id: "guvCmpMs6bQ",
    title: "2 Months Worth of Projects | Year Up Web Developer Journey",
    views: "142",
    length: "12:53",
    tag: "Demo reel",
  },
  {
    id: "MkjBL8lHUeg",
    title: "How to Change Button Text on Hover | JavaScript",
    views: "515",
    length: "5:26",
    tag: "Front-end lesson",
  },
  {
    id: "3QxiUtfIKuc",
    title: "How to Add Sound Effects in Pygame | Alien Invasion",
    views: "416",
    length: "7:12",
    tag: "Python lesson",
  },
  {
    id: "LcJ47ZFvEq4",
    title: "Solving 06-flex-layout | Odin Project | Speed Code",
    views: "257",
    length: "12:42",
    tag: "Speed code",
  },
  {
    id: "jUVr62vpyL0",
    title: "Full Stack Project | Code RARE — Social Media Website",
    views: "325",
    length: "3:49",
    tag: "Project demo",
  },
];

/* The side skills, one receipt each — a number you can check above it on
   the page, and a single line of context. */
export type Craft = {
  title: string;
  icon: "teach" | "camera" | "cut" | "demo";
  stat: string;
  line: string;
};

export const crafts: Craft[] = [
  {
    title: "Teaching",
    icon: "teach",
    stat: "30+",
    line: "colleagues trained on AI at the Fed — and STEAM classes for kids before that",
  },
  {
    title: "Content creation",
    icon: "camera",
    stat: "93K+",
    line: "views across 47 videos, starting with Ren'Py tutorials in 2014",
  },
  {
    title: "Video editing",
    icon: "cut",
    stat: "3–8 min",
    // TODO(rose): name your editor (Premiere, DaVinci…) if you want it here.
    line: "lessons, recorded and cut by me — tutorials, speed-codes, demo reels",
  },
  {
    title: "Demoing",
    icon: "demo",
    stat: "3:49",
    line: "to walk through Code RARE, my full-stack social app, start to finish",
  },
];
