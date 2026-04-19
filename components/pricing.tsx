"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Zap, Crown, Building2, Check, Star, ArrowRight, Users } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const tiers = [
    {
      name: "PAY PER INTRO",
      description: "Perfect for occasional needs",
      rate: "$99",
      period: "/introduction",
      subtext: "Pay only when a candidate works",
      icon: Zap,
      color: "bg-[#1e3a5f]",
      features: [
        "Browse verified candidate profiles",
        "Reliability Score visible upfront",
        "1–3 matched candidates introduced",
        "Standard matching within 24–48hrs",
        "Direct hire — you pay the candidate",
      ],
      highlight: false,
      cta: "Get Started",
    },
    {
      name: "PRIORITY ACCESS",
      description: "For venues that hire regularly",
      rate: "$199",
      period: "/month",
      subtext: "Unlimited introductions · cancel anytime",
      icon: Crown,
      color: "bg-[#d4a853]",
      features: [
        "Unlimited candidate introductions",
        "Priority same-day matching",
        "Build your preferred talent pool",
        "Direct WhatsApp line to founder Diego",
        "Monthly Inner West talent report",
      ],
      highlight: true,
      cta: "Start Free Month",
    },
    {
      name: "VENUE PARTNER",
      description: "Multi-venue or high volume",
      rate: "$349",
      period: "/month",
      subtext: "Everything in Priority, plus dedicated support",
      icon: Building2,
      color: "bg-[#2a4a6f]",
      features: [
        "Everything in Priority Access",
        "Dedicated account support",
        "First-access to new top candidates",
        "Bulk permanent placement discounts",
        "Quarterly staffing strategy session",
      ],
      highlight: false,
      cta: "Contact Diego",
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
          className="text-center mb-6"
        >
          <span className="inline-block px-4 py-1.5 bg-[#1e3a5f]/10 text-[#1e3a5f] text-sm font-semibold rounded-full mb-4">
            Transparent Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
            Simple, Honest Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No hourly markups. No hidden fees. You pay the candidate directly at the rate you agree.{" "}
            <strong className="text-[#1e3a5f]">OCN makes the introduction — that&apos;s it.</strong>
          </p>
        </motion.div>

        {/* Vs competitors note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-gray-500">
            vs Sidekicker: 25–35% hourly markup, they employ the staff · vs Barcats: generic job board, no screening
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative p-6 rounded-2xl transition-all duration-300 hover:shadow-2xl ${
                tier.highlight
                  ? "bg-[#1e3a5f] text-white shadow-xl scale-105"
                  : "bg-white shadow-lg hover:scale-102"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#d4a853] text-[#1e3a5f] text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl ${tier.color} flex items-center justify-center`}>
                  <tier.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${tier.highlight ? "text-white" : "text-[#1e3a5f]"}`}>
                    {tier.name}
                  </h3>
                  <p className={`text-sm ${tier.highlight ? "text-white/70" : "text-gray-500"}`}>
                    {tier.description}
                  </p>
                </div>
              </div>

              <div className="mb-2">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${tier.highlight ? "text-white" : "text-[#1e3a5f]"}`}>
                    {tier.rate}
                  </span>
                  <span className={tier.highlight ? "text-white/70" : "text-gray-500"}>{tier.period}</span>
                </div>
                <p className={`text-sm mt-1 ${tier.highlight ? "text-white/60" : "text-gray-400"}`}>
                  {tier.subtext}
                </p>
              </div>

              <ul className="space-y-3 mb-6 mt-6">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      tier.highlight ? "text-[#d4a853]" : "text-green-500"
                    }`} />
                    <span className={`text-sm ${tier.highlight ? "text-white/80" : "text-gray-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="#contact"
                className={`block w-full py-3 rounded-lg font-semibold text-center transition-all duration-300 ${
                  tier.highlight
                    ? "bg-[#d4a853] text-[#1e3a5f] hover:bg-[#e8c77b]"
                    : "bg-[#1e3a5f] text-white hover:bg-[#2a4a6f]"
                }`}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Permanent Placement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 p-6 md:p-8 bg-gradient-to-r from-[#1e3a5f] to-[#2a4a6f] rounded-2xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#d4a853] flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-[#1e3a5f]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Permanent Placement</h3>
                <p className="text-white/70 text-sm">
                  Your next Venue Manager or Head Chef — found in 10–14 days. Below-market fee. 60-day replacement guarantee.
                </p>
              </div>
            </div>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4a853] text-[#1e3a5f] font-bold rounded-lg hover:bg-[#e8c77b] transition-all whitespace-nowrap"
            >
              Enquire Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

        {/* ROI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-6 p-6 md:p-8 bg-white rounded-2xl shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">The Math That Matters</h3>
              <p className="text-gray-600">
                A Friday no-show costs your venue an average of{" "}
                <strong className="text-red-500">$380 in lost revenue</strong>.
                A $99 OCN introduction pays for itself in under 4 minutes of service.
              </p>
            </div>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4a853] text-[#1e3a5f] font-bold rounded-lg hover:bg-[#e8c77b] transition-all whitespace-nowrap"
            >
              Get Started — $99
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
              Introduction fee only applies when the candidate completes work. Zero risk.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
