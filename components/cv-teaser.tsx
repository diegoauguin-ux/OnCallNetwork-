import Link from "next/link";
import Reveal from "@/components/reveal";
import { SITE } from "@/lib/site-config";

export default function CvTeaser() {
  return (
    <section className="border-y border-line bg-white py-20 md:py-28">
      <Reveal className="wrap grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-6">For job seekers</p>
          <h2 className="h-display h-section">An Australian CV, rewritten by a recruiter.</h2>
          <p className="mt-6 max-w-[52ch] text-[18px] text-ink/70">
            Your experience, in the format Australian hospitality employers actually read. Rewritten CV, matching cover letter and
            application checklist, delivered by email within 24 hours.
          </p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <div className="flex items-end gap-3">
            <span className="num font-display text-[84px] leading-[0.8] tracking-tight text-forest">{SITE.cvPrice}</span>
            <span className="pb-1 text-[15px] text-muted">AUD, one-off</span>
          </div>
          <Link href="/cv" className="btn btn-solid mt-8">See what&apos;s included</Link>
        </div>
      </Reveal>
    </section>
  );
}
