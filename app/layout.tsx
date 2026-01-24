import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXTAUTH_URL || "https://oncallnetwork.com.au";
  
  return {
    metadataBase: new URL(baseUrl),
    title: "On Call Network | Premium Hospitality Staffing Sydney | 97% Show-Up Rate",
    description: "Sydney's most reliable hospitality staffing agency. 97% show-up rate, <2hr emergency response, vetted bartenders, waiters & chefs. Solve the $4,500 no-show problem.",
    keywords: "hospitality staffing Sydney, emergency staff Sydney, bartender hire Sydney, waiter agency Sydney, chef staffing Inner West, reliable hospitality workers",
    openGraph: {
      title: "On Call Network | Premium Hospitality Staffing Sydney",
      description: "97% show-up rate. Vetted hospitality professionals. <2hr emergency response. Never worry about staff no-shows again.",
      url: baseUrl,
      siteName: "On Call Network",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "On Call Network - Premium Hospitality Staffing Sydney",
        },
      ],
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "On Call Network | Premium Hospitality Staffing Sydney",
      description: "97% show-up rate. Vetted hospitality professionals. <2hr emergency response.",
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
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <style dangerouslySetInnerHTML={{ __html: `[data-hydration-error] { display: none !important; }` }} />
        {children}
      </body>
    </html>
  );
}
