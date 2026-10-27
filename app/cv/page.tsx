import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Reveal from "@/components/reveal";
import { SITE } from "@/lib/site-config";
import { GUIDES } from "@/lib/guides";
import JsonLdScript from "@/components/cv-jsonld";

export const metadata: Metadata = {
  title: "Australian CV Rewrite and Cover Letter Service",
  description:
    "Professional CV and cover letter rewrite for Australian employers, reviewed by a recruiter. $39 AUD, delivered by email within 24 hours.",
  keywords: ["australian cv rewrite", "cv writing service australia", "cover letter service", "hospitality resume australia", "resume rewrite sydney"],
  alternates: { canonical: "/cv" },
};

const FOR_WHO = [
  "Backpackers and students new to the Australian job market",
  "Anyone applying for bar, cafe, restaurant, hotel or events work in Sydney",
  "People whose CV is in another format (photo, date of birth, long paragraphs)",
  "Career changers who need their experience explained clearly",
];

const BEFORE = [
  "Photo, date of birth, nationality and marital status",
  "Two-column design that ATS software scrambles",
  "Duties listed, no results or scale",
  "Visa and availability missing or buried",
  "Three pages for two jobs",
];

const AFTER = [
  "One clean column, standard headings, no personal data Australian employers do not want",
  "Real job titles and keywords from the role",
  "Strong action bullets using only facts you gave us",
  "Work rights and availability right under your summary",
  "One page, or two for senior roles",
];

const INCLUDED = [
  { t: "Rewritten CV", d: "Restructured and reworded to Australian conventions: clear format, measurable results, the right length for the role." },
  { t: "Matching cover letter", d: "A cover letter that fits the CV and the type of role you are applying for." },
  { t: "Phone-screen prep", d: "The six questions recruiters ask first for your role, with honest answer suggestions built from your own experience." },
  { t: "Application checklist", d: "Where to apply, how to name the file, LinkedIn and SEEK tweaks, and what to do after you hit send." },
];

const STEPS = [
  { t: "Pay securely", d: `One payment of ${SITE.cvPrice} AUD through Stripe. No account needed.` },
  { t: "Send your details", d: "On the next page, upload your current CV and tell us the role you want." },
  { t: "Receive it by email", d: "Your CV, cover letter and checklist arrive within 24 hours." },
];

const FAQ = [
  { q: "Will it pass ATS software?", a: "Yes. It is built as a plain, single-column document with standard headings, real job titles and the keywords of the role you want, so SEEK, Workable, Employment Hero and similar systems read it correctly. No tables, graphics or photos." },
  { q: "Do you invent experience or skills?", a: "Never. Everything comes from your CV and your answers. If something important is missing, we ask you instead of guessing." },
  { q: "Who checks my CV?", a: "Every CV is reviewed by Diego before it reaches you. He has four years of recruitment experience across hospitality, corporate and technology." },
  { q: "Is it suitable for a Working Holiday or student visa?", a: "Yes. Your work rights and availability are placed where recruiters look first, so you are not dropped at the first phone screen. We use the wording you give us and never change your visa details." },
  { q: "What do I need to send?", a: "Your current CV (PDF or Word) and the role you want. Rough or outdated is fine. No CV yet? Tell us your jobs and dates in the form and we will build it." },
  { q: "What if I want changes?", a: "One round of changes is included. Reply to the email within 7 days and we update it, free." },
  { q: "What if it is late?", a: "If your documents do not arrive within 24 hours of submitting your details, you get a full refund." },
  { q: "How will I receive it?", a: "By email from hello@oncallnetwork.com.au, as Word files you can edit and save as PDF." },
  { q: "Is my CV kept private?", a: "It is used only to prepare your documents. See our Privacy Policy for how personal information is handled." },
];

export default function CvPage() {
  return (
    <>
      <JsonLdScript faq={FAQ} />
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
              <h2 className="h-display h-section">Four documents, ready to send.</h2>
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

        <section className="bg-white py-24 md:py-32">
          <div className="wrap">
            <p className="eyebrow mb-6">Before and after</p>
            <h2 className="h-display h-section max-w-[18ch]">What changes in your CV.</h2>
            <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2">
              <div className="bg-paper p-8">
                <h3 className="font-display text-[26px] tracking-tight">Typical overseas CV</h3>
                <ul className="mt-5 space-y-3 text-[15.5px] text-ink/70">
                  {BEFORE.map((b) => (<li key={b} className="flex gap-3"><span aria-hidden="true">&times;</span>{b}</li>))}
                </ul>
              </div>
              <div className="bg-paper p-8">
                <h3 className="font-display text-[26px] tracking-tight text-forest">After the rewrite</h3>
                <ul className="mt-5 space-y-3 text-[15.5px] text-ink/80">
                  {AFTER.map((a) => (<li key={a} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-accent" />{a}</li>))}
                </ul>
              </div>
            </div>
            <h3 className="mt-16 font-display text-[28px] tracking-tight">Who it is for</h3>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {FOR_WHO.map((w) => (<li key={w} className="flex gap-3 text-[16px] text-ink/75"><Check className="mt-1 h-4 w-4 shrink-0 text-accent" />{w}</li>))}
            </ul>
          </div>
        </section>

        <section className="bg-forest py-24 text-paper md:py-32">
          <div className="wrap">
            <p className="eyebrow mb-6 !text-paper/60">How it works</p>
            <h2 className="h-display h-section max-w-[16ch] !text-paper">Three steps, one day.</h2>
            <ol className="mt-14 grid border-t border-paper/25 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.t} className="border-b border-paper/20 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                  <span className="num font-display text-[56px] leading-none text-accent-light">{String(i + 1).padStart(2, "0")}</span>
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
