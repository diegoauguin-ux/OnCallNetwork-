"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Phone, Mail, User } from "lucide-react";

export default function MeetTheFounder() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="founder" className="py-12 md:py-24 bg-white scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-10 md:gap-14 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="relative aspect-[4/5] max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#1e3a5f] via-[#2a4a6f] to-[#0f1e32]">
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.10]"
                style={{
                  backgroundImage:
                    "linear-gradient(#d4a853 1px, transparent 1px), linear-gradient(90deg, #d4a853 1px, transparent 1px)",
                  backgroundSize: "36px 36px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <User className="w-14 h-14 text-white/60" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#0f1e32] via-[#0f1e32]/80 to-transparent">
                <p className="text-[#d4a853] text-xs font-bold tracking-wider uppercase mb-1">
                  Founder
                </p>
                <p className="text-white font-bold text-lg">Diego Sauvalle</p>
                <p className="text-white/70 text-sm">
                  M.Psy &middot; Hospitality Recruiter
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <span className="inline-block px-4 py-1.5 bg-[#1e3a5f]/10 text-[#1e3a5f] text-sm font-semibold rounded-full mb-4">
              Founder-led. Not a call centre.
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6">
              Meet Diego.
            </h2>

            <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
              <p>
                Diego Sauvalle holds a Master&rsquo;s degree in Psychology from
                Universidad Andr&eacute;s Bello and has spent the last four
                years recruiting across hospitality, corporate, and technology
                sectors in Australia and Latin America. He built On Call
                Network because Sydney&rsquo;s hospitality venues deserve a
                recruiter who picks up the phone &mdash; and actually vouches
                for every candidate introduced.
              </p>
              <p>
                Every application, every interview, every reference call
                &mdash; Diego does it personally. That&rsquo;s why the network
                is deliberately small, and the capacity is limited. When you
                work with OCN, you work with one person who knows every
                candidate&rsquo;s name, history, and quirks.
              </p>
            </div>

            <div className="mt-6 p-5 bg-[#faf9f6] border-l-4 border-[#d4a853] rounded-r-xl">
              <p className="text-[#1e3a5f] font-semibold">
                Reach me directly &mdash; that&rsquo;s the whole support system.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="tel:0424195996"
                className="inline-flex items-center gap-2 h-11 px-5 bg-[#1e3a5f] text-white font-semibold rounded-lg hover:bg-[#2a4a6f] transition-all"
              >
                <Phone className="w-4 h-4" />
                0424 195 996
              </a>
              <a
                href="mailto:hello@oncallnetwork.com.au"
                className="inline-flex items-center gap-2 h-11 px-5 bg-white text-[#1e3a5f] border border-[#1e3a5f]/20 font-semibold rounded-lg hover:border-[#d4a853] hover:text-[#d4a853] transition-all"
              >
                <Mail className="w-4 h-4" />
                hello@oncallnetwork.com.au
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
