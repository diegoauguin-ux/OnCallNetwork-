"use client";

import { motion } from "framer-motion";
import { Shield, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

export default function Hero() {
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

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Sydney&apos;s Boutique Hospitality Recruitment
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-4 leading-relaxed"
          >
            Permanent placement for Venue Managers, Bar Managers &amp; Head Chefs.
            Psychology-screened candidates. 15% fee. 60-day guarantee. You pay
            only when you hire.
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
              Submit a Role Brief
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold text-lg rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              Apply as a Candidate
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <p className="text-sm md:text-base text-white/75">
              Venue Managers &middot; Bar Managers &middot; Head Chefs &middot; Sous Chefs &middot;
              FOH Managers &mdash; Inner West &middot; CBD &middot; Eastern Suburbs
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
