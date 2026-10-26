import Link from "next/link";
import Reveal from "@/components/reveal";
import { SITE } from "@/lib/site-config";

export default function Testimonials() {
  if (SITE.showTestimonials && SITE.testimonials.length > 0) {
    return (
      <section className="border-t border-line py-24 md:py-32">
        <div className="wrap grid gap-10 md:grid-cols-3">
          {SITE.testimonials.map((t, i) => (
            <Reveal as="figure" key={i} delay={i * 80} className="border-t border-ink pt-6">
              <blockquote className="font-display text-[26px] leading-snug tracking-tight">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 text-[14px] text-muted">
                <span className="font-medium text-ink">{t.name}</span>, {t.role}, {t.venue}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-line py-20 md:py-28">
      <div className="wrap grid items-end gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-6">Why founder-led</p>
          <h2 className="h-display h-section">New brand. Not a new face in Sydney hospitality.</h2>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="text-[17px] text-ink/70">
            Talk to Diego for 15 minutes and judge for yourself.
          </p>
          <Link href="/#contact?service=permanent" className="btn btn-solid mt-6">Book a 15-min call</Link>
        </div>
      </div>
    </section>
  );
}
