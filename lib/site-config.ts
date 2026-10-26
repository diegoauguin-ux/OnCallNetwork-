// Flip these when real assets / social proof exist. Nothing here is fabricated.
export const SITE = {
  // Set to a path in /public (e.g. "/img/venue-hero.jpg") to show a photo in the hero.
  heroImage: null as string | null,
  heroImageAlt: "A Sydney hospitality venue",
  showTestimonials: false,
  // Real testimonials only, with written consent.
  testimonials: [] as { quote: string; name: string; role: string; venue: string }[],
  cvPaymentUrl:
    process.env.NEXT_PUBLIC_CV_PAYMENT_URL ||
    "https://buy.stripe.com/aFa14o7Tz7Eb40L6fN6Zy00",
  cvPrice: "$39",
  builder: { name: "RapidoWeb", url: "https://rapidoweb.com.au" },
} as const;
