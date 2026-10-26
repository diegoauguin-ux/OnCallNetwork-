"use client";

import { useState } from "react";


const TABS = ["Venues", "Workers"] as const;

export default function FAQ() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Venues");
  const [open, setOpen] = useState<number | null>(0);
  const venuesFAQ = [
    {
      question: "OCN is new. Why should I trust it?",
      answer:
        "You shouldn't, not blindly. That's exactly why we built a written service credit into every casual intro and a 60-day replacement guarantee into every permanent placement. If it doesn't work, you don't pay. Your risk on the first engagement is limited to time, not money. Judge us on what actually happens.",
    },
    {
      question: "How does the $99 Casual Introduction work?",
      answer:
        "You message Diego with the shift details (role, date, hours, rate). Diego proposes one pre-screened candidate from the network. You approve them. The $99 intro fee (ex GST) is invoiced after the candidate completes their first confirmed shift. If the candidate doesn't show, the fee is credited in full and Diego sources a replacement at no extra cost. You pay the candidate their hourly rate directly, OCN never takes a cut of their pay.",
    },
    {
      question: "What's included in the 18% permanent placement fee?",
      answer:
        "18% of the candidate's first-year gross annual salary (ex GST), payable on the candidate's start date on 14-day terms. The fee includes: intake brief with Diego, bespoke search, 3-person shortlist (typically within 5\u20137 days), full interview notes and reference checks, and a 60-day replacement guarantee. For the first three venues to sign each month, the fee is 15% under the Founding Venues programme.",
    },
    {
      question: "How do you screen candidates?",
      answer:
        "A documented 5-stage process, the same for every applicant. Stage 1: written application. Stage 2: 15-minute structured phone screen. Stage 3: 45-minute behavioural interview with Diego using a written framework and scoring rubric. Stage 4: two reference calls with the applicant's last two venue managers. Stage 5: only then do we introduce them to a venue. We'll share the interview framework with any venue that asks.",
    },
    {
      question: "How is this different from Sidekicker, Barcats or a labour-hire agency?",
      answer:
        "Sidekicker and similar labour-hire platforms employ the worker, add an hourly markup on every hour worked, and you pay them. Barcats is a public job board where anyone can post. OCN is neither: we're an introduction and recruitment service. You engage or employ the candidate directly, at a rate you agree with them, and pay them directly. We charge one flat introduction or placement fee per successful engagement, no hourly markup, no ongoing fees.",
    },
    {
      question: "How do I pay, and when?",
      answer:
        "Casual introductions: $99 (ex GST) invoiced after the candidate's first confirmed shift, 7-day terms. Permanent placements: 18% of first-year gross annual salary (ex GST), invoiced on the candidate's start date, 14-day terms. All invoices GST-inclusive where applicable. Bank transfer (preferred) or credit card.",
    },
    {
      question: "What happens if the candidate doesn't work out?",
      answer:
        "Casual: service credit + replacement intro if candidate doesn't show or leaves within the first two hours. Permanent: 60-day replacement guarantee, if the candidate resigns or is terminated for performance reasons in the first 60 days, Diego personally re-opens the search and delivers a replacement shortlist at no extra fee.",
    },
    {
      question: "What areas and roles do you cover?",
      answer:
        "Inner West, Eastern Suburbs, CBD and North Shore Sydney. Venue Managers, Bar Managers, Head Chefs, Sous Chefs, FOH/BOH Managers, Bartenders, Baristas, Chefs and Kitchen Hands. Hospitality only, we deliberately don't do other industries.",
    },
    {
      question: "How fast can you respond?",
      answer:
        "For urgent casual requests with less than 24 hours' notice, Diego replies within 2 business hours and attempts to introduce a candidate within the day. For planned casual requests, we confirm within 24 hours. For permanent searches, a 3-person shortlist typically lands within 5\u20137 days of intake.",
    },
    {
      question: "When will you publish real testimonials?",
      answer:
        "Once the first three venues have completed a placement and given signed consent to be quoted and named. We won't fabricate social proof, and we won't quote anyone without written permission. If you want to speak to an existing venue before engaging, ask Diego for a reference call.",
    },
  ];

  const workersFAQ = [
    {
      question: "How much do I get paid?",
      answer: "You agree your hourly rate directly with the venue, in line with the Hospitality Industry (General) Award as a minimum. OCN never takes a cut from your pay, the venue pays you in full, to you, under their payment terms. Weekend and public holiday loadings apply as per the Award.",
    },
    {
      question: "Do I have to accept every shift?",
      answer: "No. You accept only the offers that suit your diary. There is no mandatory acceptance, no minimum shifts and no penalty for saying no.",
    },
    {
      question: "What happens if I can't make a shift I accepted?",
      answer: "Life happens. Let us and the venue know with as much notice as possible, ideally 4+ hours. Repeated no-shows without reasonable notice will mean removal from the network, because the whole system depends on the word of the people in it.",
    },
    {
      question: "How selective is the screening?",
      answer: "We interview every applicant personally before introducing them to a venue, and we check two references from your last two venue managers. We're not trying to filter to a headline percentage, we're trying to make sure every person in the network is someone Diego would genuinely vouch for.",
    },
  ];

  const list = tab === "Venues" ? venuesFAQ : workersFAQ;

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-6">Questions</p>
          <h2 className="h-display h-section">Straight answers.</h2>
          <p className="mt-5 max-w-[34ch] text-[16px] text-ink/70">
            Not here? Email{" "}
            <a className="underline decoration-accent decoration-2 underline-offset-4" href="mailto:hello@oncallnetwork.com.au">
              hello@oncallnetwork.com.au
            </a>{" "}
            and Diego replies personally.
          </p>
        </div>

        <div className="lg:col-span-8">
          <div role="tablist" aria-label="FAQ audience" className="flex gap-8 border-b border-line">
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => {
                  setTab(t);
                  setOpen(0);
                }}
                className={`-mb-px border-b-2 pb-3 text-[15px] font-medium transition-colors ${
                  tab === t ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"
                }`}
              >
                For {t.toLowerCase()}
              </button>
            ))}
          </div>

          <div role="tabpanel">
            {list.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.question} className="border-b border-line">
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${tab}-${i}`}
                      className="flex min-h-[64px] w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span className="font-display text-[24px] leading-snug tracking-tight">{item.question}</span>
                      <span aria-hidden className="relative h-4 w-4 shrink-0">
                        <span className="absolute left-0 top-1/2 h-px w-4 bg-ink" />
                        <span className={`absolute left-1/2 top-0 h-4 w-px bg-ink transition-transform duration-200 ${isOpen ? "scale-y-0" : ""}`} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-${tab}-${i}`}
                    role="region"
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[62ch] pb-6 text-[16px] leading-[1.65] text-ink/70">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
