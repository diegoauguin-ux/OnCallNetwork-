import Link from "next/link";
import Reveal from "@/components/reveal";

const ROLES = ["Bartender", "Waiter / Waitress", "Kitchen Hand", "Chef", "Barista", "Floor Manager"];
const REQS = [
  "RSA certificate (mandatory)",
  "Prior hospitality experience in Australia",
  "Legal right to work in Australia",
  "Availability in the Inner West, East, CBD or North Shore",
];

export default function WorkerCTA() {
  return (
    <section className="bg-ink py-24 text-paper md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow mb-6 !text-paper/55">Accepting applications &nbsp;/&nbsp; Inner West Sydney</p>
          <h2 className="h-display h-section !text-paper">Work with venues that respect you.</h2>
          <p className="mt-6 max-w-[50ch] text-[18px] text-paper/70">
            Show up on time, do the job properly and treat the team well, and OCN will keep introducing you to venues that do the
            same. Your rate, your hours, paid by the venue directly. No agency taking a cut.
          </p>
          <Link href="#apply" className="btn btn-accent mt-10 h-[52px] px-7">Start your application</Link>
          <p className="mt-4 text-[13px] text-paper/50">Application is free. No payment, ever, to join or stay in the network.</p>
        </Reveal>

        <Reveal delay={100} className="space-y-10 lg:col-span-4 lg:col-start-9">
          <div>
            <p className="eyebrow mb-4 !text-paper/55">Roles we match</p>
            <ul className="flex flex-wrap gap-2">
              {ROLES.map((r) => (
                <li key={r} className="rounded-full border border-paper/25 px-4 py-1.5 text-[14px]">{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4 !text-paper/55">Minimum requirements</p>
            <ul className="border-t border-paper/20">
              {REQS.map((r) => (
                <li key={r} className="border-b border-paper/20 py-3 text-[15px] text-paper/85">{r}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
