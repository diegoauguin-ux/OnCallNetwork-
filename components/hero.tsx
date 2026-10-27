import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site-config";

const PATHS = [
  { n: "01", t: "I need staff", s: "Vetted Sydney hospitality staff. From $99.", h: "#hire" },
  { n: "02", t: "I need work", s: "Free to join. Paid directly by venues.", h: "#apply" },
  { n: "03", t: "I need a better CV", s: `Australian CV rewrite, ${SITE.cvPrice}. Ready in 24 hours.`, h: "/cv" },
];

export default function Hero() {
  return (
    <section id="top" className="pt-28 md:pt-40">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-14">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-7">Sydney hospitality recruitment</p>
          <h1 className="h-display h-hero">
            Hospitality hiring in Sydney, handled by someone who <em className="italic text-forest">answers the phone.</em>
          </h1>
          <p className="mt-7 max-w-[44ch] text-[19px] leading-[1.5] text-ink/75">
            Every candidate interviewed and reference-checked by the founder.
          </p>
        </div>

        <nav aria-label="Start here" className="lg:col-span-5">
          <ul className="border-t border-ink">
            {PATHS.map((p) => (
              <li key={p.n}>
                <Link
                  href={p.h}
                  className="group flex items-center justify-between gap-4 border-b border-line py-6 transition-colors hover:bg-white md:px-3"
                >
                  <span>
                    <span className="block font-display text-[32px] leading-none tracking-tight">{p.t}</span>
                    <span className="mt-2 block text-[15px] text-ink/70">{p.s}</span>
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/25 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
