import Link from "next/link";
import { Check } from "lucide-react";
import Reveal from "@/components/reveal";
import { SITE } from "@/lib/site-config";

export default function CvTeaser() {
  return (
    <section id="cv" className="bg-white py-24 md:py-32">
      <Reveal className="wrap grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-6">CV rewrite</p>
          <h2 className="h-display h-section">Get hired faster with an Australian CV.</h2>
          <ul className="mt-8 space-y-3">
            {["Rewritten CV", "Matching cover letter", "Application checklist"].map((i) => (
              <li key={i} className="flex gap-3 text-[18px]">
                <Check className="mt-1.5 h-5 w-5 shrink-0 text-accent" />
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <div className="flex items-end gap-3">
            <span className="num font-display text-[104px] leading-[0.8] tracking-tight text-forest">{SITE.cvPrice}</span>
            <span className="pb-1 text-[15px] text-muted">AUD, one-off</span>
          </div>
          <p className="mt-4 text-[15px] text-ink/70">Reviewed by a recruiter. In your inbox within 24 hours.</p>
          <a href={SITE.cvPaymentUrl} className="btn btn-solid mt-7 h-[52px] px-7">Get my CV rewritten</a>
          <Link href="/cv" className="mt-4 block text-[14.5px] underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
            What&apos;s included
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
