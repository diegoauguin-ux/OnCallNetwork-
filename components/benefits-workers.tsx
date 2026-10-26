import Reveal from "@/components/reveal";

const ITEMS = [
  { t: "Award-compliant pay", d: "You negotiate your hourly rate directly with the venue and get paid by them. We never take a cut, because we don't employ you." },
  { t: "You choose your shifts", d: "No mandatory acceptance and no penalties for declining. Take what fits your diary." },
  { t: "Venues worth your time", d: "We only work with venues that treat staff properly. If a venue mistreats someone in our network, they're out." },
  { t: "Paid by the venue", d: "You're paid directly by the venue under their own payment terms. No third-party payroll holding your money." },
  { t: "Shifts near you", d: "Inner West, Eastern Suburbs, CBD and North Shore. You won't be sent to a suburb that takes 90 minutes to reach." },
  { t: "A real person behind you", d: "Diego knows every candidate personally. An issue at a venue? You call one number." },
];

const PERM: [string, string][] = [
  ["Monday to Friday", "Base rate"],
  ["Saturday", "+25%"],
  ["Sunday", "+50%"],
  ["Public holiday", "+125%"],
];
const CASUAL: [string, string][] = [
  ["Monday to Friday", "125%"],
  ["Saturday", "150%"],
  ["Sunday", "175%"],
  ["Public holiday", "250%"],
];

function Table({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div>
      <h4 className="border-b border-ink pb-3 text-[13px] font-medium uppercase tracking-[0.12em]">{title}</h4>
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-baseline justify-between border-b border-line py-3">
          <span className="text-[15px] text-ink/75">{k}</span>
          <span className="num font-display text-[24px] tracking-tight">{v}</span>
        </div>
      ))}
    </div>
  );
}

export default function BenefitsWorkers() {
  return (
    <section id="workers" className="border-t border-line py-24 md:py-32">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-6">For hospitality professionals</p>
            <h2 className="h-display h-section">A small network, with a real person in the middle.</h2>
          </div>
          <p className="max-w-[46ch] text-[17px] text-ink/70 lg:col-span-5 lg:col-start-8 lg:pt-10">
            We&apos;re not trying to be the biggest platform in Sydney. We&apos;re trying to be the one where reliable professionals
            work with venues that respect them, and get paid what they agreed, on time.
          </p>
        </div>

        <div className="mt-16 grid gap-x-16 border-t border-ink md:grid-cols-2">
          {ITEMS.map((it, i) => (
            <Reveal key={it.t} delay={(i % 2) * 60} className="grid grid-cols-[44px_1fr] gap-4 border-b border-line py-8">
              <span className="num pt-1.5 text-[13px] text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-[28px] leading-tight tracking-tight">{it.t}</h3>
                <p className="mt-2 max-w-[46ch] text-[15.5px] leading-relaxed text-ink/70">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">How you get paid</p>
            <h3 className="font-display text-[34px] leading-tight tracking-tight">Your rate. Agreed with the venue.</h3>
            <p className="mt-4 max-w-[36ch] text-[15.5px] text-ink/70">
              You agree it before the shift. OCN never sets it and never takes a cut.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8">
            <Table title="Permanent and part-time loadings" rows={PERM} />
            <Table title="Casual (includes 25% casual loading)" rows={CASUAL} />
            <p className="text-[12.5px] leading-relaxed text-muted sm:col-span-2">
              Rates reflect the Hospitality Industry (General) Award 2020. Actual entitlements depend on classification, hours and
              employment type. Check your payslip and the current Award.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
