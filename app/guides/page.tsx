import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { GUIDES, type Guide } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Hospitality Job Guides for Sydney",
  description:
    "Practical hospitality guides for Sydney: CVs, interviews, RSA and RCG for job seekers, plus how to hire staff, agency fees and job ad templates for venues.",
  alternates: { canonical: "/guides" },
};

function GuideList({ items }: { items: Guide[] }) {
  return (
    <ul className="mt-6 border-t border-ink">
            {items.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="group flex items-center justify-between gap-6 border-b border-line py-8 hover:bg-white md:px-3">
                  <span>
                    <span className="block font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight tracking-tight">{g.title}</span>
                    <span className="mt-2 block max-w-[60ch] text-[15.5px] text-ink/70">{g.description}</span>
                    <span className="mt-3 block text-[12px] uppercase tracking-[0.12em] text-muted">{g.readMins} min read</span>
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/25 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
  );
}

export default function GuidesPage() {
  return (
    <>
      <Header />
      <main className="pt-32 md:pt-44">
        <div className="wrap">
          <p className="eyebrow mb-7">Guides</p>
          <h1 className="h-display h-hero max-w-[14ch]">Get the hospitality job you want.</h1>
          <p className="mt-7 max-w-[48ch] text-[19px] text-ink/75">Short, practical guides from a recruiter. CVs, interviews, licences and finding work in Sydney, plus how to hire staff for your venue.</p>

          <h2 className="mt-16 font-display text-[28px] tracking-tight">For job seekers</h2>
          <GuideList items={GUIDES.filter((g) => g.cta !== "hire")} />

          <h2 className="mt-20 font-display text-[28px] tracking-tight">For venues hiring</h2>
          <GuideList items={GUIDES.filter((g) => g.cta === "hire")} />
        </div>
        <div className="h-24 md:h-32" />
      </main>
      <Footer />
    </>
  );
}
