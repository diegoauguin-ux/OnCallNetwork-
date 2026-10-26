import { venuesFAQ, workersFAQ } from "@/lib/faq-data";

const BASE_URL = "https://oncallnetwork.com.au";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "On Call Network",
  alternateName: "OCN",
  url: BASE_URL,
  logo: `${BASE_URL}/ocn-icon.png`,
  founder: {
    "@type": "Person",
    name: "Diego Pascal",
    jobTitle: "Founder",
    alumniOf: "Universidad Andrés Bello",
    knowsAbout: ["Hospitality recruitment", "Behavioural interviewing", "Australian CV writing"],
  },
  sameAs: [],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "hello@oncallnetwork.com.au",
      contactType: "customer service",
      areaServed: "AU-NSW",
      availableLanguage: ["English"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sydney",
    addressRegion: "NSW",
    addressCountry: "AU",
  },
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "EmploymentAgency",
  name: "On Call Network",
  url: BASE_URL,
  email: "hello@oncallnetwork.com.au",
  priceRange: "$$",
  areaServed: [
    { "@type": "City", name: "Sydney" },
    { "@type": "AdministrativeArea", name: "Inner West Sydney" },
    { "@type": "AdministrativeArea", name: "Eastern Suburbs Sydney" },
    { "@type": "AdministrativeArea", name: "Sydney CBD" },
    { "@type": "AdministrativeArea", name: "North Shore Sydney" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sydney",
    addressRegion: "NSW",
    addressCountry: "AU",
  },
  serviceType: [
    "Hospitality Recruitment",
    "Casual Hospitality Staff Introductions",
    "Permanent Hospitality Placements",
  ],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "On Call Network",
  url: BASE_URL,
  publisher: {
    "@type": "Organization",
    name: "On Call Network",
  },
};

const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...venuesFAQ, ...workersFAQ].map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const cvService = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Australian CV Rewrite",
  serviceType: "CV and cover letter writing",
  description:
    "Your CV rewritten to Australian standards, with a matching cover letter and application checklist, reviewed by a recruiter and delivered by email within 24 hours.",
  provider: { "@type": "Organization", name: "On Call Network", url: BASE_URL },
  areaServed: { "@type": "Country", name: "Australia" },
  url: `${BASE_URL}/cv`,
  offers: { "@type": "Offer", price: "39", priceCurrency: "AUD", availability: "https://schema.org/InStock", url: `${BASE_URL}/cv` },
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cvService) }}
      />
    </>
  );
}
