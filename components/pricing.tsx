"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Zap, Clock, Calendar, Check, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const tiers = [
    {
      name: "EXPRESS",
      description: "Emergency <6 hours notice",
      rate: "$55",
      period: "/hour",
      bookingFee: "$120",
      icon: Zap,
      color: "bg-red-500",
      features: [
        "<2 hour response guarantee",
        "Priority matching",
        "Workers arrive 15min early",
        "Full briefing included",
      ],
      highlight: true,
    },
    {
      name: "PREMIUM",
      description: "6-24 hours notice",
      rate: "$48",
      period: "/hour",
      bookingFee: "$90",
      icon: Clock,
      color: "bg-[#d4a853]",
      features: [
        "Same-day confirmation",
        "Vetted professionals",
        "Full briefing included",
        "Feedback & rating system",
      ],
    },
    {
      name: "PLANNED",
      description: "24+ hours notice",
      rate: "$42",
      period: "/hour",
      bookingFee: "$70",
      icon: Calendar,
      color: "bg-[#1e3a5f]",
      features: [
        "Best value rate",
        "Choose your preferred worker",
        "Full briefing included",
        "Request regulars",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-[#faf9f6] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-[#1e3a5f]/10 text-[#1e3a5f] text-sm font-semibold rounded-full mb-4">
            Transparent Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
            Simple, Honest Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No hidden fees. Premium service at competitive rates. 
            Compare: Traditional agencies charge $60-80/hr.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers?.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative p-6 rounded-2xl transition-all duration-300 hover:shadow-2xl ${
                tier?.highlight
                  ? "bg-[#1e3a5f] text-white shadow-xl scale-105"
                  : "bg-white shadow-lg hover:scale-102"
              }`}
            >
              {tier?.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#d4a853] text-[#1e3a5f] text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl ${tier?.color} flex items-center justify-center`}>
                  <tier.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${tier?.highlight ? "text-white" : "text-[#1e3a5f]"}`}>
                    {tier?.name}
                  </h3>
                  <p className={`text-sm ${tier?.highlight ? "text-white/70" : "text-gray-500"}`}>
                    {tier?.description}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${tier?.highlight ? "text-white" : "text-[#1e3a5f]"}`}>
                    {tier?.rate}
                  </span>
                  <span className={tier?.highlight ? "text-white/70" : "text-gray-500"}>{tier?.period}</span>
                </div>
                <p className={`text-sm mt-1 ${tier?.highlight ? "text-white/60" : "text-gray-400"}`}>
                  + {tier?.bookingFee} booking fee
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {tier?.features?.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className={`w-5 h-5 flex-shrink-0 ${
                      tier?.highlight ? "text-[#d4a853]" : "text-green-500"
                    }`} />
                    <span className={`text-sm ${tier?.highlight ? "text-white/80" : "text-gray-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="#contact"
                className={`block w-full py-3 rounded-lg font-semibold text-center transition-all duration-300 ${
                  tier?.highlight
                    ? "bg-[#d4a853] text-[#1e3a5f] hover:bg-[#e8c77b]"
                    : "bg-[#1e3a5f] text-white hover:bg-[#2a4a6f]"
                }`}
              >
                Book Now
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 p-6 md:p-8 bg-white rounded-2xl shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">The Math That Matters</h3>
              <p className="text-gray-600">
                6-hour Friday emergency = <strong className="text-[#d4a853]">$450</strong> with OCN 
                vs <strong className="text-red-500">$4,500</strong> lost revenue
              </p>
              <p className="text-2xl font-bold text-[#1e3a5f] mt-2">That's a 10x ROI</p>
            </div>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4a853] text-[#1e3a5f] font-bold rounded-lg hover:bg-[#e8c77b] transition-all whitespace-nowrap"
            >
              Get 50% Off First Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 rounded-full">
            <Star className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">
              Show-Up Guarantee: If we don't deliver, you don't pay. Period.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
