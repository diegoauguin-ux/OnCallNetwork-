import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site-config";

const LINKS = [
  { n: "Hire staff", h: "/#hire" },
  { n: "Find work", h: "/#apply" },
  { n: "CV rewrite", h: "/cv" },
  { n: "Job guides", h: "/guides" },
  { n: "Contact", h: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="wrap py-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <Image src="/ocn-icon.png" alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
              <span className="font-display text-[28px] leading-none tracking-tight">On Call Network</span>
            </div>
            <p className="mt-6 max-w-[44ch] font-display text-[30px] leading-[1.1] tracking-tight text-paper/90">
              Sydney hospitality hiring, done by one person who answers the phone.
            </p>
            <a href="mailto:hello@oncallnetwork.com.au" className="mt-8 inline-block text-[17px] underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-light">
              hello@oncallnetwork.com.au
            </a>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-5 !text-paper/50">Explore</p>
            <ul className="space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.n}>
                  <Link href={l.h} className="text-[15.5px] text-paper/80 transition-colors hover:text-accent-light">{l.n}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-5 !text-paper/50">Areas</p>
            <p className="text-[15.5px] leading-relaxed text-paper/80">
              Inner West
              <br />
              Eastern Suburbs
              <br />
              CBD
              <br />
              North Shore
            </p>
          </div>
        </div>

        <p className="mt-16 max-w-[90ch] border-t border-paper/20 pt-8 text-[12.5px] leading-relaxed text-paper/50">
          OCN is a marketplace. Employment is directly between venue and candidate. On Call Network is a marketplace platform
          connecting hospitality venues with pre-screened candidates. All employment relationships are formed directly between the
          venue and the candidate. OCN does not employ, supervise, or pay candidates.
        </p>

        <div className="mt-6 flex flex-col justify-between gap-3 text-[13px] text-paper/50 md:flex-row">
          <p>&copy; 2026 On Call Network. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/terms-and-conditions" className="hover:text-paper">Terms &amp; Conditions</Link>
            <Link href="/privacy" className="hover:text-paper">Privacy Policy</Link>
            <a href={SITE.builder.url} target="_blank" rel="noopener" className="text-paper/60 underline-offset-4 hover:text-paper hover:underline">
              Website by {SITE.builder.name}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
