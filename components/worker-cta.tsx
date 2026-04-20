"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle, Award, UserCheck, ShieldCheck, Users } from "lucide-react";

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
    "RSA certificate (mandatory)",
    "Prior hospitality experience in Australia",
    "Legal right to work in Australia",
    "Inner West / East / CBD / North Shore availability",
  ];

  const pipeline = [
    { label: "Written application", sub: "5 minutes online" },
    { label: "15-min phone screen", sub: "If your application fits" },
    { label: "45-min founder interview", sub: "In person or video with Diego" },
    { label: "Two reference calls", sub: "Last two venue managers" },
    { label: "Welcome to the network", sub: "You receive shift offers" },
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
              <span className="text-[#d4a853] font-semibold">Accepting applications &mdash; Inner West Sydney</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Work with venues that{" "}
              <span className="text-[#d4a853]">respect you</span>
            </h2>

            <p className="text-lg text-white/80 mb-8">
              If you show up on time, do the job properly and treat the team well,
              OCN will keep introducing you to venues that do the same. Your rate,
              your hours, paid by the venue directly &mdash; no agency taking a cut.
            </p>

            <div className="mb-8">
              <h3 className="text-white font-semibold mb-3">Roles we match:</h3>
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

            <div className="mb-8">
              <h3 className="text-white font-semibold mb-3">Minimum requirements:</h3>
              <ul className="space-y-2">
                {requirements?.map((req, index) => (
                  <li key={index} className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="w-5 h-5 text-[#d4a853] flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="#apply"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#d4a853] text-[#1e3a5f] font-bold text-lg rounded-lg hover:bg-[#e8c77b] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Start your application
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-white/60 text-sm mt-4">
              Application is free. No payment, ever, to join or stay in the network.
            </p>
          </motion.div>

          {/* Screening pipeline card — honest, not fake acceptance preview */}
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

              {/* Honest 5-step pipeline */}
              <div className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    What joining looks like
                  </span>
                  <span className="px-2 py-0.5 bg-[#d4a853]/20 text-[#1e3a5f] text-[10px] font-semibold rounded-full">
                    5 STEPS
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                  <div className="w-11 h-11 rounded-full bg-[#1e3a5f] flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-5 h-5 text-[#d4a853]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1e3a5f] leading-tight">From application to first shift</p>
                    <p className="text-xs text-gray-500">Typical timeline: 7&ndash;14 days</p>
                  </div>
                </div>

                <ol className="space-y-3 mb-4">
                  {pipeline.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#d4a853] text-[#1e3a5f] text-[11px] font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#1e3a5f] leading-tight">{step.label}</p>
                        <p className="text-xs text-gray-500">{step.sub}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="flex items-center gap-2 p-3 bg-[#faf9f6] rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-[#d4a853] flex-shrink-0" />
                  <span className="text-xs text-gray-600">
                    We only introduce people we&rsquo;d vouch for.
                  </span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-4 -right-4 bg-[#1e3a5f] text-white px-4 py-2 rounded-full font-bold shadow-lg text-sm flex items-center gap-2"
            >
              <Users className="w-4 h-4" /> Small, on purpose
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
