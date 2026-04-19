"use client";

import { motion } from "framer-motion";
import { CheckCircle, Shield, ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const stats = [
    { value: "97%", label: "Show-up Rate" },
    { value: "84/100", label: "Avg. Reliability Score" },
    { value: "Top 8%", label: "Candidates Accepted" },
  ];

  return (
    <section id="venues" className="relative min-h-[90vh] flex items-center overflow-hidden scroll-mt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://cdn.abacus.ai/images/b40508e8-bfd2-4e59-a866-a7d525fe51d0.png"
          alt="Professional bartender serving in upscale Sydney venue"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1e32]/95 via-[#1e3a5f]/85 to-[#1e3a5f]/70" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4a853]/20 border border-[#d4a853]/30 rounded-full mb-6"
          >
            <Shield className="w-4 h-4 text-[#d4a853]" />
            <span className="text-[#d4a853] text-sm font-medium">Sydney&apos;s Specialist Hospitality Marketplace</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            No More{" "}
            <span className="text-[#d4a853]">No-Shows.</span>{" "}
            Ever.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-4 leading-relaxed"
          >
            Pre-screened hospitality professionals with a verified{" "}
            <strong className="text-white">Reliability Score</strong>. Every candidate assessed before they reach you — only the top 8% make it in.
          </motion.p>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-2 text-white/60 text-sm mb-8"
          >
            <MapPin className="w-4 h-4 text-[#d4a853]" />
            <span>Inner West · Eastern Suburbs · CBD · North Shore</span>
          </motion.div>

          {/* Trust Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            {[
              "Psychology-based candidate screening",
              "Venues hire directly — no markup",
              "First introduction from $99",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-white/90">
                <CheckCircle className="w-5 h-5 text-[#d4a853] flex-shrink-0" />
                <span className="text-sm md:text-base">{item}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
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
              Get Your First Introduction
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#workers"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold text-lg rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              Join as a Professional
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20"
          >
            {stats.map((stat, index) => (
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
