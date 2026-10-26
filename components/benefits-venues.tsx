import Reveal from "@/components/reveal";

const ITEMS = [
  { t: "One documented process", d: "Every candidate follows the same five-stage interview. Same questions, same rubric, same standard. We can show you the framework." },
  { t: "Written service credit", d: "If the candidate we introduce doesn't arrive, the fee is credited and Diego sources a replacement. It's a clause in your agreement." },
  { t: "No hourly markup", d: "OCN is a marketplace, not a labour-hire agency. You agree the rate and pay the worker directly. We charge an introduction fee, nothing else." },
  { t: "One phone number", d: "No call centres, no ticket queues. Diego handles every introduction, enquiry and replacement, which is why capacity is limited." },
  { t: "Hospitality only", d: "Bartenders, waitstaff, baristas, kitchen hands and chefs. No construction, aged care or cleaning. Focus is the advantage." },
  { t: "Sydney local", d: "Inner West, Eastern Suburbs, CBD and North Shore. Candidates who know your suburb, your clientele and how to get to you." },
];

const PROFILE: [string, string][] = [
  ["Role", "Bar Manager"],
  ["Area", "Inner West Sydney"],
  ["Availability", "Thursday to Sunday nights"],
  ["Experience", "Years in hospitality and role history"],
  ["Rate expectation", "Range, shared up front"],
  ["Behavioural profile", "Highlights from the OCN interview"],
];

export default function BenefitsVenues() {
  return (
    <section id="venues" className="py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">For venues</p>
            <h2 className="h-display h-section">Staff you can count on, hired without the guesswork.</h2>
          </div>
          <p className="max-w-[52ch] text-[18px] text-ink/70 lg:col-span-6 lg:col-start-7 lg:pt-10">
            OCN replaces post-and-pray job boards and high-markup labour hire with a documented screening process and a founder
            who stands behind every introduction in writing.
          </p>
        </div>

        <div className="mt-16 grid gap-x-16 border-t border-ink md:grid-cols-2">
          {ITEMS.map((it, i) => (
            <Reveal key={it.t} delay={(i % 2) * 60} className="grid grid-cols-[44px_1fr] gap-4 border-b border-line py-8">
              <span className="num pt-1.5 text-[13px] text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-[28px] leading-tight tracking-tight">{it.t}</h3>
                <p className="mt-2 max-w-[46ch] text-[15.5px] leading-relaxed text-ink/70">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">What a shortlist looks like</p>
            <p className="max-w-[40ch] text-[16px] text-ink/70">
              Full name, contact details and CV are released after Diego confirms the shortlist with you. Want the real format?
              Ask and we&apos;ll send a sample.
            </p>
            <a href="#contact" className="mt-5 inline-block text-[15px] font-medium underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
              Ask to see it
            </a>
          </div>
          <div className="border border-ink bg-white lg:col-span-6 lg:col-start-7">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <span className="text-[13px] font-medium uppercase tracking-[0.12em]">Candidate snapshot</span>
              <span className="text-[12px] uppercase tracking-[0.12em] text-muted">Example, anonymised</span>
            </div>
            <dl>
              {PROFILE.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[150px_1fr] gap-4 border-b border-line px-6 py-3.5 last:border-b-0 sm:grid-cols-[190px_1fr]">
                  <dt className="text-[14px] text-muted">{k}</dt>
                  <dd className="text-[15px]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
