import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Reveal from "@/components/reveal";
import { SITE } from "@/lib/site-config";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Australian CV Rewrite and Cover Letter Service",
  description:
    "Professional CV and cover letter rewrite for Australian employers, reviewed by a recruiter. $39 AUD, delivered by email within 24 hours. Ideal for hospitality and entry-level roles.",
  keywords: ["australian cv rewrite", "cv writing service australia", "cover letter service", "hospitality resume australia", "resume rewrite sydney"],
  alternates: { canonical: "/cv" },
};

const INCLUDED = [
  { t: "Rewritten CV", d: "Restructured and reworded to Australian conventions: clear format, measurable results, the right length for the role." },
  { t: "Matching cover letter", d: "A cover letter that fits the CV and the type of role you are applying for." },
  { t: "Application checklist", d: "What to check before you hit send: contact details, work rights wording, references and common mistakes." },
];

const STEPS = [
  { t: "Pay securely", d: `One payment of ${SITE.cvPrice} AUD through Stripe.` },
  { t: "Send your details", d: "On the next page, upload your current CV and tell us the role you want." },
  { t: "Receive it by email", d: "Your CV, cover letter and checklist arrive within 24 hours." },
];

const FAQ = [
  { q: "Who checks my CV?", a: "Every CV is reviewed by Diego before it reaches you. He has four years of recruitment experience across hospitality, corporate and technology." },
  { q: "What do I need to send?", a: "Your current CV in any common format, and the type of role you are applying for. Rough or outdated is fine." },
  { q: "How will I receive it?", a: "By email, from hello@oncallnetwork.com.au, within 24 hours of submitting your details." },
  { q: "Is my CV kept private?", a: "It is used only to prepare your documents. See our Privacy Policy for how personal information is handled." },
];

export default function CvPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 md:pt-44">
          <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-8">Australian CV rewrite</p>
              <h1 className="h-display h-hero">
                A CV that reads the way <em className="italic text-forest">Australian employers</em> expect.
              </h1>
              <p className="mt-8 max-w-[52ch] text-[19px] leading-[1.55] text-ink/75">
                Send your current CV. Within 24 hours you receive a rewritten CV, a matching cover letter and an application
                checklist, reviewed by a recruiter.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href={SITE.cvPaymentUrl} className="btn btn-solid h-[52px] px-7">
                  Get my CV rewritten
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <span className="text-[14px] text-muted">Secure checkout by Stripe</span>
              </div>
            </div>
            <aside className="lg:col-span-4 lg:pt-3">
              <div className="border-t border-ink pt-6">
                <div className="flex items-end gap-3">
                  <span className="num font-display text-[104px] leading-[0.8] tracking-tight text-forest">{SITE.cvPrice}</span>
                  <span className="pb-1 text-[15px] text-muted">AUD, one-off</span>
                </div>
                <p className="mt-5 text-[14.5px] text-ink/70">One payment. No subscription. Delivered by email within 24 hours.</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="wrap grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-6">What you get</p>
              <h2 className="h-display h-section">Three documents, ready to send.</h2>
            </div>
            <ul className="border-t border-ink lg:col-span-7 lg:col-start-6">
              {INCLUDED.map((i) => (
                <Reveal as="li" key={i.t} className="flex gap-4 border-b border-line py-7">
                  <Check className="mt-1.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-display text-[28px] leading-tight tracking-tight">{i.t}</h3>
                    <p className="mt-1.5 max-w-[48ch] text-[15.5px] leading-relaxed text-ink/70">{i.d}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-forest py-24 text-paper md:py-32">
          <div className="wrap">
            <p className="eyebrow mb-6 !text-paper/55">How it works</p>
            <h2 className="h-display h-section max-w-[16ch] !text-paper">Three steps, one day.</h2>
            <ol className="mt-14 grid border-t border-paper/25 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.t} className="border-b border-paper/20 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                  <span className="num font-display text-[56px] leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 font-display text-[28px] leading-tight tracking-tight">{s.t}</h3>
                  <p className="mt-2 text-[15.5px] text-paper/70">{s.d}</p>
                </li>
              ))}
            </ol>
            <a href={SITE.cvPaymentUrl} className="btn btn-accent mt-12 h-[52px] px-7">Get my CV rewritten</a>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="wrap grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-6">Questions</p>
              <h2 className="h-display h-section">Before you order.</h2>
            </div>
            <dl className="border-t border-ink lg:col-span-7 lg:col-start-6">
              {FAQ.map((f) => (
                <div key={f.q} className="border-b border-line py-6">
                  <dt className="font-display text-[26px] leading-snug tracking-tight">{f.q}</dt>
                  <dd className="mt-2 max-w-[56ch] text-[16px] leading-relaxed text-ink/70">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="wrap mt-20">
            <p className="eyebrow mb-4">Free guides</p>
            <ul className="border-t border-ink">
              {GUIDES.slice(0, 3).map((g) => (
                <li key={g.slug} className="border-b border-line">
                  <Link href={`/guides/${g.slug}`} className="block py-5 font-display text-[26px] leading-tight tracking-tight hover:text-forest">
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="wrap mt-16">
            <Link href="/" className="text-[15px] underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
              Back to On Call Network
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
