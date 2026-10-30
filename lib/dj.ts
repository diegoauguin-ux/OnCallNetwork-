// Single source of truth for the DJ / event entertainment section.
// Edit prices, copy and zone lists here. Nothing in this file is fabricated:
// no testimonials, client names, awards or past-event claims.

export const DJ_BASE_PATH = "/dj-hire-sydney";
export const DJ_UPDATED = "2026-10-30";

export type DjPackage = {
  id: "essentials" | "signature" | "premium";
  name: string;
  from: number;
  hours: string;
  featured?: boolean;
  bestFor: string;
  includes: string[];
};

export const DJ = {
  brand: "On Call Network",
  residentDj: "Diego Pascal",
  city: "Sydney",
  instagram: "https://instagram.com/djdiegopascal",
  // Add public links to 1–2 mixes (SoundCloud / Instagram). The block hides if empty.
  mixLinks: [] as { label: string; url: string }[],
  // Flip to true ONLY once public liability insurance is in place and a
  // certificate of currency can be supplied. Controls the insurance FAQ + claim.
  hasPublicLiability: false,
  currency: "AUD",
  pricingNote:
    "Prices are in AUD and show the starting price for a standard date in Sydney CBD and inner-city venues. Your written quote confirms the final price, including date, location, hours, equipment and any GST that applies, before you commit.",
  packages: [
    {
      id: "essentials",
      name: "Essentials",
      from: 550,
      hours: "2 hours",
      bestFor: "Office drinks, networking and cocktail events, venues with their own sound system",
      includes: [
        "Professional DJ and a set matched to your crowd and brand",
        "Music for arrivals, mingling and dancing",
        "Setup and pack-down included",
        "Works with the venue's existing sound system",
      ],
    },
    {
      id: "signature",
      name: "Signature",
      from: 890,
      hours: "4 hours",
      featured: true,
      bestFor: "End-of-year parties, product launches, team celebrations",
      includes: [
        "Everything in Essentials",
        "Professional PA speakers sized to your room",
        "Wireless microphone for speeches and announcements",
        "Dance-floor lighting",
        "Planning call and run sheet before the event",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      from: 1390,
      hours: "5 hours",
      bestFor: "Gala dinners, brand activations, large corporate events",
      includes: [
        "Everything in Signature",
        "Upgraded sound coverage for larger rooms",
        "Extended lighting setup",
        "MC / host moments on request",
        "Pre-event planning with you on timings and music",
      ],
    },
  ] as DjPackage[],
  extraHours: "Additional hours are quoted per event.",
  eventTypes: [
    "End-of-year and Christmas parties",
    "Product launches and brand activations",
    "Networking and cocktail events",
    "Conference after-parties",
    "Awards nights and gala dinners",
    "Team offsites and staff celebrations",
    "Latin and themed nights",
    "Venue and bar nights",
  ],
  musicHeadline: ["Reggaeton and Latin", "Tech house and house"],
  musicAlso: [
    "R&B and hip-hop",
    "Top 40 and pop",
    "Dance and throwback classics",
    "Lounge and background music for arrivals",
  ],
  areas: [
    "Sydney CBD",
    "Circular Quay",
    "Barangaroo",
    "Darling Harbour",
    "Surry Hills",
    "Pyrmont",
    "Inner West",
    "Eastern Suburbs",
    "North Shore",
    "Greater Sydney on request",
  ],
  // Internal-only helpers for the enquiry handler (never rendered on the site).
  zoneA: [
    "cbd", "sydney cbd", "sydney", "circular quay", "barangaroo", "darling harbour", "pyrmont",
    "surry hills", "haymarket", "the rocks", "ultimo", "darlinghurst", "potts point",
    "woolloomooloo", "millers point", "chinatown", "world square",
  ],
  zoneB: [
    "newtown", "glebe", "paddington", "bondi", "coogee", "randwick", "north sydney", "mosman",
    "balmain", "marrickville", "redfern", "alexandria", "waterloo", "kings cross", "chippendale",
    "leichhardt", "annandale", "crows nest", "neutral bay", "cremorne", "kirribilli",
    "milsons point", "lavender bay", "mcmahons point", "enmore", "erskineville", "camperdown",
    "st peters", "rozelle", "woollahra", "double bay", "edgecliff", "rushcutters bay", "elizabeth bay",
  ],
  zoneC: [
    "parramatta", "penrith", "blacktown", "liverpool", "campbelltown", "sutherland", "cronulla",
    "hornsby", "castle hill", "northern beaches", "dee why", "manly", "chatswood", "bankstown",
    "homebush", "olympic park", "macquarie park", "ryde", "epping", "cabramatta", "wollongong",
    "newcastle", "blue mountains", "central coast",
  ],
} as const;

export type DjFaq = { q: string; a: string; requires?: "insurance" };

const FAQ_ALL: DjFaq[] = [
  {
    q: "How much does a corporate DJ cost in Sydney?",
    a: `Packages start from $${DJ.packages[0].from} for a 2-hour set and from $${DJ.packages[1].from} for a 4-hour set with PA speakers, wireless microphone and lighting, for a standard date in the Sydney CBD and inner city. Every event is quoted individually based on date, location, hours, venue access and equipment, and the final price is confirmed in writing before you commit.`,
  },
  {
    q: "Do you travel outside the Sydney CBD?",
    a: "Yes. CBD and inner-city events are our home base. For other parts of Sydney the quote includes travel and logistics, so send your venue and we will confirm the price in writing.",
  },
  {
    q: "What equipment is included?",
    a: "Essentials works with the venue's sound system. Signature and Premium include professional speakers, a wireless microphone and lighting, set up and packed down by us.",
  },
  {
    q: "What music do you play?",
    a: "Reggaeton, Latin, tech house and house are our specialty. We also play what a Sydney crowd expects: R&B, hip-hop, Top 40, pop and dance classics. We build the set around your guests and brand.",
  },
  {
    q: "What types of events do you cover?",
    a: "End-of-year parties, product launches, networking and cocktail events, conference after-parties, gala dinners, team celebrations and themed nights.",
  },
  {
    q: "Can you handle speeches and announcements?",
    a: "Yes. Signature and Premium include a wireless microphone, and we plan the run sheet with you beforehand so the music and speeches flow.",
  },
  {
    q: "How far ahead should I book?",
    a: "November and December fill quickly. For end-of-year parties, enquire 3 to 4 weeks ahead where you can. Shorter notice is often possible, so send your date and we will confirm availability.",
  },
  {
    q: "What are your booking terms?",
    a: "Your written quote sets out the price, what is included, the deposit and the cancellation terms. Nothing is booked until you accept it, and we send an invoice for every booking.",
  },
  {
    q: "Do you carry public liability insurance?",
    a: "Yes. A certificate of currency is available on request for venues and clients.",
    requires: "insurance",
  },
];

export const DJ_FAQS: DjFaq[] = FAQ_ALL.filter(
  (f) => f.requires !== "insurance" || DJ.hasPublicLiability
);

export const DJ_TRUST = [
  "10+ years DJing",
  "Clubs, corporate and private events",
  "Setup and pack-down included",
  "Written quote within one business day",
];

export function packageById(id: string | null | undefined) {
  return DJ.packages.find((p) => p.id === id);
}

export type Zone = "A" | "B" | "C" | "Check";

export function guessZone(venueAndSuburb: string): Zone {
  const text = venueAndSuburb.toLowerCase();
  const has = (list: readonly string[]) => list.some((s) => text.includes(s));
  // Check the farther zones first so "Manly" or "Parramatta" never falls into
  // a nearer list through a generic word such as "sydney".
  if (has(DJ.zoneC)) return "C";
  if (has(DJ.zoneB)) return "B";
  if (has(DJ.zoneA)) return "A";
  return "Check";
}

export function formatFrom(n: number) {
  return `$${n.toLocaleString("en-AU")}`;
}
