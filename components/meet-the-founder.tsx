import Image from "next/image";
import { Mail } from "lucide-react";
import Reveal from "@/components/reveal";

export default function MeetTheFounder() {
  return (
    <section id="founder" className="bg-white py-24 md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md">
            <Image
              src="/diego.jpg"
              alt="Diego Pascal, founder of On Call Network"
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <p className="mt-4 text-[13px] uppercase tracking-[0.14em] text-muted">Diego Pascal &nbsp;/&nbsp; Founder, M.Psy</p>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow mb-6">Founder-led. Not a call centre.</p>
          <h2 className="h-display h-section">
            Meet <em className="italic text-forest">Diego.</em>
          </h2>
          <p className="mt-8 font-display text-[28px] leading-snug tracking-tight text-ink/90">
            Sydney&apos;s venues deserve a recruiter who picks up the phone and vouches for every candidate introduced.
          </p>
          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink/75">
            <p>
              Diego holds a Master&apos;s degree in Psychology from Universidad Andr&eacute;s Bello and has spent four years recruiting
              across hospitality, corporate and technology in Australia and Latin America.
            </p>
            <p>
              Every application, interview and reference call is done by him personally. That&apos;s why the network is small and
              capacity is limited: you work with one person who knows every candidate&apos;s name, history and quirks.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-ink pt-6">
            {[
              ["4 years", "Recruiting"],
              ["3 sectors", "Hospitality, corporate, tech"],
              ["2 regions", "Australia, Latin America"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="num font-display text-[30px] leading-none tracking-tight text-forest">{k}</dt>
                <dd className="mt-2 text-[13px] leading-snug text-muted">{v}</dd>
              </div>
            ))}
          </dl>

          <a href="mailto:hello@oncallnetwork.com.au" className="btn btn-solid mt-10">
            <Mail className="h-4 w-4" />
            hello@oncallnetwork.com.au
          </a>
        </Reveal>
      </div>
    </section>
  );
}
