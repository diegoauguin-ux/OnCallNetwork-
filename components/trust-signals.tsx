"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ClipboardList, PhoneCall, Users, FileSearch, ShieldCheck, ArrowRight } from "lucide-react";

export default function TrustSignals() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const stages = [
    {
      icon: ClipboardList,
      stage: "Stage 1",
      title: "Written application",
      description: "Experience, RSA, availability, shift history. Any red flag here and we stop.",
    },
    {
      icon: PhoneCall,
      stage: "Stage 2",
      title: "Structured phone screen",
      description: "15 minutes. Same questions, same scoring rubric for every applicant. No gut-feel.",
    },
    {
      icon: Users,
      stage: "Stage 3",
      title: "45-min founder interview",
      description: "Diego runs a behavioural interview using a documented framework: dependability, stress response, customer rapport.",
    },
    {
      icon: FileSearch,
      stage: "Stage 4",
      title: "Two reference checks",
      description: "We call the last two venue managers. Specific questions on no-shows, conflict, and whether they'd rehire.",
    },
    {
      icon: ShieldCheck,
      stage: "Stage 5",
      title: "Venue introduction",
      description: "Only applicants who pass all four previous stages are introduced. If they don't show, the introduction fee is credited in full.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Problem framing — honest, no fake $ number */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="inline-block px-4 py-1.5 bg-[#1e3a5f]/10 text-[#1e3a5f] text-sm font-semibold rounded-full mb-4">
            Our screening process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
            We can&rsquo;t promise outcomes.{" "}
            <span className="text-[#d4a853]">We promise the process.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Most platforms run a CV check and hope. We built a 5-stage screening funnel
            so that by the time a candidate reaches your venue, the risk has already
            been filtered out &mdash; four times.
          </p>
        </motion.div>

        {/* Horizontal process funnel */}
        <div className="grid md:grid-cols-5 gap-4 mt-16">
          {stages.map((stage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative"
            >
              <div className="h-full p-5 rounded-xl bg-[#faf9f6] hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#d4a853]/20">
                <div className="w-10 h-10 rounded-lg bg-[#1e3a5f] flex items-center justify-center mb-4">
                  <stage.icon className="w-5 h-5 text-[#d4a853]" />
                </div>
                <p className="text-[11px] font-bold tracking-wider text-[#d4a853] uppercase mb-1">
                  {stage.stage}
                </p>
                <h3 className="font-bold text-[#1e3a5f] mb-2 leading-snug">
                  {stage.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee strip — the real commitment in writing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 p-6 md:p-8 bg-gradient-to-r from-[#1e3a5f] to-[#2a4a6f] rounded-2xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#d4a853] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#1e3a5f]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">The OCN Introduction Service Credit</h3>
                <p className="text-white/80 text-sm leading-relaxed max-w-2xl">
                  If an introduced candidate fails to show without 4+ hours&apos; notice,
                  the $99 introduction fee is credited and OCN will use best efforts
                  to source a replacement introduction at no extra cost, subject to
                  network availability. OCN does not employ or direct candidates —
                  this credit covers the introduction, not the shift.
                </p>
              </div>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4a853] text-[#1e3a5f] font-bold rounded-lg hover:bg-[#e8c77b] transition-all whitespace-nowrap"
            >
              See the agreement
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
