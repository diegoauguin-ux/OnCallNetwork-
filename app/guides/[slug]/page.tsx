import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { GUIDES, GUIDES_UPDATED, getGuide } from "@/lib/guides";
import { SITE } from "@/lib/site-config";

const BASE = "https://oncallnetwork.com.au";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = getGuide(params.slug);
  if (!g) return {};
  return {
    title: g.metaTitle,
    description: g.description,
    keywords: g.keywords,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { title: g.metaTitle, description: g.description, url: `${BASE}/guides/${g.slug}`, type: "article", locale: "en_AU" },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = getGuide(params.slug);
  if (!g) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: g.title,
      description: g.description,
      datePublished: GUIDES_UPDATED,
      dateModified: GUIDES_UPDATED,
      inLanguage: "en-AU",
      mainEntityOfPage: `${BASE}/guides/${g.slug}`,
      author: { "@type": "Person", name: "Diego Pascal", jobTitle: "Founder, On Call Network" },
      publisher: { "@type": "Organization", name: "On Call Network", url: BASE, logo: { "@type": "ImageObject", url: `${BASE}/ocn-icon.png` } },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: g.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE}/guides` },
        { "@type": "ListItem", position: 3, name: g.title, item: `${BASE}/guides/${g.slug}` },
      ],
    },
  ];

  const others = GUIDES.filter((x) => x.slug !== g.slug).slice(0, 3);

  return (
    <>
      <Header />
      <main className="pt-32 md:pt-40">
        {jsonLd.map((j, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(j) }} />
        ))}
        <article className="wrap">
          <Link href="/guides" className="eyebrow hover:text-ink">Guides</Link>
          <h1 className="h-display mt-6 max-w-[20ch] text-[clamp(2.6rem,6vw,5rem)] leading-[0.98]">{g.title}</h1>
          <p className="mt-6 max-w-[56ch] text-[20px] leading-[1.5] text-ink/75">{g.intro}</p>
          <p className="mt-6 text-[13px] text-muted">
            By Diego Pascal, recruiter &nbsp;/&nbsp; {g.readMins} min read &nbsp;/&nbsp; Updated 26 October 2026
          </p>

          <div className="mt-14 max-w-[68ch]">
            {g.sections.map((s) => (
              <section key={s.h} className="mb-12">
                <h2 className="font-display text-[34px] leading-tight tracking-tight">{s.h}</h2>
                {s.p?.map((t, i) => (
                  <p key={i} className="mt-4 text-[18px] leading-[1.7] text-ink/80">{t}</p>
                ))}
                {s.list && (
                  <ul className="mt-4 space-y-2.5">
                    {s.list.map((l) => (
                      <li key={l} className="flex gap-3 text-[18px] leading-[1.6] text-ink/80">
                        <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {l}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="mb-12 border-t border-ink pt-8">
              <h2 className="font-display text-[34px] leading-tight tracking-tight">Quick answers</h2>
              <dl className="mt-4">
                {g.faq.map((f) => (
                  <div key={f.q} className="border-b border-line py-5">
                    <dt className="font-display text-[24px] leading-snug tracking-tight">{f.q}</dt>
                    <dd className="mt-2 text-[17px] leading-relaxed text-ink/75">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          <aside className="mb-20 bg-forest p-8 text-paper md:p-12">
            {g.cta === "cv" ? (
              <>
                <h2 className="h-display h-section !text-paper">Want it done for you?</h2>
                <p className="mt-4 max-w-[48ch] text-[17px] text-paper/75">
                  We rewrite your CV for Australian employers and add a matching cover letter and checklist. Reviewed by a recruiter, delivered within 24 hours.
                </p>
                <a href={SITE.cvPaymentUrl} className="btn btn-accent mt-8 h-[52px] px-7">Get my CV rewritten, {SITE.cvPrice}</a>
              </>
            ) : (
              <>
                <h2 className="h-display h-section !text-paper">Looking for hospitality work in Sydney?</h2>
                <p className="mt-4 max-w-[48ch] text-[17px] text-paper/75">Apply to the OCN network. Free to join, and venues pay you directly.</p>
                <Link href="/#apply" className="btn btn-accent mt-8 h-[52px] px-7">Apply to work</Link>
              </>
            )}
          </aside>

          <section className="mb-24">
            <p className="eyebrow mb-4">More guides</p>
            <ul className="border-t border-ink">
              {others.map((o) => (
                <li key={o.slug} className="border-b border-line">
                  <Link href={`/guides/${o.slug}`} className="block py-5 font-display text-[26px] leading-tight tracking-tight hover:text-forest">
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
