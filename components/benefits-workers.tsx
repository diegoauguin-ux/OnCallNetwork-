"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { DollarSign, Calendar, Building2, Award, Clock, Heart } from "lucide-react";
import Image from "next/image";

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
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://cdn.abacus.ai/images/63012801-9ec9-4ee5-bb6b-95504a378f72.png"
                alt="Team of professional hospitality workers"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#1e3a5f]">This Week's Earnings</p>
                      <p className="text-sm text-gray-600">3 shifts completed</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#d4a853]">$780</p>
                      <p className="text-xs text-green-600">+15% vs last week</p>
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
              className="absolute -top-4 -left-4 bg-[#d4a853] text-[#1e3a5f] px-4 py-2 rounded-full font-bold shadow-lg"
            >
              $32-40/hr
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
