import type { Metadata, Viewport } from "next";
import { Baloo_Paaji_2, Open_Sans } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const baloo = Baloo_Paaji_2({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-baloo",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const siteUrl = "https://roselene-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Builder, analyst, and product thinker`,
    template: `%s — ${profile.name}`,
  },
  description: profile.subhead,
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: [
    "Roselene Gabun",
    "business analyst",
    "product manager",
    "AI automation",
    "software engineer",
    "management information systems",
    "San Jose State University",
    "Next.js",
    "TypeScript",
    "portfolio",
  ],
  openGraph: {
    type: "profile",
    siteName: profile.name,
    title: `${profile.name} — Builder, analyst, and product thinker`,
    description: profile.subhead,
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Builder, analyst, and product thinker`,
    description: profile.subhead,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e11" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${baloo.variable} ${openSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
