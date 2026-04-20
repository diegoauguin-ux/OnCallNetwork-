"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  DollarSign, Calendar, Building2, Handshake, Clock, Heart, Scale,
} from "lucide-react";

export default function BenefitsWorkers() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const benefits = [
    {
      icon: DollarSign,
      title: "Award-compliant pay, always",
      description: "You negotiate your hourly rate directly with the venue and get paid by them. We never take a cut from your pay &mdash; because we don&rsquo;t employ you.",
    },
    {
      icon: Calendar,
      title: "You choose your shifts",
      description: "No mandatory acceptance, no penalties for declining. Accept only what fits your diary, and ignore the rest without consequence.",
    },
    {
      icon: Building2,
      title: "Venues worth your time",
      description: "We only work with hospitality venues that treat staff properly. If a venue mistreats someone in our network, they&rsquo;re out. Reputation cuts both ways.",
    },
    {
      icon: Handshake,
      title: "Paid by the venue, not by us",
      description: "You invoice or get paid directly by the venue under their own payment terms &mdash; no waiting on a third-party payroll that holds your money.",
    },
    {
      icon: Clock,
      title: "Shifts that match your area",
      description: "We focus on Inner West, Eastern Suburbs, CBD and North Shore. You won&rsquo;t be sent to a suburb that takes 90 minutes to get to.",
    },
    {
      icon: Heart,
      title: "A real person backing you",
      description: "Diego knows every candidate in the network personally. Issue at a venue? You call one number. That&rsquo;s the whole support system.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#faf9f6]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Pay-structure card — honest Award-based breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#1e3a5f] via-[#2a4a6f] to-[#0f1e32] p-8 flex items-center justify-center">
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(#d4a853 1px, transparent 1px), linear-gradient(90deg, #d4a853 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div
                aria-hidden
                className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#d4a853]/15 blur-3xl"
              />

              {/* Pay card */}
              <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    How you get paid on OCN
                  </span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded-full flex items-center gap-1">
                    <Scale className="w-2.5 h-2.5" /> AWARD &amp; ABOVE
                  </span>
                </div>

                <div className="mb-5 pb-5 border-b border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Your hourly rate</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#1e3a5f]">You agree it</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Directly with the venue, before the shift. We don&rsquo;t set it.
                  </p>
                </div>

                <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-2">
                  Pay structure
                </p>
                <div className="space-y-2 mb-4">
                  {[
                    { label: "Base rate (weekday)", amount: "100%" },
                    { label: "Saturday loading", amount: "+25%" },
                    { label: "Sunday loading", amount: "+50%" },
                    { label: "Public holiday", amount: "+150%" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{s.label}</span>
                      <span className="font-semibold text-[#1e3a5f]">{s.amount}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <p className="text-[11px] text-gray-400 text-center leading-snug">
                    Per the Hospitality Industry (General) Award.<br />OCN never takes a cut from your pay.
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -top-4 -left-4 bg-[#d4a853] text-[#1e3a5f] px-4 py-2 rounded-full font-bold shadow-lg"
            >
              No agency cut
            </motion.div>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block px-4 py-1.5 bg-[#d4a853]/20 text-[#d4a853] text-sm font-semibold rounded-full mb-4">
              For hospitality professionals
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6">
              A small network,{" "}
              <span className="text-[#d4a853]">with a real person</span>{" "}
              in the middle
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We&rsquo;re not trying to be the biggest platform in Sydney.
              We&rsquo;re trying to be the one where reliable professionals
              work with venues that respect them &mdash; and get paid what
              they agreed, on time, every time.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits?.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#d4a853]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#d4a853] transition-colors">
                      <benefit.icon className="w-5 h-5 text-[#d4a853] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1e3a5f] mb-1">{benefit?.title}</h3>
                      <p
                        className="text-sm text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: benefit?.description ?? "" }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
