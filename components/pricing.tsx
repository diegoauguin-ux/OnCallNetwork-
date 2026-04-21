"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, Briefcase, Users, Sparkles } from "lucide-react";
import Link from "next/link";
import { PRICING } from "@/lib/pricing";

export default function Pricing() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const tiers = [
    {
      name: PRICING.permanentStandard.label,
      description: "Permanent placement for senior hospitality roles",
      rate: `${PRICING.permanentStandard.feePercent}%`,
      period: "of annual salary",
      subtext: `Payable ${PRICING.permanentStandard.payableWhen}. ${PRICING.permanentStandard.paymentTerms}.`,
      icon: Briefcase,
      color: "bg-[#1e3a5f]",
      features: [
        "Venue Manager, Bar Manager, Head Chef, Sous Chef, FOH Manager",
        "Psychology-based behavioural screening",
        "Shortlist of 3 candidates in 5–7 days",
        "60-day replacement guarantee — free",
        "Founder interviews every candidate personally",
        "No upfront cost. No retainer.",
      ],
      highlight: true,
      cta: "Submit a Role Brief →",
      href: "/#contact?service=permanent",
      badge: {
        label: `First 3 venues this month: ${PRICING.permanentFounding.feePercent}%`,
      },
    },
    {
      name: PRICING.casualIntro.label,
      description: "For shift coverage and short-term needs",
      rate: `$${PRICING.casualIntro.fee}`,
      period: "per introduction",
      subtext: `Payable ${PRICING.casualIntro.payableWhen}. ${PRICING.casualIntro.noShowGuarantee}.`,
      icon: Users,
      color: "bg-[#2a4a6f]",
      features: [
        "Pre-screened candidates with OCN Behavioural Profile",
        "Same-day matching available where capacity allows",
        "You pay the candidate directly at the agreed award rate",
        "Full refund if the candidate no-shows without 4+ hours' notice",
      ],
      highlight: false,
      cta: "Book a Casual Intro →",
      href: "/#contact?service=casual",
      badge: null as { label: string } | null,
    },
  ];

  return (
    <section id="pricing" className="py-12 md:py-24 bg-[#faf9f6] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-[#1e3a5f]/10 text-[#1e3a5f] text-sm font-semibold rounded-full mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
            Transparent placement and introduction fees
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built for venues that want better hires without agency complexity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 items-start max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative p-6 rounded-2xl transition-all duration-300 hover:shadow-2xl ${
                tier.highlight
                  ? "bg-[#1e3a5f] text-white shadow-xl"
                  : "bg-white shadow-lg"
              } ${index === 1 ? "md:scale-95 md:mt-4" : ""}`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-6 inline-flex items-center gap-1 px-3 py-1 bg-[#d4a853] text-[#1e3a5f] text-xs font-bold rounded-full shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  {tier.badge.label}
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
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-bold ${tier.highlight ? "text-white" : "text-[#1e3a5f]"}`}>
                    {tier.rate}
                  </span>
                  <span className={tier.highlight ? "text-white/70" : "text-gray-500"}>{tier.period}</span>
                </div>
                <p className={`text-sm mt-1 ${tier.highlight ? "text-white/70" : "text-gray-500"}`}>
                  {tier.subtext}
                </p>
              </div>

              <ul className="space-y-3 mb-6 mt-6">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.highlight ? "text-[#d4a853]" : "text-green-500"}`} />
                    <span className={`text-sm ${tier.highlight ? "text-white/85" : "text-gray-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-center mt-8 space-y-1"
        >
          <p className="text-sm text-gray-500">
            Boutique service. Founder-led screening. Sydney hospitality only.
          </p>
          <p className="text-xs text-gray-400">{PRICING.gstDisclosure}</p>
        </motion.div>
      </div>
    </section>
  );
}
