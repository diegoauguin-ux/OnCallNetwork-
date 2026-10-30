import { DJ, DJ_BASE_PATH } from "@/lib/dj";

const BASE_URL = "https://www.oncallnetwork.com.au";

type Crumb = { name: string; path: string };

// Server-rendered structured data for the DJ pages. No ratings or reviews
// markup: none exist, and none are invented.
export default function DjJsonLd({
  crumbs,
  faqs,
  serviceName,
  servicePath,
  withCatalog,
}: {
  crumbs: Crumb[];
  faqs: { q: string; a: string }[];
  serviceName: string;
  servicePath: string;
  withCatalog?: boolean;
}) {
  const service: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    serviceType: "DJ and event entertainment",
    provider: { "@type": "Organization", name: "On Call Network", url: BASE_URL },
    areaServed: { "@type": "City", name: "Sydney" },
    url: `${BASE_URL}${servicePath}`,
  };
  if (withCatalog) {
    service.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: "Corporate DJ packages",
      itemListElement: DJ.packages.map((p) => ({
        "@type": "Offer",
        name: `${p.name} (${p.hours})`,
        description: p.bestFor,
        priceCurrency: "AUD",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: p.from,
          priceCurrency: "AUD",
        },
        itemOffered: { "@type": "Service", name: `${p.name} DJ package` },
      })),
    };
  }

  const data = [
    service,
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: `${BASE_URL}${c.path}`,
      })),
    },
  ];

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export const DJ_ROOT_CRUMBS: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Corporate DJ hire Sydney", path: DJ_BASE_PATH },
];

