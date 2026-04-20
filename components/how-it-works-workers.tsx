"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FileText, Users, CheckCircle, Smartphone, DollarSign } from "lucide-react";

export default function HowItWorksWorkers() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Apply online",
      description: "A 5-minute written application covering experience, availability and RSA.",
    },
    {
      number: "02",
      icon: Users,
      title: "Structured interview",
      description: "A 45-minute interview with Diego using the same framework for every applicant.",
    },
    {
      number: "03",
      icon: CheckCircle,
      title: "Reference checks",
      description: "We call your last two venue managers. Specific questions, not generic tick-boxes.",
    },
    {
      number: "04",
      icon: Smartphone,
      title: "Receive shift offers",
      description: "Offers arrive by SMS with the venue, rate and hours. You accept what suits you.",
    },
    {
      number: "05",
      icon: DollarSign,
      title: "Work & get paid by the venue",
      description: "Your agreed rate is paid directly by the venue. OCN never takes a cut from your pay.",
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
          <span className="inline-block px-4 py-1.5 bg-[#1e3a5f]/10 text-[#1e3a5f] text-sm font-semibold rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
            How to join the network
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Five clear steps. Typical timeline: 7&ndash;14 days from application to first shift offer.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#d4a853]/30 -translate-x-1/2" />

          <div className="space-y-8 md:space-y-0">
            {steps?.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative md:flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`md:w-[calc(50%-40px)] ${
                  index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                }`}>
                  <div className="p-6 bg-[#faf9f6] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group">
                    <div className={`flex items-center gap-3 mb-3 ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}>
                      <div className="w-12 h-12 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center group-hover:bg-[#1e3a5f] transition-colors">
                        <step.icon className="w-6 h-6 text-[#1e3a5f] group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-lg font-bold text-[#1e3a5f]">{step?.title}</h3>
                    </div>
                    <p className="text-gray-600">{step?.description}</p>
                  </div>
                </div>

                {/* Center Circle */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-[#d4a853] rounded-full items-center justify-center z-10">
                  <span className="text-[#1e3a5f] font-bold text-sm">{step?.number}</span>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-40px)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
