const STEPS = ["Written application", "Phone screen", "Founder interview", "Two reference checks", "Introduced to you"];

export default function Vetting() {
  return (
    <section className="mt-28 bg-forest py-16 text-paper md:mt-40 md:py-20">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="h-display h-section max-w-[18ch] !text-paper">Five checks before anyone meets your venue.</h2>
          <p className="max-w-[30ch] text-[15.5px] text-paper/70">Same process for every applicant. Capacity is limited on purpose.</p>
        </div>
        <ol className="mt-12 grid border-t border-paper/25 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <li key={s} className="border-b border-paper/20 py-6 lg:border-b-0 lg:border-r lg:px-5 lg:first:pl-0 lg:last:border-r-0">
              <span className="num font-display text-[28px] leading-none text-accent-light">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-3 text-[16px] leading-snug">{s}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
