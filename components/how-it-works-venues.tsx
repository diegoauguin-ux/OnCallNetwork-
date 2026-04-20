"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Search, UserCheck, Handshake, Star, ArrowRight } from "lucide-react";

export default function HowItWorksVenues() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Tell us what you need",
      description: "A short brief: role, suburb, shift pattern, non-negotiables. Book a 15-min call with Diego or send it in writing \u2014 whichever suits.",
      time: "15 min",
    },
    {
      number: "02",
      icon: UserCheck,
      title: "We match from the network",
      description: "Diego shortlists candidates who already passed the 5-stage screening and actually fit your brief. If no one fits, we tell you upfront.",
      time: "24\u201348 hrs",
    },
    {
      number: "03",
      icon: Handshake,
      title: "You interview & hire directly",
      description: "You speak with the candidate, agree the rate, and hire them directly. We charge the introduction fee only once the candidate actually works.",
      time: "Direct hire",
    },
    {
      number: "04",
      icon: Star,
      title: "Keep working with who you like",
      description: "Build a preferred pool of candidates you\u2019ve worked with before. Next time you need someone, we start from that list.",
      time: "Ongoing",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-[#d4a853]/20 text-[#d4a853] text-sm font-semibold rounded-full mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
            From brief to first shift in 4 steps
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Diego handles the shortlist. You interview and hire directly. No agency overhead, no hourly markup &mdash; just a short introduction fee when the candidate actually works.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-[#d4a853]/30 z-0" />
              )}

              <div className="relative p-6 bg-[#faf9f6] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group h-full">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#d4a853] rounded-full flex items-center justify-center">
                  <span className="text-[#1e3a5f] text-sm font-bold">{step.number}</span>
                </div>

                <div className="w-14 h-14 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center mb-4 group-hover:bg-[#1e3a5f] transition-colors">
                  <step.icon className="w-7 h-7 text-[#1e3a5f] group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-lg font-bold text-[#1e3a5f] mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{step.description}</p>

                <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#d4a853]/20 rounded-full">
                  <span className="text-xs font-medium text-[#d4a853]">{step.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1e3a5f] text-white font-semibold rounded-lg hover:bg-[#2a4a6f] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Your First Introduction
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
