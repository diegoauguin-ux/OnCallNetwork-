import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import DjEnquiryForm from "@/components/dj/dj-enquiry-form";
import DjJsonLd from "@/components/dj/dj-jsonld";
import { DJ, DJ_BASE_PATH, formatFrom } from "@/lib/dj";
import { DJ_SUBPAGES, DJ_SUBPAGE_PATH, subPageBySlug } from "@/lib/dj-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return DJ_SUBPAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = subPageBySlug(params.slug);
  if (!page) return {};
  const path = DJ_SUBPAGE_PATH(page.slug);
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: `${page.title} | On Call Network`,
      description: page.description,
      url: path,
      siteName: "On Call Network",
      locale: "en_AU",
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: page.h1 }],
    },
    twitter: { card: "summary_large_image", title: `${page.title} | On Call Network`, description: page.description, images: ["/og-image.png"] },
  };
}

export default function DjSubPage({ params }: { params: { slug: string } }) {
  const page = subPageBySlug(params.slug);
  if (!page) notFound();
  const path = DJ_SUBPAGE_PATH(page.slug);
  const related = DJ_SUBPAGES.filter((p) => page.other.includes(p.slug));
  const defaultEventType = ({
    "christmas-party-dj": "End-of-year and Christmas parties",
    "product-launch-dj": "Product launches and brand activations",
    "latin-reggaeton-dj": "Latin and themed nights",
    "private-party-dj": "Private parties and birthdays",
    "house-tech-house-dj": "Venue and bar nights",
    "rnb-hip-hop-dj": "Private parties and birthdays",
  } as Record<string, string>)[page.slug];

  return (
    <>
      <DjJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "DJ hire Sydney", path: DJ_BASE_PATH },
          { name: page.h1, path },
        ]}
        faqs={page.faqs}
        serviceName={page.h1}
        servicePath={path}
      />
      <Header />
      <main>
        <section className="pt-32 md:pt-44">
          <div className="wrap">
            <nav aria-label="Breadcrumb" className="mb-8 text-[14px] text-muted">
              <Link href="/" className="hover:text-ink">Home</Link> / <Link href={DJ_BASE_PATH} className="hover:text-ink">DJ hire</Link>
            </nav>
            <p className="eyebrow mb-6">{page.eyebrow}</p>
            <h1 className="h-display h-hero max-w-[18ch]">{page.h1}</h1>
            <p className="mt-8 max-w-[58ch] text-[19px] leading-[1.55] text-ink/75">{page.intro}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#quote" className="btn btn-solid h-[52px] px-7">Get a quote</a>
              <Link href={`${DJ_BASE_PATH}#packages`} className="btn btn-outline h-[52px] px-7">
                Packages from {formatFrom(DJ.packages[0].from)}
              </Link>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="wrap grid gap-12 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-6">
              {page.body.map((b) => (
                <p key={b} className="max-w-[58ch] text-[17px] leading-relaxed text-ink/75">{b}</p>
              ))}
            </div>
            <ul className="border-t border-ink lg:col-span-5 lg:col-start-8">
              {page.points.map((p) => (
                <li key={p} className="flex gap-4 border-b border-line py-5 text-[16px] text-ink/80">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white py-24 md:py-32">
          <div className="wrap grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-6">Questions</p>
              <h2 className="h-display h-section">Quick answers.</h2>
            </div>
            <dl className="border-t border-ink lg:col-span-7 lg:col-start-6">
              {page.faqs.map((f) => (
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
                Packages start from {formatFrom(DJ.packages[0].from)} for a standard date in the Sydney CBD and inner city. Your written
                quote confirms the final price before you commit.
              </p>
              <p className="mt-8 eyebrow mb-3">Also see</p>
              <ul className="space-y-1.5">
                <li>
                  <Link href={DJ_BASE_PATH} className="underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
                    DJ hire in Sydney: all packages
                  </Link>
                </li>
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={DJ_SUBPAGE_PATH(r.slug)} className="underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
                      {r.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <DjEnquiryForm sourcePage={path} defaultEventType={defaultEventType} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
