"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, Shield, DollarSign, Phone, Users, CheckCircle, Zap, Award } from "lucide-react";
import Image from "next/image";

export default function BenefitsVenues() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const benefits = [
    {
      icon: Zap,
      title: "Emergency Response <2hrs",
      description: "Staff delivered fast when you need them most. Workers arrive 15 minutes early, uniformed and briefed.",
    },
    {
      icon: Shield,
      title: "97% Reliability Guarantee",
      description: "If we don't deliver or the worker doesn't meet standards, you don't pay. Simple.",
    },
    {
      icon: Award,
      title: "PhD Behavioral Screening",
      description: "Only 8% of applicants accepted. Psychology-based screening predicts reliability & professionalism.",
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description: "$42-55/hr vs $60-80/hr traditional agencies. Premium service without premium pain.",
    },
    {
      icon: Phone,
      title: "Founder Direct Line",
      description: "Call or text Diego directly 24/7. Real accountability, not a faceless call center.",
    },
    {
      icon: Users,
      title: "Vetted Professionals Only",
      description: "RSA certified, experienced hospitality workers. Bartenders, waiters, chefs, kitchen hands.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#faf9f6]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#1e3a5f]/10 text-[#1e3a5f] text-sm font-semibold rounded-full mb-4">
              For Venues
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6">
              Premium Emergency Insurance for Your Venue
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Stop losing $4,500+ every time staff don't show. We're not another marketplace—we're 
              your reliable partner for emergency and planned staffing.
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
                    <div className="w-10 h-10 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#d4a853] transition-colors">
                      <benefit.icon className="w-5 h-5 text-[#1e3a5f] group-hover:text-white transition-colors" />
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

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://cdn.abacus.ai/images/50598485-24c1-46b6-8421-e25f8448802a.png"
                alt="Professional kitchen team working together"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-[#1e3a5f]">Emergency Staff Confirmed</p>
                      <p className="text-sm text-gray-600">Bartender arriving in 45 minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -top-4 -right-4 bg-[#d4a853] text-[#1e3a5f] px-4 py-2 rounded-full font-bold shadow-lg"
            >
              97% Success Rate
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
