"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { DollarSign, Calendar, Building2, Award, Clock, Heart, TrendingUp } from "lucide-react";

export default function BenefitsWorkers() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const benefits = [
    {
      icon: DollarSign,
      title: "Above-Award Pay",
      description: "$32-40/hr base + weekend penalties. More than pub gigs, less hassle.",
    },
    {
      icon: Calendar,
      title: "Real Flexibility",
      description: "Accept only shifts that work for you. No mandatory schedules.",
    },
    {
      icon: Building2,
      title: "Premium Venues Only",
      description: "Work at Sydney's best restaurants, bars, and cafes. Quality environments.",
    },
    {
      icon: Award,
      title: "Elite Recognition",
      description: "Join the top 8% of hospitality professionals. Build your reputation.",
    },
    {
      icon: Clock,
      title: "Fast Payment",
      description: "Get paid quickly after shifts. No waiting weeks for paychecks.",
    },
    {
      icon: Heart,
      title: "Supportive Team",
      description: "Personal support from Diego. We've got your back, always.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#faf9f6]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Sample Earnings Preview — illustrative UI */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#1e3a5f] via-[#2a4a6f] to-[#0f1e32] p-8 flex items-center justify-center">
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
                className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#d4a853]/15 blur-3xl"
              />

              {/* Earnings card */}
              <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    Sample Weekly Summary
                  </span>
                  <div className="flex items-center gap-1 text-green-600 text-xs font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+15%</span>
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-xs text-gray-500 mb-1">This week&rsquo;s earnings</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-[#1e3a5f]">$780</span>
                    <span className="text-sm text-gray-400">/ 3 shifts</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {[
                    { role: "Fri · Bar shift · Newtown", amount: "$312" },
                    { role: "Sat · Service · Marrickville", amount: "$285" },
                    { role: "Sun · Function · Balmain", amount: "$183" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{s.role}</span>
                      <span className="font-semibold text-[#1e3a5f]">{s.amount}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Base rate</span>
                  <span className="text-sm font-bold text-[#d4a853]">$32&ndash;40/hr</span>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -top-4 -left-4 bg-[#d4a853] text-[#1e3a5f] px-4 py-2 rounded-full font-bold shadow-lg"
            >
              $32&ndash;40/hr
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block px-4 py-1.5 bg-[#d4a853]/20 text-[#d4a853] text-sm font-semibold rounded-full mb-4">
              For Hospitality Professionals
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6">
              Join Sydney's <span className="text-[#d4a853]">Elite 8%</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We only accept the top 8% of applicants. If you're reliable, professional, 
              and passionate about hospitality, you'll earn more and work at better venues.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits?.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#d4a853]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#d4a853] transition-colors">
                      <benefit.icon className="w-5 h-5 text-[#d4a853] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1e3a5f] mb-1">{benefit?.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{benefit?.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
