import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import DjEnquiryForm from "@/components/dj/dj-enquiry-form";
import PackageCta from "@/components/dj/package-cta";
import DjJsonLd, { DJ_ROOT_CRUMBS } from "@/components/dj/dj-jsonld";
import { DJ, DJ_BASE_PATH, DJ_FAQS, DJ_TRUST, formatFrom } from "@/lib/dj";
import { DJ_SUBPAGES, DJ_SUBPAGE_PATH } from "@/lib/dj-pages";

const FROM = formatFrom(DJ.packages[0].from);
const TITLE = `Corporate DJ Hire Sydney | From ${FROM}`;
const DESCRIPTION = `Corporate DJ hire in Sydney CBD. DJ, sound and lighting for Christmas parties, launches and networking events. Packages from ${FROM}. Written quote within one business day.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "corporate dj sydney",
    "dj hire sydney",
    "corporate event dj sydney cbd",
    "christmas party dj sydney",
    "office party dj sydney",
    "product launch dj sydney",
    "latin dj sydney",
    "reggaeton dj sydney",
    "cocktail event dj sydney",
  ],
  alternates: { canonical: DJ_BASE_PATH },
  openGraph: {
    title: `${TITLE} | On Call Network`,
    description: DESCRIPTION,
    url: DJ_BASE_PATH,
    siteName: "On Call Network",
    locale: "en_AU",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "On Call Network: corporate DJ hire in Sydney" }],
  },
  twitter: { card: "summary_large_image", title: `${TITLE} | On Call Network`, description: DESCRIPTION, images: ["/og-image.png"] },
};

const STEPS = [
  { t: "Send your event details", d: "Date, venue, hours and guest numbers. It takes two minutes." },
  { t: "Get a written quote", d: "We aim to reply within one business day with the price, inclusions and booking terms." },
  { t: "Accept and relax", d: "Once you accept, the date is held. We plan the run sheet and handle setup on the day." },
];

export default function DjHirePage() {
  return (
    <>
      <DjJsonLd
        crumbs={DJ_ROOT_CRUMBS}
        faqs={DJ_FAQS.map((f) => ({ q: f.q, a: f.a }))}
        serviceName="Corporate DJ and event entertainment in Sydney"
        servicePath={DJ_BASE_PATH}
        withCatalog
      />
      <Header />
      <main>
        <section className="pt-32 md:pt-44">
          <div className="wrap">
            <p className="eyebrow mb-8">Corporate DJ hire, Sydney</p>
            <h1 className="h-display h-hero max-w-[16ch]">
              Corporate DJ &amp; <em className="italic text-forest">event entertainment</em> in Sydney.
            </h1>
            <p className="mt-8 max-w-[56ch] text-[19px] leading-[1.55] text-ink/75">
              DJ, sound and lighting for corporate events in the Sydney CBD. Packages from {FROM}. Led by resident DJ{" "}
              {DJ.residentDj}.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#quote" className="btn btn-solid h-[52px] px-7">Get a quote</a>
              <a href="#packages" className="btn btn-outline h-[52px] px-7">See packages</a>
            </div>
            <ul className="mt-14 grid gap-3 border-t border-ink pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {DJ_TRUST.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] text-ink/80">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="packages" className="py-24 md:py-32">
          <div className="wrap">
            <p className="eyebrow mb-6">Packages</p>
            <h2 className="h-display h-section max-w-[18ch]">Pick a starting point.</h2>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {DJ.packages.map((p) => (
                <article
                  key={p.id}
                  className={`flex flex-col rounded-md border p-8 ${p.featured ? "border-ink bg-white shadow-sm" : "border-line bg-paper"}`}
                >
                  {p.featured && <p className="eyebrow mb-3 !text-accent">Recommended for year-end events</p>}
                  <h3 className="font-display text-[34px] leading-none tracking-tight">{p.name}</h3>
                  <p className="mt-5 flex items-end gap-2">
                    <span className="sr-only">Starting price</span>
                    <span className="num font-display text-[56px] leading-[0.9] tracking-tight text-forest">
                      <span className="mr-1 text-[18px] text-muted">from</span>{formatFrom(p.from)}
                    </span>
                    <span className="pb-1 text-[14px] text-muted">AUD, {p.hours}</span>
                  </p>
                  <p className="mt-4 text-[15px] text-ink/70">{p.bestFor}</p>
                  <ul className="mt-6 space-y-3 text-[15px] text-ink/80">
                    {p.includes.map((i) => (
                      <li key={i} className="flex gap-3">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                        {i}
                      </li>
                    ))}
                  </ul>
                  <PackageCta id={p.id} className="btn btn-solid mt-8 w-full">Request this package</PackageCta>
                </article>
              ))}
            </div>
            <p className="mt-6 max-w-[78ch] text-[13.5px] leading-relaxed text-muted">
              {DJ.pricingNote} {DJ.extraHours}
            </p>
          </div>
        </section>

        <section className="bg-white py-24 md:py-32">
          <div className="wrap grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-6">Events we play</p>
              <h2 className="h-display h-section">Built for Sydney business events.</h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="grid gap-3 sm:grid-cols-2">
                {DJ.eventTypes.map((e) => (
                  <li key={e} className="flex gap-3 border-b border-line pb-3 text-[16px] text-ink/80">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    {e}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[15px] text-ink/70">Looking for something specific?</p>
              <ul className="mt-2 space-y-1.5">
                {DJ_SUBPAGES.map((s) => (
                  <li key={s.slug}>
                    <Link href={DJ_SUBPAGE_PATH(s.slug)} className="text-[16px] underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
                      {s.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="wrap grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-6">Music</p>
              <h2 className="h-display h-section">Latin energy, open-format range.</h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="eyebrow mb-3">Our specialty</p>
              <ul className="flex flex-wrap gap-2">
                {DJ.musicHeadline.map((m) => (
                  <li key={m} className="rounded-full bg-forest px-4 py-2 text-[14.5px] text-paper">{m}</li>
                ))}
              </ul>
              <p className="eyebrow mb-3 mt-8">Also</p>
              <ul className="flex flex-wrap gap-2">
                {DJ.musicAlso.map((m) => (
                  <li key={m} className="rounded-full border border-ink/25 px-4 py-2 text-[14.5px] text-ink/80">{m}</li>
                ))}
              </ul>
              {DJ.mixLinks.length > 0 && (
                <div className="mt-8">
                  <p className="eyebrow mb-3">Listen</p>
                  <ul className="space-y-1.5">
                    {DJ.mixLinks.map((l) => (
                      <li key={l.url}>
                        <a href={l.url} target="_blank" rel="noopener noreferrer" className="underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="mt-8 text-[15px] text-ink/70">
                Instagram:{" "}
                <a href={DJ.instagram} target="_blank" rel="noopener noreferrer" className="underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
                  @diegopascal
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="bg-forest py-24 text-paper md:py-32">
          <div className="wrap">
            <p className="eyebrow mb-6 !text-paper/60">How it works</p>
            <h2 className="h-display h-section max-w-[16ch] !text-paper">Three steps to a booked date.</h2>
            <ol className="mt-14 grid border-t border-paper/25 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.t} className="border-b border-paper/20 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                  <span className="num font-display text-[56px] leading-none text-accent-light">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 font-display text-[28px] leading-tight tracking-tight">{s.t}</h3>
                  <p className="mt-2 text-[15.5px] text-paper/70">{s.d}</p>
                </li>
              ))}
            </ol>
            <p className="mt-10 max-w-[70ch] text-[14.5px] leading-relaxed text-paper/70">
              Where we work: {DJ.areas.join(", ")}.
            </p>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="wrap grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-6">About</p>
              <h2 className="h-display h-section">Who you are booking.</h2>
            </div>
            <p className="max-w-[58ch] text-[17px] leading-relaxed text-ink/75 lg:col-span-7 lg:col-start-6">
              On Call Network delivers DJ and event sound for Sydney businesses, led by resident DJ {DJ.residentDj}, who has more than ten
              years of experience DJing in clubs and at corporate and private events. These entertainment services are supplied directly by
              On Call Network under a written quote.
            </p>
          </div>
        </section>

        <section id="faq" className="bg-white py-24 md:py-32">
          <div className="wrap grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-6">Questions</p>
              <h2 className="h-display h-section">Before you enquire.</h2>
            </div>
            <dl className="border-t border-ink lg:col-span-7 lg:col-start-6">
              {DJ_FAQS.map((f) => (
                <div key={f.q} className="border-b border-line py-6">
                  <dt className="font-display text-[26px] leading-snug tracking-tight">{f.q}</dt>
                  <dd className="mt-2 max-w-[56ch] text-[16px] leading-relaxed text-ink/70">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="quote" className="scroll-mt-20 py-24 md:py-32">
          <div className="wrap grid gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow mb-6">Get a quote</p>
              <h2 className="h-display h-section">Tell us about your event.</h2>
              <p className="mt-5 max-w-[44ch] text-[17px] text-ink/70">
                Send the date, venue and hours. We aim to reply with a written quote within one business day.
              </p>
              <p className="mt-6 text-[15px] text-ink/70">
                Prefer email?{" "}
                <a href="mailto:hello@oncallnetwork.com.au" className="underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
                  hello@oncallnetwork.com.au
                </a>
              </p>
            </div>
            <DjEnquiryForm sourcePage={DJ_BASE_PATH} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
