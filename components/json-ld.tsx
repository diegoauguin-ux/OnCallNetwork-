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
    name: "Diego Sauvalle",
    jobTitle: "Founder",
  },
  sameAs: [],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+61424195996",
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
  telephone: "+61424195996",
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
    </>
  );
}
