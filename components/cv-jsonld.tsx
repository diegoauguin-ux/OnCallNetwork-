const BASE_URL = "https://oncallnetwork.com.au";

export default function CvJsonLd({ faq }: { faq: { q: string; a: string }[] }) {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Australian CV Rewrite and Cover Letter",
      serviceType: "CV writing",
      provider: { "@type": "Organization", name: "On Call Network", url: BASE_URL },
      areaServed: { "@type": "Country", name: "Australia" },
      url: `${BASE_URL}/cv`,
      offers: { "@type": "Offer", price: "39", priceCurrency: "AUD", availability: "https://schema.org/InStock" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
