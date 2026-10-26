"use client";

import { useState } from "react";


const TABS = ["Venues", "Workers"] as const;

export default function FAQ() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Venues");
  const [open, setOpen] = useState<number | null>(0);
  const venuesFAQ = [
    { question: "OCN is new. Why should I trust it?", answer: "Don't, blindly. That's why every casual intro carries a written service credit and every permanent placement a 60-day replacement guarantee. Speak to Diego for 15 minutes and judge for yourself." },
    { question: "How does the $99 casual introduction work?", answer: "Send Diego the shift details. He proposes one pre-screened candidate and you approve. The $99 (ex GST) is invoiced after their first confirmed shift. You pay the candidate directly; OCN takes no cut of their pay." },
    { question: "What does the 18% placement fee include?", answer: "18% of first-year salary (ex GST), payable on the start date. It includes the intake brief, a shortlist of three in 5 to 7 days, interview notes, reference checks and a 60-day replacement guarantee. The first three venues each month pay 15%." },
    { question: "How are you different from Sidekicker or labour hire?", answer: "We introduce, you engage. You agree the rate with the candidate and pay them directly. We charge one flat fee, with no hourly markup and no ongoing fees." },
    { question: "What areas and roles do you cover?", answer: "Inner West, Eastern Suburbs, CBD and North Shore. Managers, chefs, bartenders, baristas, waitstaff and kitchen hands. Hospitality only." },
  ];
  const workersFAQ = [
    { question: "How much do I get paid?", answer: "You agree your rate with the venue, at or above the Hospitality Industry (General) Award. The venue pays you in full. OCN never takes a cut." },
    { question: "Do I have to accept every shift?", answer: "No. Accept only the offers that suit you. No minimum shifts and no penalty for saying no." },
    { question: "How selective is the screening?", answer: "Diego interviews every applicant and checks two references from your last venue managers. The goal is a network of people he would genuinely vouch for." },
  ];
  const list = tab === "Venues" ? venuesFAQ : workersFAQ;

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-6">Questions</p>
          <h2 className="h-display h-section">Quick answers.</h2>
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
