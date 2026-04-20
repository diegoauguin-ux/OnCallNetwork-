"use client";

import { motion } from "framer-motion";
import { CheckCircle, Shield, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const processPoints = [
    { value: "5-stage", label: "screening" },
    { value: "45-min", label: "founder interview" },
    { value: "$0", label: "if they don't show" },
  ];

  return (
    <section id="venues" className="relative min-h-[90vh] flex items-center overflow-hidden scroll-mt-20 bg-[#0f1e32]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1e32] via-[#1e3a5f] to-[#2a4a6f]" />

      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#d4a853]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#d4a853]/5 blur-3xl"
      />

      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(#d4a853 1px, transparent 1px), linear-gradient(90deg, #d4a853 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#0f1e32]/80 via-[#0f1e32]/40 to-transparent" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          {/* Scarcity badge — honest, founder-led */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4a853]/20 border border-[#d4a853]/30 rounded-full mb-6"
          >
            <Shield className="w-4 h-4 text-[#d4a853]" />
            <span className="text-[#d4a853] text-sm font-medium">
              Founding venues &mdash; Inner West Sydney
            </span>
          </motion.div>

          {/* Headline — problem-first, honest */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            The staff you book{" "}
            <span className="text-[#d4a853]">actually show up.</span>
          </motion.h1>

          {/* Subheadline — specificity + mechanism */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-4 leading-relaxed"
          >
            A founder-led hospitality network where every candidate is{" "}
            <strong className="text-white">interviewed in person by Diego</strong>{" "}
            using a structured, evidence-based screening framework &mdash; before
            they ever meet your venue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-2 text-white/60 text-sm mb-8"
          >
            <MapPin className="w-4 h-4 text-[#d4a853]" />
            <span>Inner West &middot; Eastern Suburbs &middot; CBD &middot; North Shore</span>
          </motion.div>

          {/* Commitment points — what we promise in writing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            {[
              "Structured 5-stage screening",
              "No-show guarantee in writing",
              "You hire directly &mdash; no hourly markup",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-white/90">
                <CheckCircle className="w-5 h-5 text-[#d4a853] flex-shrink-0" />
                <span className="text-sm md:text-base" dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#d4a853] text-[#1e3a5f] font-bold text-lg rounded-lg hover:bg-[#e8c77b] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book a 15-min venue call
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold text-lg rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              See how screening works
            </Link>
          </motion.div>

          {/* Process stats — verifiable, not outcome claims */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20"
          >
            {processPoints.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#d4a853]">{stat.value}</div>
                <div className="text-sm text-white/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
