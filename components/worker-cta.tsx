"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle, Award, Sparkles, ShieldCheck } from "lucide-react";

export default function WorkerCTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const roles = [
    "Bartender",
    "Waiter/Waitress",
    "Kitchen Hand",
    "Chef",
    "Barista",
    "Floor Manager",
  ];

  const requirements = [
    "RSA Certificate (mandatory)",
    "2+ years hospitality experience",
    "Reliable & professional",
    "Inner West Sydney availability",
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#1e3a5f] to-[#0f1e32]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-[#d4a853]" />
              <span className="text-[#d4a853] font-semibold">Now Accepting Applications</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Join the Elite 8%?
            </h2>
            
            <p className="text-lg text-white/80 mb-8">
              We're looking for Sydney's best hospitality professionals. 
              Reliable workers who show up, deliver quality, and represent the industry well.
            </p>

            {/* Roles */}
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-3">Roles We're Hiring:</h3>
              <div className="flex flex-wrap gap-2">
                {roles?.map((role, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/10 text-white rounded-full text-sm"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-3">Requirements:</h3>
              <ul className="space-y-2">
                {requirements?.map((req, index) => (
                  <li key={index} className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="w-5 h-5 text-[#d4a853] flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA - Worker Application */}
            <Link
              href="/register/worker"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#d4a853] text-[#1e3a5f] font-bold text-lg rounded-lg hover:bg-[#e8c77b] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Apply in 2 Minutes
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-white/60 text-sm mt-4">
              Mobile-friendly application. Screening process takes 7-10 days.
            </p>
          </motion.div>

          {/* Illustrative acceptance preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#d4a853] via-[#e8c77b] to-[#d4a853] p-8 flex items-center justify-center">
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "linear-gradient(#1e3a5f 1px, transparent 1px), linear-gradient(90deg, #1e3a5f 1px, transparent 1px)",
                  backgroundSize: "36px 36px",
                }}
              />
              <div
                aria-hidden
                className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/20 blur-3xl"
              />

              {/* Acceptance card */}
              <div className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    Acceptance Preview
                  </span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded-full">
                    APPROVED
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4a853] to-[#e8c77b] flex items-center justify-center shadow-md">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1e3a5f] text-lg leading-tight">You&rsquo;re in.</p>
                    <p className="text-sm text-gray-600">Welcome to the Elite 8%</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Behavioural assessment passed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Reliability Score: 89/100</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>RSA + references verified</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-[#faf9f6] rounded-lg">
                  <span className="text-gray-600 text-sm">Weekly potential</span>
                  <span className="text-xl font-bold text-[#1e3a5f]">$800&ndash;1,200</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
