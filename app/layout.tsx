import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import JsonLd from "@/components/json-ld";
import Analytics from "@/components/analytics";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/geist";
import "./globals.css";

const BASE_URL = "https://www.oncallnetwork.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "On Call Network | Sydney Hospitality Recruitment and CV Rewrite",
    template: "%s | On Call Network",
  },
  description:
    "Founder-led Sydney hospitality recruitment: $99 casual intros, 18% permanent placements. Plus an Australian CV rewrite for $39.",
  keywords: [
    "Sydney hospitality recruitment",
    "hospitality staff Sydney",
    "casual bartender introductions Sydney",
    "venue manager recruitment Sydney",
    "head chef recruitment Sydney",
    "hospitality agency Inner West",
    "australian cv rewrite",
    "cv writing service australia",
    "cover letter service australia",
    "hospitality jobs sydney",
    "hospitality interview tips australia",
  ],
  authors: [{ name: "Diego Pascal" }],
  creator: "On Call Network",
  publisher: "On Call Network",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "On Call Network | Sydney Hospitality Recruitment",
    description:
      "The Sydney hospitality recruiter venues actually trust. One founder, one phone number, every candidate personally interviewed. Introduction-backed service credit and 60-day replacement guarantees.",
    url: BASE_URL,
    siteName: "On Call Network",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "On Call Network: Sydney hospitality recruitment",
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  category: "business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <body suppressHydrationWarning>
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
