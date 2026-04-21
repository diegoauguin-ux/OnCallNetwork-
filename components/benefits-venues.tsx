"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ShieldCheck, DollarSign, Mail, Users, MapPin, ClipboardList,
  CheckCircle2,
} from "lucide-react";

export default function BenefitsVenues() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const benefits = [
    {
      icon: ClipboardList,
      title: "Structured, not guess-work",
      description: "Every candidate follows the same documented 5-stage interview. Same questions, same rubric, same standard. We can show you the framework.",
    },
    {
      icon: ShieldCheck,
      title: "Written no-show guarantee",
      description: "If the candidate we introduce doesn't arrive, the fee is refunded and Diego personally sources a replacement. It's a clause in your agreement.",
    },
    {
      icon: DollarSign,
      title: "No hourly markup",
      description: "OCN is a marketplace, not a labour-hire agency. You agree the rate, you pay the worker directly. We charge an introduction fee, nothing else.",
    },
    {
      icon: Mail,
      title: "One person, one phone number",
      description: "No call centres, no ticket queues. Diego handles every introduction, every enquiry, every replacement. That&rsquo;s why capacity is limited.",
    },
    {
      icon: Users,
      title: "Hospitality-only network",
      description: "We don&rsquo;t do construction, aged care or cleaning. Bartenders, waitstaff, baristas, kitchen hands, chefs. Focus is the whole advantage.",
    },
    {
      icon: MapPin,
      title: "Sydney local, on purpose",
      description: "Inner West, Eastern Suburbs, CBD and North Shore only. Local candidates who know your suburb, your clientele and how to get to your venue.",
    },
  ];

  return (
    <section className="py-12 md:py-24 bg-[#faf9f6]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#1e3a5f]/10 text-[#1e3a5f] text-sm font-semibold rounded-full mb-4">
              For venues
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6">
              Hire staff you can actually{" "}
              <span className="text-[#d4a853]">count on</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              OCN replaces &ldquo;post and pray&rdquo; job boards and high-markup labour hire
              with a documented screening process and a founder who stands behind
              every introduction in writing.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#d4a853] transition-colors">
                      <benefit.icon className="w-5 h-5 text-[#1e3a5f] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1e3a5f] mb-1">{benefit.title}</h3>
                      <p
                        className="text-sm text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: benefit.description }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Illustrative candidate profile card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
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
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#d4a853]/15 blur-3xl"
              />

              {/* Example profile card */}
              <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    Candidate snapshot
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-semibold rounded-full">
                    Example Profile
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="w-11 h-11 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                    SM
                  </div>
                  <div>
                    <p className="font-bold text-[#1e3a5f] leading-tight">Sarah M.</p>
                    <p className="text-xs text-gray-500">Bar Manager &middot; Inner West</p>
                  </div>
                </div>

                <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-2">
                  Screening completed
                </p>
                <div className="space-y-2 mb-4">
                  {[
                    "Behavioral interview with founder",
                    "Two reference checks completed",
                    "Role-fit and leadership reviewed",
                    "Availability and location verified",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d4a853] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Example profile format &mdash; anonymised for privacy.</span>
                  <span className="text-xs font-bold text-[#d4a853]">Every candidate has one</span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -top-4 -right-4 bg-[#d4a853] text-[#1e3a5f] px-4 py-2 rounded-full font-bold shadow-lg text-sm"
            >
              Ask to see it
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
