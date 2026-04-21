"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote, ArrowRight } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  venue: string;
};

// Phase 2 (post-first-3-placements): populate this array with real testimonials.
const TESTIMONIALS: Testimonial[] = [];

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  if (TESTIMONIALS.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-[#faf9f6]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Quote className="w-8 h-8 text-[#d4a853] mx-auto mb-3" />
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-3">
              Early venues are already seeing the difference.
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We&rsquo;re a new brand, but Diego isn&rsquo;t new to Sydney
              hospitality. Speak with him on a 15-minute call and decide for
              yourself.
            </p>
            <Link
              href="/#contact?service=permanent"
              className="inline-flex items-center gap-2 h-12 px-6 bg-[#1e3a5f] text-white font-semibold rounded-lg hover:bg-[#2a4a6f] transition-all"
            >
              Book a 15-min call with Diego
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-[#faf9f6]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 bg-white rounded-2xl shadow-sm"
            >
              <Quote className="w-6 h-6 text-[#d4a853] mb-3" />
              <blockquote className="text-gray-700 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 pt-4 border-t border-gray-100">
                <p className="font-semibold text-[#1e3a5f]">{t.name}</p>
                <p className="text-sm text-gray-500">
                  {t.role} &middot; {t.venue}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
