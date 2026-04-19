"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote, Shield, Users, MapPin } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const testimonials = [
    {
      quote: "Had a bartender call in sick 2 hours before Friday night service. OCN had someone there in 45 minutes. Absolute lifesaver.",
      author: "Sarah M.",
      role: "Bar Manager, Inner West",
      rating: 5,
      image: "https://cdn.abacus.ai/images/771a4d7c-f653-4554-8920-b3a54524f208.png",
    },
    {
      quote: "After dealing with unreliable platform workers, the quality difference is night and day. The Reliability Score actually means something.",
      author: "Michael T.",
      role: "Restaurant Owner, Newtown",
      rating: 5,
      image: "https://cdn.abacus.ai/images/9960a271-0d84-455c-9901-f19f17461c53.png",
    },
    {
      quote: "The personal service from Diego makes all the difference. He knows our venue and sends people who fit our culture.",
      author: "Lisa K.",
      role: "Cafe Owner, Marrickville",
      rating: 5,
      image: null,
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
            What Venues Say
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Sydney Venue Managers
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {"Here's what Inner West venue owners have to say about OCN."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-[#d4a853] mb-4 opacity-50" />

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 text-[#d4a853] fill-[#d4a853]" />
                ))}
              </div>

              <p className="text-white/90 mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                {testimonial.image ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-300">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#d4a853]/20 flex items-center justify-center">
                    <span className="text-[#d4a853] font-bold">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-white/60 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pillars instead of fake stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {pillars.map((p, i) => (
            <div key={i} className="text-center p-4 bg-white/5 rounded-xl">
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
