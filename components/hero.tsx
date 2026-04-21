"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="venues" className="relative min-h-[86vh] md:min-h-[92vh] flex items-center overflow-hidden scroll-mt-20 bg-[#0f1e32]">
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

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-16 md:py-28 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/15 rounded-full mb-6"
          >
            <MapPin className="w-3.5 h-3.5 text-[#d4a853]" />
            <span className="text-white/80 text-xs md:text-sm font-medium">
              Sydney Inner West &middot; CBD &middot; Eastern Suburbs &middot; North Shore
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[30px] sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-tight mb-5"
          >
            The Sydney hospitality recruiter{" "}
            <span className="text-[#d4a853]">venues actually trust.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-white/80 mb-8 leading-relaxed max-w-2xl"
          >
            One founder. One phone number. Every candidate personally
            interviewed and reference-checked before they reach your venue.
            Backed by written guarantees &mdash; in every agreement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid sm:grid-cols-2 gap-4 mb-8"
          >
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-[#d4a853]/40 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#d4a853]" />
                <h3 className="text-white font-bold">Need a shift covered?</h3>
              </div>
              <p className="text-white/75 text-sm mb-4 leading-relaxed">
                $99 per candidate introduction. Pre-screened. Full refund if
                they no-show.
              </p>
              <Link
                href="/#contact?service=casual"
                className="inline-flex w-full items-center justify-center gap-2 h-11 px-4 bg-[#d4a853] text-[#1e3a5f] font-semibold rounded-lg hover:bg-[#e8c77b] transition-all"
              >
                Book a Casual Intro
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-[#d4a853]/40 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-[#d4a853]" />
                <h3 className="text-white font-bold">Hiring a senior role?</h3>
              </div>
              <p className="text-white/75 text-sm mb-4 leading-relaxed">
                Venue Manager, Bar Manager, Head Chef. Three shortlisted
                candidates in 5&ndash;7 days. 18% fee, payable on start. 60-day
                replacement guarantee.
              </p>
              <Link
                href="/#contact?service=permanent"
                className="inline-flex w-full items-center justify-center gap-2 h-11 px-4 bg-white/10 text-white border border-white/30 font-semibold rounded-lg hover:bg-white/20 transition-all"
              >
                Submit a Role Brief
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/60 text-xs md:text-sm"
          >
            <span>Venue Managers</span>
            <span>&middot;</span>
            <span>Bar Managers</span>
            <span>&middot;</span>
            <span>Head Chefs</span>
            <span>&middot;</span>
            <span>Sous Chefs</span>
            <span>&middot;</span>
            <span>FOH Managers</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
