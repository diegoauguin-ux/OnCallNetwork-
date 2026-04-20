"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, Users, MapPin, Star, GraduationCap, FileCheck, HandshakeIcon, BadgeCheck } from "lucide-react";

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const commitments = [
    {
      icon: GraduationCap,
      eyebrow: "Evidence-based screening",
      title: "Psychology-led, not gut-feel",
      body: "Every candidate is assessed by Diego using a Master's in Psychology framework — dependability, stress response, emotional regulation. We predict behaviour, we don't just run a CV check.",
    },
    {
      icon: FileCheck,
      eyebrow: "The Reliability Score",
      title: "A single number you can trust",
      body: "Each candidate earns a Reliability Score out of 100 based on behavioural assessment, reference checks and shift history. Only profiles above 75 enter the network — you always see the top 8%.",
    },
    {
      icon: HandshakeIcon,
      eyebrow: "Our no-show guarantee",
      title: "If they don't show up, you don't pay",
      body: "We commit in writing: if a candidate we introduced fails to arrive, the $99 introduction fee is waived and Diego personally sources a replacement at no extra cost. Zero risk to try us.",
    },
  ];

  const pillars = [
    { icon: Shield, label: "Psychology Screened", sub: "Master's in Psychology assessment" },
    { icon: Users, label: "Founder Accountable", sub: "Diego handles every introduction personally" },
    { icon: MapPin, label: "Inner West Specialist", sub: "Local network, local knowledge" },
    { icon: Star, label: "Top 8% Only", sub: "75+ Reliability Score to join" },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#1e3a5f] to-[#0f1e32]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-[#d4a853]/20 text-[#d4a853] text-sm font-semibold rounded-full mb-4">
            <BadgeCheck className="w-4 h-4 inline mr-1" />
            The OCN Standard
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why venue managers take the first call
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            OCN is a new, founder-led Sydney marketplace. Instead of paid reviews, here&rsquo;s
            what we put in writing for every venue that works with us.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {commitments.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 hover:bg-white/15 transition-all duration-300 border border-white/10"
            >
              <div className="w-12 h-12 rounded-xl bg-[#d4a853]/20 flex items-center justify-center mb-5">
                <item.icon className="w-6 h-6 text-[#d4a853]" />
              </div>

              <p className="text-[#d4a853] text-xs font-semibold uppercase tracking-wider mb-2">
                {item.eyebrow}
              </p>
              <h3 className="text-xl font-bold text-white mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Founder-led credibility strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {pillars.map((p, i) => (
            <div key={i} className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="w-10 h-10 rounded-full bg-[#d4a853]/20 flex items-center justify-center mx-auto mb-3">
                <p.icon className="w-5 h-5 text-[#d4a853]" />
              </div>
              <p className="text-white font-semibold text-sm mb-1">{p.label}</p>
              <p className="text-white/50 text-xs">{p.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
