import Image from "next/image";
import { Mail } from "lucide-react";
import Reveal from "@/components/reveal";

export default function MeetTheFounder() {
  return (
    <section id="founder" className="py-24 md:py-32">
      <Reveal className="wrap grid items-center gap-10 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-4">
          <div className="relative aspect-[4/5] max-w-[340px] overflow-hidden rounded-md">
            <Image src="/diego.jpg" alt="Diego Pascal, founder of On Call Network" fill sizes="(min-width:768px) 340px, 80vw" className="object-cover" />
          </div>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <p className="eyebrow mb-5">Founder-led</p>
          <p className="font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.08] tracking-tight">
            &ldquo;One person does every interview and every reference call. That&apos;s why I can vouch for who I send.&rdquo;
          </p>
          <p className="mt-6 text-[15px] text-muted">
            Diego Pascal, M.Psy. Four years recruiting across hospitality, corporate and technology.
          </p>
          <a href="mailto:hello@oncallnetwork.com.au" className="btn btn-outline mt-8">
            <Mail className="h-4 w-4" />
            hello@oncallnetwork.com.au
          </a>
          <p className="mt-4 text-[14px] text-muted">
            Looking for work? Please use the{" "}
            <a href="/#apply" className="underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">application form</a>{" "}
            so your CV reaches the right place. Email is for questions.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
