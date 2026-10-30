import { GUIDES } from "@/lib/guides";
import { DJ } from "@/lib/dj";

const BASE = "https://www.oncallnetwork.com.au";

export const dynamic = "force-static";

export function GET() {
  const body = `# On Call Network (OCN)

> Founder-led hospitality recruitment in Sydney, Australia, plus an Australian CV and cover letter rewrite service. Based in the Inner West. Serves venues in the Inner West, Eastern Suburbs, CBD and North Shore.

## Services
- [Casual introductions](${BASE}/#hire): $99 per pre-screened hospitality candidate introduction (ex GST), with a written service credit if the candidate does not show.
- [Permanent placement](${BASE}/#hire): 18% of first-year salary (15% for the first three venues each month), shortlist of three in 5 to 7 days, 60-day replacement guarantee.
- [Australian CV Rewrite](${BASE}/cv): $39 AUD one-off. Rewritten CV, matching cover letter and application checklist, reviewed by a recruiter, delivered by email within 24 hours.
- [Corporate DJ hire](${BASE}/dj-hire-sydney): DJ, sound and lighting for Sydney corporate events (Christmas parties, product launches, networking events). Packages from $${DJ.packages[0].from} AUD, quoted individually in writing. Led by resident DJ Diego Pascal. Specialty: reggaeton, Latin, tech house and house, plus R&B, hip-hop and Top 40.
- [Apply to work](${BASE}/#apply): free for hospitality candidates. Venues pay workers directly; OCN takes no cut of pay.

## Guides
${GUIDES.map((g) => `- [${g.title}](${BASE}/guides/${g.slug}): ${g.description}`).join("\n")}

## About
- Founder: Diego Pascal, M.Psy (Universidad Andrés Bello), four years of recruitment experience across hospitality, corporate and technology in Australia and Latin America.
- OCN is a marketplace and introduction service for hospitality recruitment. It does not employ or pay candidates. DJ and event entertainment services are supplied directly by OCN under a written quote.
- Contact: hello@oncallnetwork.com.au
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
