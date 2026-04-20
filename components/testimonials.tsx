"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ClipboardList, FileCheck, HandshakeIcon, BadgeCheck,
  MapPin, User, Lock, Flag,
} from "lucide-react";

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const commitments = [
    {
      icon: ClipboardList,
      eyebrow: "Documented process",
      title: "The same rubric for every candidate",
      body: "A 5-stage screening funnel with a written interview framework and scoring rubric. No gut-feel, no shortcuts. We&rsquo;ll share the framework with you on request &mdash; that&rsquo;s how confident we are in it.",
    },
    {
      icon: HandshakeIcon,
      eyebrow: "No-show guarantee",
      title: "If they don\u2019t show up, you don\u2019t pay",
      body: "Written into every agreement: if a candidate we introduced fails to arrive, the introduction fee is refunded in full and Diego personally sources a replacement at no extra cost. Zero risk to try us once.",
    },
    {
      icon: FileCheck,
      eyebrow: "Direct-hire marketplace",
      title: "You pay the worker, not a markup",
      body: "OCN is not a labour-hire agency. You agree the hourly rate directly with the candidate, pay them directly, and run your own shift. We charge an introduction fee. That&rsquo;s it &mdash; no hidden percentages.",
    },
  ];

  const pillars = [
    { icon: User, label: "Founder accountable", sub: "Diego handles every introduction personally" },
    { icon: Lock, label: "Written commitments", sub: "Every promise on this page is contractable" },
    { icon: MapPin, label: "Sydney local", sub: "Inner West, East, CBD & North Shore only" },
    { icon: Flag, label: "Founding 10 venues", sub: "Deliberately small first quarter" },
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
            What we promise in writing
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            OCN is a new, founder-led Sydney network. Instead of inventing
            testimonials we haven&rsquo;t earned yet, here are the commitments
            we put on every venue agreement from day one.
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
              <p
                className="text-white/70 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.body }}
              />
            </motion.div>
          ))}
        </div>

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
