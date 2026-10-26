import Reveal from "@/components/reveal";

const STAGES = [
  { t: "Written application", d: "Experience, RSA, availability and shift history. Any red flag here and we stop.", m: "5 min" },
  { t: "Phone screen", d: "Same questions and scoring rubric for every applicant. No gut feel.", m: "15 min" },
  { t: "Founder interview", d: "Behavioural framework covering dependability, stress response and customer rapport.", m: "45 min" },
  { t: "Two reference checks", d: "We call the last two venue managers and ask about no-shows, conflict and rehire.", m: "2 calls" },
  { t: "Introduction", d: "Only candidates who pass all four stages meet your team.", m: "Final" },
];

export default function TrustSignals() {
  return (
    <section id="how-it-works" className="mt-24 bg-forest py-24 text-paper md:mt-32 md:py-36">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-6 !text-paper/55">Screening</p>
            <h2 className="h-display h-section !text-paper">Five checks before any candidate meets your venue.</h2>
            <p className="mt-6 max-w-[44ch] text-[18px] text-paper/70">
              Most platforms check a CV and hope. We run the same structured process on every applicant.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ol className="border-t border-paper/20">
            {STAGES.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 50} className="grid grid-cols-[48px_1fr_auto] items-baseline gap-4 border-b border-paper/20 py-7 md:grid-cols-[64px_1fr_auto]">
                <span className="num font-display text-[28px] leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-[28px] leading-tight tracking-tight">{s.t}</h3>
                  <p className="mt-1.5 max-w-[48ch] text-[15.5px] leading-relaxed text-paper/65">{s.d}</p>
                </div>
                <span className="num whitespace-nowrap text-[13px] uppercase tracking-[0.12em] text-paper/50">{s.m}</span>
              </Reveal>
            ))}
          </ol>

          <div className="mt-10 border border-paper/25 p-6 md:p-8">
            <h3 className="font-display text-[26px] leading-tight tracking-tight">The OCN Introduction Service Credit</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-paper/70">
              If an introduced candidate fails to show without 4+ hours&apos; notice, the $99 introduction fee is credited and OCN
              will use best efforts to source a replacement introduction at no extra cost, subject to network availability. OCN
              does not employ or direct candidates. This credit covers the introduction, not the shift.
            </p>
            <a href="#contact" className="mt-5 inline-block text-[15px] font-medium text-paper underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
              See the agreement
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
