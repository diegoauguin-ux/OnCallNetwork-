import Reveal from "@/components/reveal";

const STEPS = [
  { t: "Apply online", d: "A five-minute written application covering experience, availability and RSA." },
  { t: "Structured interview", d: "Forty-five minutes with Diego, using the same framework for every applicant." },
  { t: "Reference checks", d: "We call your last two venue managers. Specific questions, not generic tick-boxes." },
  { t: "Receive shift offers", d: "Offers arrive by SMS with the venue, rate and hours. You accept what suits you." },
  { t: "Work and get paid", d: "Your agreed rate is paid directly by the venue. OCN never takes a cut." },
];

export default function HowItWorksWorkers() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-6">How to join</p>
          <h2 className="h-display h-section">Five steps, usually 7 to 14 days.</h2>
          <p className="mt-5 max-w-[34ch] text-[16px] text-ink/70">From application to first shift offer.</p>
        </div>
        <ol className="relative lg:col-span-7 lg:col-start-6">
          <span aria-hidden className="absolute bottom-3 left-[19px] top-3 w-px bg-line" />
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.t} delay={i * 60} className="relative grid grid-cols-[40px_1fr] gap-6 pb-10 last:pb-0">
              <span className="num relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-ink bg-white text-[13px] font-medium">
                {i + 1}
              </span>
              <div className="pt-1.5">
                <h3 className="font-display text-[26px] leading-tight tracking-tight">{s.t}</h3>
                <p className="mt-1.5 max-w-[48ch] text-[15.5px] leading-relaxed text-ink/70">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
