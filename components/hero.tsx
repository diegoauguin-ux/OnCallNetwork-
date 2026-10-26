import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site-config";

const ROLES = [
  "Venue Managers",
  "Bar Managers",
  "Head Chefs",
  "Sous Chefs",
  "FOH Managers",
  "Bartenders",
  "Baristas",
  "Waitstaff",
  "Kitchen Hands",
];

const FACTS = [
  { k: "60 days", v: "Replacement guarantee on every permanent placement" },
  { k: "5–7 days", v: "To a shortlist of three, interviewed and referenced" },
  { k: "$99", v: "Casual introduction, with a written service credit" },
];

export default function Hero() {
  return (
    <section id="top" className="relative pt-28 md:pt-36">
      <div className="wrap">
        <p className="eyebrow mb-8">Sydney hospitality recruitment &nbsp;/&nbsp; Inner West, Eastern Suburbs, CBD, North Shore</p>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <h1 className="h-display h-hero">
              Hospitality hiring in Sydney, handled by someone who{" "}
              <em className="italic text-forest">answers the phone.</em>
            </h1>
            <p className="mt-8 max-w-[52ch] text-[19px] leading-[1.55] text-ink/75">
              One founder interviews and reference-checks every candidate before they reach your venue.
              Written guarantees in every agreement.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/#contact?service=permanent" className="btn btn-solid h-[52px] px-7">
                Submit a role brief
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="#apply" className="btn btn-outline h-[52px] px-7">
                Apply to work
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:pt-3">
            {SITE.heroImage ? (
              <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-md">
                <Image src={SITE.heroImage} alt={SITE.heroImageAlt} fill priority sizes="(min-width:1024px) 30vw, 100vw" className="object-cover" />
              </div>
            ) : null}
            <dl className="border-t border-ink">
              {FACTS.map((f) => (
                <div key={f.k} className="grid grid-cols-[auto_1fr] items-baseline gap-5 border-b border-line py-5">
                  <dt className="num font-display text-[34px] leading-none tracking-tight text-forest">{f.k}</dt>
                  <dd className="text-[14.5px] leading-snug text-ink/70">{f.v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>

      <div className="marquee mt-20 overflow-hidden border-y border-line py-5" aria-label="Roles we place">
        <div className="marquee-track" aria-hidden="true">
          {[...ROLES, ...ROLES, ...ROLES, ...ROLES].map((r, i) => (
            <span key={i} className="flex items-center whitespace-nowrap font-display text-[26px] tracking-tight text-ink/80">
              {r}
              <span className="mx-8 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
