import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXTAUTH_URL || "https://oncallnetwork.com.au";
  
  return {
    metadataBase: new URL(baseUrl),
    title: "On Call Network | Founder-led Hospitality Staff Introductions, Sydney",
    description: "A founder-led hospitality network for Sydney venues. Every candidate is personally interviewed by Diego using a structured 5-stage screening process, with a written no-show guarantee. Inner West, Eastern Suburbs, CBD and North Shore.",
    keywords: "hospitality staffing Sydney, bartender introductions Sydney, waiter agency Sydney, chef staffing Inner West, hospitality recruitment Sydney, reliable hospitality workers, pre-screened hospitality staff",
    openGraph: {
      title: "On Call Network | Founder-led Hospitality Staff Introductions",
      description: "Pre-screened Sydney hospitality staff, personally interviewed by the founder. Written no-show guarantee. You hire the worker directly &mdash; no hourly markup.",
      url: baseUrl,
      siteName: "On Call Network",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "On Call Network - Founder-led Hospitality Staff Introductions, Sydney",
        },
      ],
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "On Call Network | Founder-led Hospitality Staff Introductions",
      description: "Pre-screened Sydney hospitality staff. 5-stage interview framework. Written no-show guarantee. Inner West &middot; East &middot; CBD &middot; North Shore.",
      images: ["/og-image.png"],
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <style dangerouslySetInnerHTML={{ __html: `[data-hydration-error] { display: none !important; }` }} />
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
