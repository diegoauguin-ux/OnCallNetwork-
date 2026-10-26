import Link from "next/link";
import Reveal from "@/components/reveal";

const STEPS = [
  { n: "01", t: "Submit your role", d: "Tell us the role, team size and what great looks like for your venue.", m: "5 minutes" },
  { n: "02", t: "We screen candidates", d: "Diego interviews every candidate with a psychology-based behavioural framework. Only the top 20% make the shortlist.", m: "5–7 days" },
  { n: "03", t: "You meet three", d: "A shortlist of three pre-screened candidates. You decide who to hire.", m: "3 candidates" },
  { n: "04", t: "Hire on your terms", d: "Pay 18% of annual salary (15% for founding venues) only when your chosen candidate starts. 60-day replacement guarantee included.", m: "18% on hire" },
];

export default function HowItWorksVenues() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-6">Permanent recruitment</p>
            <h2 className="h-display h-section max-w-[16ch]">Four steps from brief to start date.</h2>
          </div>
          <p className="max-w-[40ch] text-[17px] text-ink/70">A boutique process designed for senior hospitality hires.</p>
        </div>

        <ol className="mt-16 grid border-t border-ink md:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 70} className="border-b border-line py-8 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <span className="num font-display text-[56px] leading-none tracking-tight text-forest">{s.n}</span>
              <h3 className="mt-5 font-display text-[26px] leading-tight tracking-tight">{s.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{s.d}</p>
              <p className="num mt-5 text-[12px] font-medium uppercase tracking-[0.12em] text-accent">{s.m}</p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-12">
          <Link href="/#contact?service=permanent" className="btn btn-solid">Submit a role brief</Link>
        </div>
      </div>
    </section>
  );
}
