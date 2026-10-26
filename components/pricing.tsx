import Link from "next/link";
import { Check } from "lucide-react";
import Reveal from "@/components/reveal";
import { PRICING } from "@/lib/pricing";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-6">Pricing</p>
            <h2 className="h-display h-section">Placement and introduction fees, in plain numbers.</h2>
          </div>
          <p className="max-w-[44ch] text-[17px] text-ink/70 lg:col-span-4 lg:col-start-9 lg:pt-10">
            Built for venues that want better hires without agency complexity.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <Reveal className="bg-forest p-8 text-paper md:p-12 lg:col-span-7">
            <p className="text-[13px] uppercase tracking-[0.14em] text-paper/60">Hiring a senior role?</p>
            <h3 className="mt-3 font-display text-[34px] leading-tight tracking-tight">{PRICING.permanentStandard.label}</h3>
            <div className="mt-8 flex items-end gap-3">
              <span className="num font-display text-[104px] leading-[0.8] tracking-tight">{PRICING.permanentStandard.feePercent}%</span>
              <span className="pb-1 text-[16px] text-paper/70">of annual salary</span>
            </div>
            <p className="mt-5 text-[15px] text-accent">First 3 venues each month pay {PRICING.permanentFounding.feePercent}%.</p>
            <p className="mt-2 text-[14px] text-paper/60">
              Payable {PRICING.permanentStandard.payableWhen}. {PRICING.permanentStandard.paymentTerms}.
            </p>
            <ul className="mt-8 grid gap-3 border-t border-paper/20 pt-8 sm:grid-cols-2">
              {[
                "Venue Manager, Bar Manager, Head Chef, Sous Chef, FOH Manager",
                "Psychology-based behavioural screening",
                "Shortlist of three candidates in 5–7 days",
                "60-day replacement guarantee, at no cost",
                "Founder interviews every candidate personally",
                "No upfront cost. No retainer.",
              ].map((f) => (
                <li key={f} className="flex gap-3 text-[15px] leading-snug text-paper/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/#contact?service=permanent" className="btn btn-accent mt-10">Submit a role brief</Link>
          </Reveal>

          <Reveal delay={90} className="flex flex-col border border-ink bg-white p-8 md:p-10 lg:col-span-5">
            <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Need a shift covered?</p>
            <h3 className="mt-3 font-display text-[30px] leading-tight tracking-tight">{PRICING.casualIntro.label}</h3>
            <div className="mt-8 flex items-end gap-3">
              <span className="num font-display text-[84px] leading-[0.8] tracking-tight text-forest">${PRICING.casualIntro.fee}</span>
              <span className="pb-1 text-[16px] text-muted">per introduction</span>
            </div>
            <p className="mt-5 text-[14px] text-muted">
              Payable {PRICING.casualIntro.payableWhen}. Service credit and a replacement introduction if the candidate doesn&apos;t show.
            </p>
            <ul className="mt-8 grid gap-3 border-t border-line pt-8">
              {[
                "Pre-screened candidates with the OCN behavioural profile",
                "Same-day matching where capacity allows",
                "You pay the candidate directly at the agreed award rate",
                "Fee credited if the candidate doesn't show without 4+ hours' notice",
              ].map((f) => (
                <li key={f} className="flex gap-3 text-[15px] leading-snug text-ink/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/#contact?service=casual" className="btn btn-outline mt-auto self-start !mt-10">Book a casual intro</Link>
          </Reveal>
        </div>

        <p className="mt-8 text-[13px] text-muted">
          Boutique service. Founder-led screening. Sydney hospitality only. {PRICING.gstDisclosure}
        </p>
      </div>
    </section>
  );
}
