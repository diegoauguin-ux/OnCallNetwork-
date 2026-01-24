"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Phone, MessageCircle, Clock, Star, ArrowRight } from "lucide-react";

export default function HowItWorksVenues() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const steps = [
    {
      number: "01",
      icon: Phone,
      title: "Call or Text",
      description: "Reach Diego directly. Tell us what you need—role, shift time, any special requirements.",
      time: "30 seconds",
    },
    {
      number: "02",
      icon: MessageCircle,
      title: "Confirmation",
      description: "We confirm availability within 15 minutes. You'll know exactly who's coming.",
      time: "15 minutes",
    },
    {
      number: "03",
      icon: Clock,
      title: "Worker Arrives",
      description: "Professional arrives 15 min early, uniformed, briefed, and ready to deliver.",
      time: "<2 hours",
    },
    {
      number: "04",
      icon: Star,
      title: "Rate & Repeat",
      description: "Give feedback. We maintain standards. Request favorites for future shifts.",
      time: "After shift",
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
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
            How It Works for Venues
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From emergency to solution in under 2 hours. No app downloads, no complicated systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps?.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < (steps?.length ?? 0) - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-[#d4a853]/30 z-0" />
              )}
              
              <div className="relative p-6 bg-[#faf9f6] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group h-full">
                {/* Number Badge */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#d4a853] rounded-full flex items-center justify-center">
                  <span className="text-[#1e3a5f] text-sm font-bold">{step?.number}</span>
                </div>

                <div className="w-14 h-14 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center mb-4 group-hover:bg-[#1e3a5f] transition-colors">
                  <step.icon className="w-7 h-7 text-[#1e3a5f] group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-lg font-bold text-[#1e3a5f] mb-2">{step?.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{step?.description}</p>
                
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#d4a853]/20 rounded-full">
                  <Clock className="w-3 h-3 text-[#d4a853]" />
                  <span className="text-xs font-medium text-[#d4a853]">{step?.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
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
            Book Your First Shift
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
