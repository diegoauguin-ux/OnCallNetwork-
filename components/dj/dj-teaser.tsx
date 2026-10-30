import Link from "next/link";
import Reveal from "@/components/reveal";
import { DJ, DJ_BASE_PATH, formatFrom } from "@/lib/dj";

export default function DjTeaser() {
  return (
    <section id="dj" className="py-20 md:py-24">
      <Reveal className="wrap grid items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-5">Event entertainment</p>
          <h2 className="h-display h-section">Need a DJ for a corporate event?</h2>
          <p className="mt-5 max-w-[56ch] text-[17px] text-ink/70">
            DJ, sound and lighting for Sydney CBD events: Christmas parties, launches and networking nights. Packages from{" "}
            {formatFrom(DJ.packages[0].from)}.
          </p>
        </div>
        <div className="lg:col-span-3 lg:col-start-10">
          <Link href={DJ_BASE_PATH} className="btn btn-solid h-[52px] px-7">Corporate DJ hire</Link>
        </div>
      </Reveal>
    </section>
  );
}
