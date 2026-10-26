import Link from "next/link";
import { Check } from "lucide-react";
import Reveal from "@/components/reveal";
import { PRICING } from "@/lib/pricing";

const PROOF = [
  "Every candidate interviewed and reference-checked",
  "No hourly markup. You pay the worker directly",
  "Written service credit and 60-day guarantee",
];

export default function Hire() {
  return (
    <section id="hire" className="mt-28 py-4 md:mt-40">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-6">For venues</p>
            <h2 className="h-display h-section">Hire staff you can count on.</h2>
          </div>
          <ul className="space-y-3 lg:col-span-5 lg:col-start-8 lg:pt-4">
            {PROOF.map((p) => (
              <li key={p} className="flex gap-3 text-[17px] leading-snug">
                <Check className="mt-1 h-5 w-5 shrink-0 text-accent" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Reveal className="flex flex-col border border-ink bg-white p-8 md:p-10">
            <p className="eyebrow">Need a shift covered?</p>
            <h3 className="mt-3 font-display text-[30px] leading-tight tracking-tight">Casual introduction</h3>
            <div className="mt-6 flex items-end gap-3">
              <span className="num font-display text-[88px] leading-[0.8] tracking-tight text-forest">${PRICING.casualIntro.fee}</span>
              <span className="pb-1 text-[15px] text-muted">per introduction</span>
            </div>
            <p className="mt-5 text-[15.5px] text-ink/70">Pre-screened candidate, same-day where capacity allows. Pay on first confirmed shift.</p>
            <Link href="/#contact?service=casual" className="btn btn-outline mt-8 self-start">Get a candidate</Link>
          </Reveal>

          <Reveal delay={80} className="flex flex-col bg-forest p-8 text-paper md:p-10">
            <p className="eyebrow !text-paper/60">Hiring a senior role?</p>
            <h3 className="mt-3 font-display text-[30px] leading-tight tracking-tight">Permanent placement</h3>
            <div className="mt-6 flex items-end gap-3">
              <span className="num font-display text-[88px] leading-[0.8] tracking-tight">{PRICING.permanentStandard.feePercent}%</span>
              <span className="pb-1 text-[15px] text-paper/65">of annual salary</span>
            </div>
            <p className="mt-5 text-[15.5px] text-paper/80">
              Shortlist of three in 5 to 7 days. Paid only when they start.{" "}
              <span className="text-accent">{PRICING.permanentFounding.feePercent}% for the first 3 venues each month.</span>
            </p>
            <Link href="/#contact?service=permanent" className="btn btn-accent mt-8 self-start">Submit a role brief</Link>
          </Reveal>
        </div>

        <p className="mt-6 max-w-[100ch] text-[12.5px] leading-relaxed text-muted">
          Casual introductions: if the candidate fails to show without 4+ hours&apos; notice, the $99 is credited and OCN will use best
          efforts to source a replacement, subject to availability. The credit covers the introduction, not the shift. {PRICING.gstDisclosure}
        </p>
      </div>
    </section>
  );
}
