"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, DollarSign, Phone, Users, CheckCircle, Award } from "lucide-react";
import Image from "next/image";

export default function BenefitsVenues() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const benefits = [
    {
      icon: Shield,
      title: "97% Show-up Rate",
      description: "Only candidates scoring 75+ on the Reliability Score join OCN. The average is 84/100. You always see the top 8%.",
    },
    {
      icon: Award,
      title: "Master's in Psychology Screening",
      description: "Our founder has a Master's in Psychology. Every candidate is assessed on dependability, stress response, and professionalism.",
    },
    {
      icon: DollarSign,
      title: "No Hourly Markup",
      description: "OCN is a marketplace. You pay the candidate directly at the rate you agree. No 25-35% markup like labour hire agencies.",
    },
    {
      icon: Phone,
      title: "Founder Direct Line",
      description: "Priority Access members get Diego's direct WhatsApp. Real accountability, not a call centre.",
    },
    {
      icon: Users,
      title: "Pre-Screened Professionals",
      description: "RSA certified, experienced hospitality workers. Bartenders, waitstaff, baristas, kitchen hands, chefs.",
    },
    {
      icon: CheckCircle,
      title: "Inner West Specialist",
      description: "We focus on Sydney Inner West, Eastern Suburbs, CBD and North Shore. Local knowledge, local network.",
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
              Why Venues Choose OCN Over Sidekicker and Barcats
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Stop losing revenue to no-shows. Every candidate on OCN has been psychology-assessed and verified.
              You hire directly — no markups, no middleman payroll.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
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
                      <h3 className="font-semibold text-[#1e3a5f] mb-1">{benefit.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
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
                      <p className="font-bold text-[#1e3a5f]">Candidate Matched</p>
                      <p className="text-sm text-gray-600">Reliability Score: 91/100</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -top-4 -right-4 bg-[#d4a853] text-[#1e3a5f] px-4 py-2 rounded-full font-bold shadow-lg text-sm"
            >
              Top 8% Only
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
