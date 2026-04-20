"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, DollarSign, Mail, Users, CheckCircle, Award, Star, Clock } from "lucide-react";

export default function BenefitsVenues() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const benefits = [
    {
      icon: Shield,
      title: "97% Show-up Rate",
      description: "Only candidates scoring 75+ on the Reliability Score join OCN. The average is 84/100. You always see the top 8%.",
    },
    {
      icon: Award,
      title: "Master's in Psychology Screening",
      description: "Our founder has a Master's in Psychology. Every candidate is assessed on dependability, stress response, and professionalism.",
    },
    {
      icon: DollarSign,
      title: "No Hourly Markup",
      description: "OCN is a marketplace. You pay the candidate directly at the rate you agree. No 25-35% markup like labour hire agencies.",
    },
    {
      icon: Mail,
      title: "Founder Direct Line",
      description: "Priority Access members reach Diego directly on email. Real accountability, not a call centre.",
    },
    {
      icon: Users,
      title: "Pre-Screened Professionals",
      description: "RSA certified, experienced hospitality workers. Bartenders, waitstaff, baristas, kitchen hands, chefs.",
    },
    {
      icon: CheckCircle,
      title: "Inner West Specialist",
      description: "We focus on Sydney Inner West, Eastern Suburbs, CBD and North Shore. Local knowledge, local network.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#faf9f6]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#1e3a5f]/10 text-[#1e3a5f] text-sm font-semibold rounded-full mb-4">
              For Venues
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6">
              Why Venues Choose OCN Over Sidekicker and Barcats
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Stop losing revenue to no-shows. Every candidate on OCN has been psychology-assessed and verified.
              You hire directly — no markups, no middleman payroll.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#d4a853] transition-colors">
                      <benefit.icon className="w-5 h-5 text-[#1e3a5f] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1e3a5f] mb-1">{benefit.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sample Profile Preview — illustrative UI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#1e3a5f] via-[#2a4a6f] to-[#0f1e32] p-8 flex items-center justify-center">
              {/* Decorative grid pattern */}
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

              {/* Sample candidate card */}
              <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    Sample Candidate Profile
                  </span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded-full">
                    AVAILABLE
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4a853] to-[#e8c77b] flex items-center justify-center text-[#1e3a5f] font-bold text-xl shadow-md">
                    JM
                  </div>
                  <div>
                    <p className="font-bold text-[#1e3a5f]">Bartender · 4 yrs exp</p>
                    <p className="text-xs text-gray-500">Newtown · RSA verified</p>
                  </div>
                </div>

                <div className="bg-[#faf9f6] rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 font-medium">Reliability Score</span>
                    <span className="text-2xl font-bold text-[#1e3a5f]">91<span className="text-sm text-gray-400">/100</span></span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-[91%] bg-gradient-to-r from-[#d4a853] to-[#e8c77b] rounded-full" />
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#d4a853] text-[#d4a853]" />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">27 shifts · 100% show-up</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Clock className="w-3.5 h-3.5 text-[#d4a853]" />
                  <span>Matched in under 24 hours</span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -top-4 -right-4 bg-[#d4a853] text-[#1e3a5f] px-4 py-2 rounded-full font-bold shadow-lg text-sm"
            >
              Top 8% Only
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
