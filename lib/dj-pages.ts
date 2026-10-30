import { DJ, DJ_BASE_PATH, formatFrom } from "@/lib/dj";

export type DjSubPage = {
  slug: string;
  h1: string;
  eyebrow: string;
  // Page <title> without the site suffix (layout appends " | On Call Network").
  title: string;
  description: string;
  keywords: string[];
  intro: string;
  body: string[];
  points: string[];
  faqs: { q: string; a: string }[];
  other: string[]; // slugs of related sub-pages
};

const from = formatFrom(DJ.packages[0].from);
const sig = formatFrom(DJ.packages[1].from);

export const DJ_SUBPAGES: DjSubPage[] = [
  {
    slug: "christmas-party-dj",
    h1: "Christmas Party DJ in Sydney",
    eyebrow: "End-of-year parties",
    title: `Christmas Party DJ Sydney | From ${from}`,
    description: `Book a DJ for your Sydney end-of-year work party. Sound, microphone and lighting are included in 4-hour packages from ${sig}. Written quote within one business day.`,
    keywords: ["christmas party dj sydney", "office party dj sydney", "end of year party dj sydney", "corporate christmas party dj"],
    intro:
      "A good work Christmas party needs the right music at the right moment: easy background sound while people arrive, then energy once the room warms up. We plan that flow with you and run it on the night.",
    body: [
      "End-of-year parties in Sydney book out from late November, so earlier enquiries get the choice of dates and times. Send your date, venue and guest numbers and we confirm availability and a written price.",
      "We build the set around your team: a mix of crowd favourites, R&B, pop and dance classics, with reggaeton, Latin and house when the floor is ready for it. A wireless microphone is included in Signature and Premium for speeches, awards and raffle draws.",
    ],
    points: [
      "Arrivals and mingling music, then a steady build to the dance floor",
      "Wireless microphone for speeches, awards and announcements",
      "Sound and lighting sized to your room",
      "Run sheet agreed before the night so timing never depends on guesswork",
    ],
    faqs: [
      {
        q: "How early should we book a Christmas party DJ in Sydney?",
        a: "Enquire as soon as you have a date. Popular December dates go first, and 3 to 4 weeks ahead gives the most choice.",
      },
      {
        q: "Can the DJ take requests from staff?",
        a: "Yes, within the style of the event. We agree the music direction with you beforehand and can take a short list of must-play and do-not-play songs.",
      },
      {
        q: "What do we need to send for a quote?",
        a: "Your date, start and end time, venue and suburb, approximate guest numbers, and whether the venue already has a sound system.",
      },
    ],
    other: ["product-launch-dj", "latin-reggaeton-dj"],
  },
  {
    slug: "product-launch-dj",
    h1: "DJ for Product Launches and Brand Events in Sydney",
    eyebrow: "Launches and activations",
    title: `Product Launch DJ Sydney | From ${from}`,
    description: `DJ for product launches and brand events in the Sydney CBD. Professional sound, lighting and microphone for launches and activations. Packages from ${from}.`,
    keywords: ["product launch dj sydney", "brand event dj sydney", "corporate event dj sydney cbd", "brand activation dj"],
    intro:
      "At a launch, music sets the tone before anyone speaks. We match the sound to your brand and audience, then work around the moments that matter: arrivals, the reveal, the speeches and the after-party.",
    body: [
      "We work alongside event managers, venues and AV teams, so the DJ fits your run sheet rather than the other way around. If the venue already has a sound system we use it; if not, Signature and Premium include speakers, a wireless microphone and lighting.",
      "Tell us about the brand, the guest list and the key moments in the program. We shape the music for each part of the event, from low-key background sound at arrival to a livelier set once the formalities finish.",
    ],
    points: [
      "Music matched to the brand, the audience and the venue",
      "Clean handover to speeches and presentations",
      "Works with event managers and AV teams on the day",
      "Setup and pack-down included, with access times agreed in advance",
    ],
    faqs: [
      {
        q: "Can you coordinate with our event manager and AV supplier?",
        a: "Yes. Share the run sheet and venue contact, and we confirm load-in time, sound requirements and cue points ahead of the event.",
      },
      {
        q: "Do you supply the sound system for launches?",
        a: "Signature and Premium include speakers, a wireless microphone and lighting. Essentials works with the venue's own system. Your quote lists exactly what is included.",
      },
      {
        q: "Can the music be kept low enough for conversation?",
        a: "Yes. Many launches need background sound for networking before the feature moments, and we set the level and style with you in advance.",
      },
    ],
    other: ["christmas-party-dj", "latin-reggaeton-dj"],
  },
  {
    slug: "latin-reggaeton-dj",
    h1: "Latin & Reggaeton DJ in Sydney",
    eyebrow: "Latin and themed nights",
    title: "Latin & Reggaeton DJ Sydney",
    description:
      "Reggaeton, Latin and tech house DJ for corporate and private events in Sydney. R&B, hip-hop and Top 40 too. Get a written quote within one business day.",
    keywords: ["latin dj sydney", "reggaeton dj sydney", "latin night dj sydney", "latin corporate event dj"],
    intro:
      "Reggaeton and Latin music is our specialty. It gets a room moving quickly, which makes it a strong choice for company parties, cultural celebrations and themed nights.",
    body: [
      "We mix Latin and reggaeton with the open-format music a Sydney crowd expects, so one set works for everyone in the room: R&B, hip-hop, pop and dance classics sit alongside reggaeton, Latin and tech house. You tell us the balance and we read the room on the night.",
      "Latin nights work well as company social events, venue promotions and private parties. Packages are the same as for our other events, with sound and lighting included in Signature and Premium.",
    ],
    points: [
      "Reggaeton and Latin sets, from warm-up to peak hour",
      "Open-format mixing so every guest has something to dance to",
      "Themed nights for companies, venues and communities",
      "Same clear packages and written quote as every other event",
    ],
    faqs: [
      {
        q: "Can you play only Latin music?",
        a: "Yes. A full Latin and reggaeton set is available, and you can also choose a mix with R&B, pop and house depending on your guests.",
      },
      {
        q: "Do you play Latin nights at venues and bars?",
        a: "Yes. Venues can enquire about one-off or recurring Latin nights. Send the venue, date and hours and we respond with a written quote.",
      },
      {
        q: "Is a Latin DJ suitable for a corporate event?",
        a: "Often, yes. We adjust the volume, song choice and pacing to suit a workplace audience and keep the set appropriate for the room.",
      },
    ],
    other: ["christmas-party-dj", "product-launch-dj"],
  },
];

export function subPageBySlug(slug: string) {
  return DJ_SUBPAGES.find((p) => p.slug === slug);
}

export const DJ_SUBPAGE_PATH = (slug: string) => `${DJ_BASE_PATH}/${slug}`;
