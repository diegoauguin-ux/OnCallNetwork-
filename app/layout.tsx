import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import JsonLd from "@/components/json-ld";
import Analytics from "@/components/analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const BASE_URL = "https://oncallnetwork.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "On Call Network | Sydney Hospitality Recruitment",
    template: "%s | On Call Network",
  },
  description:
    "Founder-led Sydney hospitality recruitment. $99 casual intros with a no-show refund, and 18% permanent placements (15% founding rate) with a 60-day replacement guarantee. Inner West, Eastern Suburbs, CBD, North Shore.",
  keywords: [
    "Sydney hospitality recruitment",
    "hospitality staff Sydney",
    "casual bartender introductions Sydney",
    "venue manager recruitment Sydney",
    "head chef recruitment Sydney",
    "hospitality agency Inner West",
    "Barcats alternative Sydney",
    "Sidekicker alternative Sydney",
  ],
  authors: [{ name: "Diego Auguin" }],
  creator: "On Call Network",
  publisher: "On Call Network",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "On Call Network | Sydney Hospitality Recruitment",
    description:
      "The Sydney hospitality recruiter venues actually trust. One founder, one phone number, every candidate personally interviewed. Written no-show and 60-day replacement guarantees.",
    url: BASE_URL,
    siteName: "On Call Network",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "On Call Network — Sydney hospitality recruitment",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "On Call Network | Sydney Hospitality Recruitment",
    description:
      "Pre-screened Sydney hospitality staff. $99 casual intros. 18% permanent placements with a 60-day replacement guarantee.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/ocn-icon.png", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/ocn-icon.png",
    apple: "/ocn-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={inter.variable} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <style dangerouslySetInnerHTML={{ __html: `[data-hydration-error] { display: none !important; }` }} />
        <JsonLd />
        {children}
        <Toaster position="top-center" richColors closeButton />
        <Analytics />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
